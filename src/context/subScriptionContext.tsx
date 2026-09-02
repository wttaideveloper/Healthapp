import React, { createContext, useMemo, useState, useContext, useEffect, ReactNode, useCallback } from "react";
import {
    clearCachedSubscriptionStatus,
    initIAP,
    logStoreError,
    syncRevenueCatStatusToBackend,
    syncRevenueCatUser,
    verifySubscriptionStatusRevenueCat,
    verifySubscriptionStatusBackend,
    verifySubscriptionStatusSafe,
    mustUseAppStoreIapForPro,
    type SubscriptionStatus,
} from "../components/utils/purchase";
import { useAuth } from "./authContext";
import { Platform } from "react-native";

interface SubscriptionContextProps {
    isSubscribed: boolean;
    autoRenewing: boolean;
    expiryDate: Date | null;
    subscriptionSource: "none" | "iap" | "workspace" | "stripe" | "mixed";
    providerStatus: string | null;
    workspace: {
        id: string;
        name: string;
        role: "owner" | "admin" | "member";
        memberStatus: "invited" | "active" | "revoked";
        plan: string | null;
        seatLimit: number | null;
        subscriptionStatus: string | null;
    } | null;
    refreshSubscription: (forceLive?: boolean) => Promise<void>;
}


const SubscriptionContext = createContext<SubscriptionContextProps>({
    isSubscribed: false,
    autoRenewing: false,
    expiryDate: null,
    subscriptionSource: "none",
    providerStatus: null,
    workspace: null,
    refreshSubscription: async () => { },
});

interface ProviderProps {
    children: ReactNode;
}

