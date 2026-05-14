import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { apiRequest, getApiRoot } from "./api";

const SUB_STATUS_STORAGE_KEY = "sub_status";
const ENTITLEMENT_STATUS_PATH =
  process.env.EXPO_PUBLIC_ENTITLEMENT_STATUS_PATH ?? "/entitlements/me";
const STRIPE_CHECKOUT_PATH =
  process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_PATH ?? "/stripe/checkout";
const STRIPE_PORTAL_PATH =
  process.env.EXPO_PUBLIC_STRIPE_PORTAL_PATH ?? "/stripe/portal";
const PENDING_STRIPE_CHECKOUT_KEY = "pending_stripe_checkout_started_at";

export type SubscriptionStatus = {
  isValid: boolean;
  autoRenewing: boolean;
  expiryDate: Date | null;
  source?: "workspace" | "individual_iap" | "individual_stripe" | null;
  provider?: "workspace" | "revenuecat" | "stripe" | null;
  providerStatus?: string | null;
  workspace?: {
    id: string;
    name: string;
    role: "owner" | "admin" | "member";
    memberStatus: "invited" | "active" | "revoked";
    plan: string | null;
    seatLimit: number | null;
    subscriptionStatus: string | null;
  } | null;
  individual?: Record<string, unknown> | null;
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

  const rawSource = payload as Record<string, unknown>;
  const nested =
    rawSource.data && typeof rawSource.data === "object"
      ? (rawSource.data as Record<string, unknown>)
      : null;
  const target = nested ?? rawSource;

  const isValidRaw =
    target.hasAccess ??
    target.isSubscribed ??
    target.isValid ??
    target.subscribed ??
    target.premium;

  const expiryRaw =
    target.expiresAt ??
    target.expiryDate ??
    target.expirationDate;

  const entitlementSource =
    target.source === "workspace" ||
    target.source === "individual_iap" ||
    target.source === "individual_stripe"
      ? target.source
      : null;
  const workspace =
    target.workspace && typeof target.workspace === "object"
      ? (target.workspace as SubscriptionStatus["workspace"])
      : null;
  const individual =
    target.individual && typeof target.individual === "object"
      ? (target.individual as Record<string, unknown>)
      : null;
  const provider =
    entitlementSource === "workspace"
      ? "workspace"
      : entitlementSource === "individual_iap"
        ? "revenuecat"
        : entitlementSource === "individual_stripe"
          ? "stripe"
          : null;

  return {
    isValid: Boolean(isValidRaw),
    autoRenewing: Boolean(target.autoRenewing ?? target.willRenew ?? false),
    expiryDate: typeof expiryRaw === "string" ? new Date(expiryRaw) : null,
    source: entitlementSource,
    provider,
    providerStatus: typeof target.providerStatus === "string" ? target.providerStatus : null,
    workspace,
    individual,
  };
};

const cacheSubscriptionStatus = async (status: SubscriptionStatus): Promise<void> => {
  await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
};

const getStripeReturnUrls = (): { successUrl?: string; cancelUrl?: string; returnUrl?: string } => {
  if (typeof window === "undefined" || !window.location?.origin) {
    return {};
  }

  const origin = window.location.origin;
  return {
    successUrl: `${origin}/success?checkout=success`,
    cancelUrl: `${origin}/cancel?checkout=cancel`,
    returnUrl: `${origin}/purchase?portal=return`,
  };
};

export const getRevenueCatConfigurationError = (): string | null => null;

export const getRevenueCatTargetProductIds = (): string[] => [];
export const isNativeStorePurchaseEnabled = (): boolean => false;

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
      source?: SubscriptionStatus["source"];
      provider?: SubscriptionStatus["provider"];
      providerStatus?: string | null;
      workspace?: SubscriptionStatus["workspace"];
      individual?: SubscriptionStatus["individual"];
    };

    return {
      isValid: Boolean(parsed.isValid),
      autoRenewing: Boolean(parsed.autoRenewing),
      expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
      source: parsed.source ?? null,
      provider: parsed.provider ?? null,
      providerStatus: parsed.providerStatus ?? null,
      workspace: parsed.workspace ?? null,
      individual: parsed.individual ?? null,
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
      ENTITLEMENT_STATUS_PATH,
      { method: "GET" },
      accessToken
    );

    const status = normalizeBackendStatus(payload);
    if (!status) {
      return null;
    }

    await cacheSubscriptionStatus(status);
    return status;
  } catch {
    return null;
  }
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

export const syncRevenueCatStatusToBackend = async (): Promise<SubscriptionStatus | null> => null;

export const cancelSubscription = async (): Promise<void> => {
  throw new Error("Manage subscription is not supported on web.");
};

export const startStripeCheckout = async (accessToken?: string | null): Promise<void> => {
  const { successUrl, cancelUrl } = getStripeReturnUrls();
  const payload = await apiRequest<unknown>(STRIPE_CHECKOUT_PATH, {
    method: "POST",
    body: JSON.stringify({ successUrl, cancelUrl }),
  }, accessToken);

  const url =
    payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string"
      ? (payload as any).url
      : null;

  if (!url) {
    throw new Error("Checkout URL missing from response");
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(PENDING_STRIPE_CHECKOUT_KEY, String(Date.now()));
    window.location.assign(url);
    return;
  }

  await Linking.openURL(url);
};

export const startStripePortal = async (accessToken?: string | null): Promise<void> => {
  const { returnUrl } = getStripeReturnUrls();
  const payload = await apiRequest<unknown>(STRIPE_PORTAL_PATH, {
    method: "POST",
    body: JSON.stringify({ returnUrl }),
  }, accessToken);

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
