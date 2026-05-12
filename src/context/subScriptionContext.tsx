import React, { createContext, useMemo, useState, useContext, useEffect, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    clearCachedSubscriptionStatus,
    initIAP,
    syncRevenueCatUser,
    verifySubscriptionStatusRevenueCat,
    verifySubscriptionStatusBackend,
    verifySubscriptionStatusSafe,
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
    setDebugSubscriptionOverride: (enabled: boolean | null) => Promise<void>;
    debugSubscriptionOverride: boolean | null;
}

const DEBUG_SUB_OVERRIDE_KEY = "debug_subscription_override";

const SubscriptionContext = createContext<SubscriptionContextProps>({
    isSubscribed: false,
    autoRenewing: false,
    expiryDate: null,
    subscriptionSource: "none",
    providerStatus: null,
    workspace: null,
    refreshSubscription: async () => { },
    setDebugSubscriptionOverride: async () => { },
    debugSubscriptionOverride: null,
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
    const [debugSubscriptionOverride, setDebugSubscriptionOverrideState] = useState<boolean | null>(null);

    const refreshSubscription = useCallback(async (forceLive = false) => {
        // 1) Backend entitlement + Stripe(web) status (cached-first).
        let result = await verifySubscriptionStatusSafe();
        if (forceLive) {
            if (!accessToken) {
                await clearCachedSubscriptionStatus();
                result = { isValid: false, autoRenewing: false, expiryDate: null };
            } else {
                const backendResult = await verifySubscriptionStatusBackend(accessToken);
                result = backendResult ?? { isValid: false, autoRenewing: false, expiryDate: null };
            }
        }

        // 2) RevenueCat store subscription (native only).
        let revenueCat: SubscriptionStatus | null = null;
        if (Platform.OS !== "web") {
            try {
                await initIAP();
                await syncRevenueCatUser(user?.id ?? null);
                revenueCat = await verifySubscriptionStatusRevenueCat();
            } catch (error) {
                console.warn("RevenueCat refresh failed:", error);
                revenueCat = null;
            }
        }

        let override: boolean | null = null;
        if (__DEV__) {
            const storedOverride = await AsyncStorage.getItem(DEBUG_SUB_OVERRIDE_KEY);
            override = storedOverride === "true" ? true : storedOverride === "false" ? false : null;
            // Avoid re-render loops: only update if value actually changed.
            setDebugSubscriptionOverrideState((prev) => (prev === override ? prev : override));
        }

        if (override === true) {
            setIsSubscribed((prev) => (prev ? prev : true));
            setAutoRenewing((prev) => (prev ? prev : true));
            // Keep a stable expiry date while override is enabled to avoid render loops.
            setExpiryDate((prev) => prev ?? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
            setSubscriptionSource("mixed");
            setProviderStatus("active");
            setWorkspace(null);
            return;
        }

        if (override === false) {
            setIsSubscribed((prev) => (prev ? false : prev));
            setAutoRenewing((prev) => (prev ? false : prev));
            setExpiryDate((prev) => (prev === null ? prev : null));
            setSubscriptionSource("none");
            setProviderStatus(null);
            setWorkspace(null);
            return;
        }

        const hasAuthenticatedUser = Boolean(accessToken && user?.id);
        // IMPORTANT:
        // For authenticated app users, subscription access must be tied to backend ownership.
        // This prevents Apple-ID-based entitlements from being auto-shared across different app accounts.
        const allowDirectRevenueCatEntitlement = !hasAuthenticatedUser;

        const mergedIsValid =
            Boolean(result.isValid) ||
            (allowDirectRevenueCatEntitlement && Boolean(revenueCat?.isValid));
        const mergedAutoRenewing =
            Boolean(result.autoRenewing) ||
            (allowDirectRevenueCatEntitlement && Boolean(revenueCat?.autoRenewing));
        const mergedExpiry =
            result.expiryDate && allowDirectRevenueCatEntitlement && revenueCat?.expiryDate
                ? result.expiryDate > revenueCat.expiryDate
                    ? result.expiryDate
                    : revenueCat.expiryDate
                : result.expiryDate ??
                  (allowDirectRevenueCatEntitlement ? revenueCat?.expiryDate : null) ??
                  null;

        const source: "none" | "iap" | "workspace" | "stripe" | "mixed" =
            !mergedIsValid
                ? "none"
                : allowDirectRevenueCatEntitlement && revenueCat?.isValid && result.isValid
                    ? "mixed"
                    : result.provider === "stripe"
                        ? "stripe"
                        : result.provider === "workspace"
                            ? "workspace"
                        : allowDirectRevenueCatEntitlement && revenueCat?.isValid
                            ? "iap"
                        : result.source === "individual_iap"
                            ? "iap"
                        : "workspace";

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

    const setDebugSubscriptionOverride = useCallback(async (enabled: boolean | null) => {
        if (!__DEV__) {
            return;
        }

        if (enabled === null) {
            await AsyncStorage.removeItem(DEBUG_SUB_OVERRIDE_KEY);
        } else {
            await AsyncStorage.setItem(DEBUG_SUB_OVERRIDE_KEY, enabled ? "true" : "false");
        }

        await refreshSubscription(false);
    }, [refreshSubscription]);

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
            setDebugSubscriptionOverride,
            debugSubscriptionOverride,
        }),
        [
            isSubscribed,
            autoRenewing,
            expiryDate,
            subscriptionSource,
            providerStatus,
            workspace,
            refreshSubscription,
            setDebugSubscriptionOverride,
            debugSubscriptionOverride,
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
