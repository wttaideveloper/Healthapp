import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    clearCachedSubscriptionStatus,
    verifySubscriptionStatusBackend,
    verifySubscriptionStatusSafe,
} from "../components/utils/purchase";
import { useAuth } from "./authContext";

interface SubscriptionContextProps {
    isSubscribed: boolean;
    autoRenewing: boolean;
    expiryDate: Date | null;
    refreshSubscription: (forceLive?: boolean) => Promise<void>;
    setDebugSubscriptionOverride: (enabled: boolean | null) => Promise<void>;
    debugSubscriptionOverride: boolean | null;
}

const DEBUG_SUB_OVERRIDE_KEY = "debug_subscription_override";

const SubscriptionContext = createContext<SubscriptionContextProps>({
    isSubscribed: false,
    autoRenewing: false,
    expiryDate: null,
    refreshSubscription: async () => { },
    setDebugSubscriptionOverride: async () => { },
    debugSubscriptionOverride: null,
});

interface ProviderProps {
    children: ReactNode;
}

export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
    const { accessToken, isHydrated: isAuthHydrated } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [autoRenewing, setAutoRenewing] = useState(false);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [debugSubscriptionOverride, setDebugSubscriptionOverrideState] = useState<boolean | null>(null);

    const refreshSubscription = async (forceLive = false) => {
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

        let override: boolean | null = null;
        if (__DEV__) {
            const storedOverride = await AsyncStorage.getItem(DEBUG_SUB_OVERRIDE_KEY);
            override = storedOverride === "true" ? true : storedOverride === "false" ? false : null;
            setDebugSubscriptionOverrideState(override);
        }

        if (override === true) {
            setIsSubscribed(true);
            setAutoRenewing(true);
            setExpiryDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
            return;
        }

        if (override === false) {
            setIsSubscribed(false);
            setAutoRenewing(false);
            setExpiryDate(null);
            return;
        }

        setIsSubscribed(result.isValid);
        setExpiryDate(result.expiryDate ?? null);
        setAutoRenewing(result.autoRenewing ?? false);
    };

    const setDebugSubscriptionOverride = async (enabled: boolean | null) => {
        if (!__DEV__) {
            return;
        }

        if (enabled === null) {
            await AsyncStorage.removeItem(DEBUG_SUB_OVERRIDE_KEY);
        } else {
            await AsyncStorage.setItem(DEBUG_SUB_OVERRIDE_KEY, enabled ? "true" : "false");
        }

        await refreshSubscription(false);
    };

    useEffect(() => {
        const bootstrapSubscription = async () => {
            // Show cached status first for immediate UI, then refresh from backend.
            await refreshSubscription(false);
            await refreshSubscription(true);
        };

        bootstrapSubscription().catch((error) => {
            console.error("Failed to bootstrap subscription state:", error);
        });
    }, []);

    useEffect(() => {
        if (!isAuthHydrated) {
            return;
        }

        const refreshOnAuthChange = async () => {
            await refreshSubscription(true);
        };

        refreshOnAuthChange().catch((error) => {
            console.error("Failed to refresh subscription state:", error);
        });
    }, [accessToken, isAuthHydrated]);

    return (
        <SubscriptionContext.Provider
            value={{
                isSubscribed,
                autoRenewing,
                expiryDate,
                refreshSubscription,
                setDebugSubscriptionOverride,
                debugSubscriptionOverride,
            }}
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