export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
    const { accessToken, user, isHydrated: isAuthHydrated } = useAuth();
    const lastUserIdRef = React.useRef<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [autoRenewing, setAutoRenewing] = useState(false);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [subscriptionSource, setSubscriptionSource] = useState<"none" | "iap" | "workspace" | "stripe" | "mixed">("none");
    const [providerStatus, setProviderStatus] = useState<string | null>(null);
    const [workspace, setWorkspace] = useState<SubscriptionContextProps["workspace"]>(null);

    const refreshSubscription = useCallback(async (forceLive = false) => {
        // Backend entitlement is the gate. Cached-first keeps the UI responsive.
        let result = await verifySubscriptionStatusSafe();
        if (forceLive) {
            if (!accessToken) {
                await clearCachedSubscriptionStatus();
                result = { isValid: false, autoRenewing: false, expiryDate: null };
            } else {
                if (Platform.OS !== "web") {
                    try {
                        await initIAP();
                        await syncRevenueCatUser(user?.id ?? null);
                        await syncRevenueCatStatusToBackend(accessToken, user?.id ?? null, "status_check");
                    } catch (error) {
                        logStoreError("subscription-refresh", error);
                    }
                }

                const backendResult = await verifySubscriptionStatusBackend(accessToken);
                result = backendResult ?? { isValid: false, autoRenewing: false, expiryDate: null };
            }
        }

        // Direct RevenueCat fallback is only for signed-out/native debugging on iOS/Android.
        // Signed-in users on those platforms unlock from backend ownership to avoid sharing
        // Apple-ID purchases across accounts. Mac App Store must instead gate Pro on the
        // StoreKit/RevenueCat `pro` entitlement, including for signed-in users.
        const storeIapRequired = mustUseAppStoreIapForPro();
        let revenueCat: SubscriptionStatus | null = null;
        if (Platform.OS !== "web") {
            try {
                const hasAuthenticatedUser = Boolean(accessToken && user?.id);
                if (!hasAuthenticatedUser || storeIapRequired) {
                    await initIAP();
                    await syncRevenueCatUser(storeIapRequired ? user?.id ?? null : null);
                    revenueCat = await verifySubscriptionStatusRevenueCat();
                }
            } catch (error) {
                logStoreError("subscription-refresh-direct", error);
                revenueCat = null;
            }
        }

        const hasAuthenticatedUser = Boolean(accessToken && user?.id);
        const allowDirectRevenueCatEntitlement = !hasAuthenticatedUser;

        const mergedIsValid = storeIapRequired
            ? Boolean(revenueCat?.isValid)
            : Boolean(result.isValid) ||
              (allowDirectRevenueCatEntitlement && Boolean(revenueCat?.isValid));
        const mergedAutoRenewing = storeIapRequired
            ? Boolean(revenueCat?.autoRenewing)
            : Boolean(result.autoRenewing) ||
              (allowDirectRevenueCatEntitlement && Boolean(revenueCat?.autoRenewing));
        const mergedExpiry = storeIapRequired
            ? revenueCat?.expiryDate ?? null
            : result.expiryDate && allowDirectRevenueCatEntitlement && revenueCat?.expiryDate
                ? result.expiryDate > revenueCat.expiryDate
                    ? result.expiryDate
                    : revenueCat.expiryDate
                : result.expiryDate ??
                  (allowDirectRevenueCatEntitlement ? revenueCat?.expiryDate : null) ??
                  null;

        const source: "none" | "iap" | "workspace" | "stripe" | "mixed" =
            !mergedIsValid
                ? "none"
                : storeIapRequired
                    ? "iap"
                    : allowDirectRevenueCatEntitlement && revenueCat?.isValid && result.isValid
                    ? "mixed"
                    : result.provider === "stripe"
                        ? "stripe"
                        : result.provider === "workspace"
                            ? "workspace"
                        : result.source === "individual_iap"
                            ? "iap"
                            : allowDirectRevenueCatEntitlement && revenueCat?.isValid
                                ? "iap"
                                : "none";

        setIsSubscribed((prev) => (prev === mergedIsValid ? prev : mergedIsValid));
        setAutoRenewing((prev) => (prev === mergedAutoRenewing ? prev : mergedAutoRenewing));
        setSubscriptionSource((prev) => (prev === source ? prev : source));
        const nextProviderStatus = result.providerStatus ?? revenueCat?.providerStatus ?? null;
        setProviderStatus((prev) => (prev === nextProviderStatus ? prev : nextProviderStatus));
        setWorkspace((prev) => {
            const nextWorkspace = result.workspace ?? null;
            return JSON.stringify(prev) === JSON.stringify(nextWorkspace) ? prev : nextWorkspace;
        });
        setExpiryDate((prev) => {
            const prevTime = prev ? prev.getTime() : null;
            const nextTime = mergedExpiry ? mergedExpiry.getTime() : null;
            if (prevTime === nextTime) {
                return prev;
            }
            return mergedExpiry;
        });
    }, [accessToken, user?.id]);

    useEffect(() => {
        const bootstrapSubscription = async () => {
            // Show cached status first for immediate UI, then refresh from backend.
            await refreshSubscription(false);
            await refreshSubscription(true);
        };

        bootstrapSubscription().catch((error) => {
            console.error("Failed to bootstrap subscription state:", error);
        });
    }, [refreshSubscription]);

    useEffect(() => {
        if (!isAuthHydrated) {
            return;
        }

        const refreshOnAuthChange = async () => {
            const currentUserId = user?.id ?? null;
            if (lastUserIdRef.current !== currentUserId) {
                // Reset cached/backed values when switching accounts to avoid cross-user stale premium UI.
                await clearCachedSubscriptionStatus();
                setIsSubscribed(false);
                setAutoRenewing(false);
                setExpiryDate(null);
                setSubscriptionSource("none");
                setProviderStatus(null);
                setWorkspace(null);
                lastUserIdRef.current = currentUserId;
            }
            await refreshSubscription(true);
        };

        refreshOnAuthChange().catch((error) => {
            console.error("Failed to refresh subscription state:", error);
        });
    }, [accessToken, isAuthHydrated, refreshSubscription, user?.id]);

    const contextValue = useMemo(
        () => ({
            isSubscribed,
            autoRenewing,
            expiryDate,
            subscriptionSource,
            providerStatus,
            workspace,
            refreshSubscription,
        }),
        [
            isSubscribed,
            autoRenewing,
            expiryDate,
            subscriptionSource,
            providerStatus,
            workspace,
            refreshSubscription,
        ]
    );

    return (
        <SubscriptionContext.Provider
            value={contextValue}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error("useSubscription must be used within a SubscriptionProvider");
    }
    return context;
};
