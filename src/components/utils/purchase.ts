import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  type PurchasesEntitlementInfo,
  type PurchasesPackage,
} from "react-native-purchases";

const SUB_STATUS_STORAGE_KEY = "sub_status";
const DEFAULT_ENTITLEMENT_ID = "premium";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const LICENSE_STATUS_PATH = process.env.EXPO_PUBLIC_LICENSE_STATUS_PATH ?? "/license/status";
const LICENSE_ACTIVATE_PATH = process.env.EXPO_PUBLIC_LICENSE_ACTIVATE_PATH ?? "/license/activate";

export type SubscriptionStatus = {
  isValid: boolean;
  autoRenewing: boolean;
  expiryDate: Date | null;
};

const normalizeBackendStatus = (payload: unknown): SubscriptionStatus | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;
  const nested = source.data && typeof source.data === "object" ? (source.data as Record<string, unknown>) : null;
  const target = nested ?? source;

  const isValidRaw =
    target.isSubscribed ?? target.isValid ?? target.subscribed ?? target.premium;

  const autoRenewingRaw =
    target.autoRenewing ?? target.willRenew ?? target.isAutoRenewing;

  const expiryRaw = target.expiryDate ?? target.expiresAt ?? target.expirationDate;

  return {
    isValid: Boolean(isValidRaw),
    autoRenewing: Boolean(autoRenewingRaw),
    expiryDate: typeof expiryRaw === "string" ? new Date(expiryRaw) : null,
  };
};

const getActiveEntitlement = (
  customerInfo: CustomerInfo
): PurchasesEntitlementInfo | null => {
  const activeEntitlements = Object.values(customerInfo.entitlements.active);
  if (activeEntitlements.length === 0) {
    return null;
  }

  return (
    customerInfo.entitlements.active[DEFAULT_ENTITLEMENT_ID] ??
    activeEntitlements[0] ??
    null
  );
};

const statusFromCustomerInfo = (customerInfo: CustomerInfo): SubscriptionStatus => {
  const entitlement = getActiveEntitlement(customerInfo);

  if (!entitlement) {
    return {
      isValid: false,
      autoRenewing: false,
      expiryDate: null,
    };
  }

  return {
    isValid: entitlement.isActive,
    autoRenewing: entitlement.willRenew,
    expiryDate: entitlement.expirationDate ? new Date(entitlement.expirationDate) : null,
  };
};

export const initIAP = async (): Promise<void> => {
  // RevenueCat is configured in App.tsx; no runtime init needed here.
  return;
};

export const verifySubscriptionStatusSafe = async (): Promise<SubscriptionStatus> => {
  try {
    const cached = await AsyncStorage.getItem(SUB_STATUS_STORAGE_KEY);
    if (!cached) {
      return { isValid: false, autoRenewing: false, expiryDate: null };
    }

    const parsed = JSON.parse(cached) as {
      isValid?: boolean;
      autoRenewing?: boolean;
      expiryDate?: string | null;
    };

    return {
      isValid: Boolean(parsed.isValid),
      autoRenewing: Boolean(parsed.autoRenewing),
      expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
    };
  } catch {
    return { isValid: false, autoRenewing: false, expiryDate: null };
  }
};

export const verifySubscriptionStatusLive = async (): Promise<SubscriptionStatus> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    const status = statusFromCustomerInfo(customerInfo);
    await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
    return status;
  } catch (error) {
    console.error("Subscription verification error:", error);
    return { isValid: false, autoRenewing: false, expiryDate: null };
  }
};

export const verifySubscriptionStatusBackend = async (
  accessToken: string
): Promise<SubscriptionStatus | null> => {
  try {
    if (!API_BASE_URL || !accessToken) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}${LICENSE_STATUS_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    const status = normalizeBackendStatus(payload);
    if (!status) {
      return null;
    }

    await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
    return status;
  } catch (error) {
    console.error("Backend license status fetch failed:", error);
    return null;
  }
};

export const activateLicenseKey = async (
  accessToken: string,
  licenseKey: string
): Promise<SubscriptionStatus> => {
  if (!API_BASE_URL || !accessToken) {
    throw new Error("Missing API base URL or access token");
  }

  const normalizedKey = licenseKey.trim();
  if (!normalizedKey) {
    throw new Error("License key is required");
  }

  const response = await fetch(`${API_BASE_URL}${LICENSE_ACTIVATE_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ licenseKey: normalizedKey }),
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const source = payload as Record<string, unknown> | null;
    const message =
      source && typeof source.message === "string"
        ? source.message
        : "Unable to activate license key";
    throw new Error(message);
  }

  const status = normalizeBackendStatus(payload);
  if (!status) {
    throw new Error("Invalid license response from server");
  }

  await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
  return status;
};

export const clearCachedSubscriptionStatus = async (): Promise<void> => {
  await AsyncStorage.removeItem(SUB_STATUS_STORAGE_KEY);
};

export const syncRevenueCatUser = async (appUserId: string | null): Promise<void> => {
  try {
    if (appUserId) {
      await Purchases.logIn(appUserId);
      return;
    }

    await Purchases.logOut();
  } catch (error) {
    console.error("Failed to sync RevenueCat user identity:", error);
  }
};

export const verifySubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  return verifySubscriptionStatusLive();
};

export const getSubscriptions = async (): Promise<PurchasesPackage[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch (error) {
    console.error("Error fetching offerings:", error);
    return [];
  }
};

export const purchaseSubscription = async (
  subscriptions: PurchasesPackage[]
): Promise<CustomerInfo> => {
  try {
    if (!subscriptions?.length) {
      throw new Error("No subscriptions available for purchase.");
    }

    const preferredPackage =
      subscriptions.find((pkg) => pkg.packageType === Purchases.PACKAGE_TYPE.ANNUAL) ??
      subscriptions[0];

    const { customerInfo } = await Purchases.purchasePackage(preferredPackage);
    const status = statusFromCustomerInfo(customerInfo);
    await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
    return customerInfo;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to complete purchase right now.";

    console.error("Purchase failed:", error);
    Alert.alert("Purchase Error", message);
    throw error;
  }
};

export const restorePurchases = async (): Promise<CustomerInfo> => {
  const customerInfo = await Purchases.restorePurchases();
  const status = statusFromCustomerInfo(customerInfo);
  await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
  return customerInfo;
};

export const cancelSubscription = async (): Promise<void> => {
  const customerInfo = await Purchases.getCustomerInfo();

  if (customerInfo.managementURL) {
    await Linking.openURL(customerInfo.managementURL);
    return;
  }

  if (Platform.OS === "ios") {
    await Linking.openURL("itms-apps://apps.apple.com/account/subscriptions");
    return;
  }

  await Linking.openURL("https://play.google.com/store/account/subscriptions");
};

export const restoreSubscription = async (): Promise<CustomerInfo> => {
  return restorePurchases();
};
