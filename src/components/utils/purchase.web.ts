import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { apiRequest, getApiRoot } from "./api";

const SUB_STATUS_STORAGE_KEY = "sub_status";
const LICENSE_STATUS_PATH = process.env.EXPO_PUBLIC_LICENSE_STATUS_PATH ?? "/licenses/me";
const LICENSE_ACTIVATE_PATH = process.env.EXPO_PUBLIC_LICENSE_ACTIVATE_PATH ?? "/licenses/activate";
const STRIPE_CHECKOUT_PATH =
  process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_PATH ?? "/stripe/checkout";
const STRIPE_PORTAL_PATH =
  process.env.EXPO_PUBLIC_STRIPE_PORTAL_PATH ?? "/stripe/portal";

export type SubscriptionStatus = {
  isValid: boolean;
  autoRenewing: boolean;
  expiryDate: Date | null;
  provider?: "enterprise" | "revenuecat" | "stripe" | null;
  providerStatus?: string | null;
};

export type RevenueCatPackageSummary = {
  identifier: string;
  packageType: string;
  productIdentifier: string;
  title: string;
  description: string;
  priceString: string;
  billingPeriod: string;
};

const normalizeBackendStatus = (payload: unknown): SubscriptionStatus | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;
  const nested =
    source.data && typeof source.data === "object"
      ? (source.data as Record<string, unknown>)
      : null;
  const target = nested ?? source;

  const isValidRaw =
    target.isLicensed ??
    target.isSubscribed ??
    target.isValid ??
    target.subscribed ??
    target.premium ??
    target.activated ??
    (target.license && typeof target.license === "object"
      ? (target.license as any).isActive
      : undefined);

  const expiryRaw =
    target.expiryDate ??
    target.expiresAt ??
    target.expirationDate ??
    target.licenseExpiry ??
    (target.license && typeof target.license === "object"
      ? (target.license as any).expiresAt
      : undefined);

  return {
    isValid: Boolean(isValidRaw),
    autoRenewing: Boolean(target.autoRenewing ?? target.willRenew ?? false),
    expiryDate: typeof expiryRaw === "string" ? new Date(expiryRaw) : null,
    provider:
      target.provider === "enterprise" || target.provider === "revenuecat" || target.provider === "stripe"
        ? target.provider
        : null,
    providerStatus: typeof target.providerStatus === "string" ? target.providerStatus : null,
  };
};

export const getRevenueCatConfigurationError = (): string | null => null;

export const initIAP = async (): Promise<void> => {
  return;
};

export const verifySubscriptionStatusRevenueCat = async (): Promise<SubscriptionStatus | null> => {
  return null;
};

export const syncRevenueCatUser = async (): Promise<void> => {
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
      autoRenewing: false,
      expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
    };
  } catch {
    return { isValid: false, autoRenewing: false, expiryDate: null };
  }
};

export const verifySubscriptionStatusBackend = async (
  accessToken: string
): Promise<SubscriptionStatus | null> => {
  try {
    if (!getApiRoot() || !accessToken) {
      return null;
    }

    const payload = await apiRequest<unknown>(
      LICENSE_STATUS_PATH,
      { method: "GET" },
      accessToken
    );

    const status = normalizeBackendStatus(payload);
    if (!status) {
      return null;
    }

    await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
    return status;
  } catch {
    return null;
  }
};

export const activateLicenseKey = async (
  accessToken: string,
  licenseKey: string
): Promise<SubscriptionStatus> => {
  if (!getApiRoot() || !accessToken) {
    throw new Error("Missing API base URL or access token");
  }

  const normalizedKey = licenseKey.trim();
  if (!normalizedKey) {
    throw new Error("License key is required");
  }

  const deviceIdKey = "device_id";
  const existing = await AsyncStorage.getItem(deviceIdKey);
  const deviceId =
    existing ?? `device_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  if (!existing) {
    await AsyncStorage.setItem(deviceIdKey, deviceId);
  }

  const payload = await apiRequest<unknown>(
    LICENSE_ACTIVATE_PATH,
    {
      method: "POST",
      body: JSON.stringify({ licenseKey: normalizedKey, deviceId, platform: "web" }),
    },
    accessToken
  );

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

export const verifySubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  return verifySubscriptionStatusSafe();
};

export const getSubscriptions = async (): Promise<never[]> => [];

export const getSubscriptionSummaries = async (): Promise<RevenueCatPackageSummary[]> => [];

export const resolvePreferredPackage = (): null => null;

export const purchaseSubscription = async (): Promise<never> => {
  throw new Error("Purchases are not supported on web.");
};

export const restorePurchases = async (): Promise<never> => {
  throw new Error("Restore is not supported on web.");
};

export const syncRevenueCatStatusToBackend = async (): Promise<boolean> => false;

export const cancelSubscription = async (): Promise<void> => {
  throw new Error("Manage subscription is not supported on web.");
};

export const startStripeCheckout = async (accessToken?: string | null): Promise<void> => {
  const apiRoot = getApiRoot();
  if (!apiRoot) {
    throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");
  }

  const response = await fetch(`${apiRoot}${STRIPE_CHECKOUT_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({}),
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
        : "Unable to start checkout";
    throw new Error(message);
  }

  const url =
    payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string"
      ? (payload as any).url
      : null;

  if (!url) {
    throw new Error("Checkout URL missing from response");
  }

  if (typeof window !== "undefined") {
    window.location.assign(url);
    return;
  }

  await Linking.openURL(url);
};

export const startStripePortal = async (accessToken?: string | null): Promise<void> => {
  const apiRoot = getApiRoot();
  if (!apiRoot) {
    throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");
  }

  const response = await fetch(`${apiRoot}${STRIPE_PORTAL_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({}),
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
        : "Unable to open billing portal";
    throw new Error(message);
  }

  const url =
    payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string"
      ? (payload as any).url
      : null;

  if (!url) {
    throw new Error("Billing portal URL missing from response");
  }

  if (typeof window !== "undefined") {
    window.location.assign(url);
    return;
  }

  await Linking.openURL(url);
};
