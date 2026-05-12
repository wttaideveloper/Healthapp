import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking, Platform } from "react-native";
import type { CustomerInfo, PurchasesPackage } from "react-native-purchases";
import { apiRequest, getApiRoot } from "./api";

const SUB_STATUS_STORAGE_KEY = "sub_status";
const ENTITLEMENT_STATUS_PATH =
  process.env.EXPO_PUBLIC_ENTITLEMENT_STATUS_PATH ?? "/entitlements/me";
const REVENUECAT_SYNC_PATH =
  (
    process.env.EXPO_PUBLIC_ENTITLEMENT_REVENUECAT_SYNC_PATH ??
    process.env.EXPO_PUBLIC_REVENUECAT_SYNC_PATH ??
    "/entitlements/revenuecat/sync"
  ).trim();

const REVENUECAT_IOS_API_KEY =
  (process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? "").trim();
const REVENUECAT_ANDROID_API_KEY =
  (process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? "").trim();
const REVENUECAT_ENTITLEMENT_ID =
  (process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID ?? "").trim();
const REVENUECAT_OFFERING_ID =
  (process.env.EXPO_PUBLIC_REVENUECAT_OFFERING_ID ?? "").trim();
const REVENUECAT_PACKAGE_ID =
  (process.env.EXPO_PUBLIC_REVENUECAT_PACKAGE_ID ?? "").trim();
const REVENUECAT_PRODUCT_IDS = (process.env.EXPO_PUBLIC_REVENUECAT_PRODUCT_IDS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

type RevenueCatRuntimeConfig = {
  iosApiKey: string;
  androidApiKey: string;
  entitlementId: string;
  offeringId: string;
  packageId: string;
  productIds: string[];
  syncPath: string;
};

type PurchasesModule = {
  configure: (args: { apiKey: string }) => void;
  getOfferings: () => Promise<any>;
  getCustomerInfo: () => Promise<CustomerInfo>;
  purchasePackage: (pkg: PurchasesPackage) => Promise<{ customerInfo: CustomerInfo }>;
  restorePurchases: () => Promise<CustomerInfo>;
  logIn?: (appUserId: string) => Promise<{ customerInfo: CustomerInfo; created: boolean }>;
  logOut?: () => Promise<CustomerInfo>;
};

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

const getRevenueCatConfig = (): RevenueCatRuntimeConfig => ({
  iosApiKey: REVENUECAT_IOS_API_KEY,
  androidApiKey: REVENUECAT_ANDROID_API_KEY,
  entitlementId: REVENUECAT_ENTITLEMENT_ID,
  offeringId: REVENUECAT_OFFERING_ID,
  packageId: REVENUECAT_PACKAGE_ID,
  productIds: REVENUECAT_PRODUCT_IDS,
  syncPath: REVENUECAT_SYNC_PATH,
});

const getApiKeyForPlatform = (config: RevenueCatRuntimeConfig): string => {
  if (Platform.OS === "ios") return config.iosApiKey;
  if (Platform.OS === "android") return config.androidApiKey;
  return "";
};

export const getRevenueCatConfigurationError = (): string | null => {
  if (Platform.OS === "web") {
    return null;
  }

  const config = getRevenueCatConfig();

  if (!config.entitlementId) {
    return "Missing EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID.";
  }
  if (!config.offeringId) {
    return "Missing EXPO_PUBLIC_REVENUECAT_OFFERING_ID.";
  }
  if (!config.packageId) {
    return "Missing EXPO_PUBLIC_REVENUECAT_PACKAGE_ID.";
  }

  const apiKey = getApiKeyForPlatform(config);
  if (!apiKey) {
    const keyName = Platform.OS === "ios"
      ? "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY"
      : "EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY";
    return `Missing ${keyName}.`;
  }

  return null;
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

let configuredRevenueCat = false;

const getPurchases = (): PurchasesModule | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("react-native-purchases");
    return (mod?.default ?? mod) as PurchasesModule;
  } catch {
    return null;
  }
};

const getBillingPeriodLabel = (pkg: PurchasesPackage): string => {
  const storeProduct = (pkg as any)?.storeProduct ?? {};
  const period = storeProduct.subscriptionPeriod;

  if (typeof period === "string" && period) {
    return period;
  }

  if (period && typeof period === "object") {
    const units = Number((period as any).numberOfUnits ?? 1);
    const unitRaw = String((period as any).unit ?? "").toLowerCase();
    const unit = unitRaw || "period";
    return `${units} ${unit}${units > 1 ? "s" : ""}`;
  }

  const packageType = String((pkg as any)?.packageType ?? "").toUpperCase();
  if (packageType === "ANNUAL") return "1 year";
  if (packageType === "MONTHLY") return "1 month";
  if (packageType === "WEEKLY") return "1 week";

  return "";
};

const getPriceString = (storeProduct: any): string => {
  const direct =
    storeProduct?.priceString ??
    storeProduct?.formattedPrice ??
    storeProduct?.priceStringIOS ??
    "";

  if (typeof direct === "string" && direct.trim()) {
    return direct.trim();
  }

  const priceRaw = storeProduct?.price;
  const priceNumber =
    typeof priceRaw === "number"
      ? priceRaw
      : typeof priceRaw === "string"
        ? Number(priceRaw)
        : NaN;
  const currencyCode =
    typeof storeProduct?.currencyCode === "string" && storeProduct.currencyCode.trim()
      ? storeProduct.currencyCode.trim()
      : "";

  if (!Number.isNaN(priceNumber)) {
    return currencyCode ? `${currencyCode} ${priceNumber}` : `${priceNumber}`;
  }

  return "";
};

const getPackageSummary = (pkg: PurchasesPackage): RevenueCatPackageSummary => {
  const storeProduct = (pkg as any)?.storeProduct ?? {};
  return {
    identifier: String((pkg as any)?.identifier ?? ""),
    packageType: String((pkg as any)?.packageType ?? ""),
    productIdentifier: String(storeProduct?.identifier ?? ""),
    title: String(storeProduct?.title ?? ""),
    description: String(storeProduct?.description ?? ""),
    priceString: getPriceString(storeProduct),
    billingPeriod: getBillingPeriodLabel(pkg),
  };
};

const statusFromCustomerInfo = (
  info: CustomerInfo | null,
  entitlementId: string
): SubscriptionStatus | null => {
  if (!info || !entitlementId) return null;

  const entitlement = (info as any)?.entitlements?.active?.[entitlementId];
  const activeSubscriptions = Array.isArray((info as any)?.activeSubscriptions)
    ? ((info as any).activeSubscriptions as unknown[])
    : [];

  if (!entitlement && activeSubscriptions.length > 0) {
    const entitlementKeys = Object.keys((info as any)?.entitlements?.active ?? {});
    console.warn(
      `RevenueCat active subscriptions found but entitlement '${entitlementId}' is not active. Active entitlements: ${entitlementKeys.join(", ") || "none"}`
    );
  }

  const expiryRaw =
    entitlement?.expirationDate ??
    entitlement?.expiresDate ??
    entitlement?.expiresDateMillis ??
    (info as any)?.latestExpirationDate ??
    null;

  const expiryDate =
    typeof expiryRaw === "string"
      ? new Date(expiryRaw)
      : typeof expiryRaw === "number"
        ? new Date(expiryRaw)
        : null;
  const autoRenewing = Boolean(entitlement?.willRenew ?? entitlement?.isActive ?? activeSubscriptions.length > 0);

  return {
    isValid: Boolean(entitlement) || activeSubscriptions.length > 0,
    autoRenewing,
    expiryDate,
    source: "individual_iap",
    provider: "revenuecat",
    providerStatus: Boolean(entitlement) || activeSubscriptions.length > 0 ? "active" : null,
    workspace: null,
    individual: null,
  };
};

const getTransactionIds = (
  info: CustomerInfo | null,
  entitlement: any
): { transactionId: string | null; originalTransactionId: string | null } => {
  const latestTransactionId =
    entitlement?.latestPurchaseIdentifier ??
    entitlement?.latestTransactionIdentifier ??
    entitlement?.transactionIdentifier ??
    (info as any)?.latestTransaction?.transactionIdentifier ??
    null;

  const originalTransactionId =
    entitlement?.originalTransactionIdentifier ??
    (info as any)?.latestTransaction?.originalTransactionIdentifier ??
    null;

  return {
    transactionId:
      typeof latestTransactionId === "string" && latestTransactionId.trim()
        ? latestTransactionId
        : null,
    originalTransactionId:
      typeof originalTransactionId === "string" && originalTransactionId.trim()
        ? originalTransactionId
        : null,
  };
};

export const initIAP = async (): Promise<void> => {
  if (Platform.OS === "web") {
    return;
  }

  const Purchases = getPurchases();
  if (!Purchases) {
    return;
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    console.warn(`RevenueCat init skipped: ${configError}`);
    return;
  }

  if (configuredRevenueCat) {
    return;
  }

  const config = getRevenueCatConfig();
  const apiKey = getApiKeyForPlatform(config);

  try {
    Purchases.configure({ apiKey });
    configuredRevenueCat = true;
  } catch (error) {
    console.warn("RevenueCat init failed:", error);
  }
};

export const verifySubscriptionStatusRevenueCat = async (): Promise<SubscriptionStatus | null> => {
  if (Platform.OS === "web") return null;

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    console.warn(`RevenueCat status check skipped: ${configError}`);
    return null;
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) return null;

  try {
    const info = await Purchases.getCustomerInfo();
    const config = getRevenueCatConfig();
    return statusFromCustomerInfo(info, config.entitlementId);
  } catch (error) {
    console.warn("RevenueCat status check failed:", error);
    return null;
  }
};

export const syncRevenueCatUser = async (appUserId?: string | null): Promise<void> => {
  if (Platform.OS === "web") return;

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    return;
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) return;

  try {
    if (appUserId?.trim()) {
      await Purchases.logIn?.(appUserId.trim());
      return;
    }

    await Purchases.logOut?.();
  } catch (error) {
    console.warn("RevenueCat user sync failed:", error);
  }
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

    await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
    return status;
  } catch (error) {
    console.error("Backend entitlement status fetch failed:", error);
    return null;
  }
};

export const clearCachedSubscriptionStatus = async (): Promise<void> => {
  await AsyncStorage.removeItem(SUB_STATUS_STORAGE_KEY);
};

// Compatibility helper used in older screens (e.g. HistoryScreen).
// Returns a merged view: backend cached status plus RevenueCat (when available).
export const verifySubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  const backend = await verifySubscriptionStatusSafe();
  const rc = await verifySubscriptionStatusRevenueCat();
  if (!rc) return backend;

  const expiryDate =
    backend.expiryDate && rc.expiryDate
      ? backend.expiryDate > rc.expiryDate
        ? backend.expiryDate
        : rc.expiryDate
      : backend.expiryDate ?? rc.expiryDate ?? null;

  return {
    isValid: backend.isValid || rc.isValid,
    autoRenewing: backend.autoRenewing || rc.autoRenewing,
    expiryDate,
  };
};

export const getSubscriptions = async (): Promise<PurchasesPackage[]> => {
  if (Platform.OS === "web") return [];

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    throw new Error(configError);
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    throw new Error("RevenueCat module is unavailable.");
  }

  const config = getRevenueCatConfig();
  const offerings = await Purchases.getOfferings();
  const namedOffering = offerings?.all?.[config.offeringId] ?? null;
  const currentOffering = offerings?.current ?? null;
  const selectedOffering = namedOffering ?? currentOffering;

  if (!selectedOffering) {
    throw new Error(
      `No RevenueCat offering available. Expected offering '${config.offeringId}'.`
    );
  }

  const availablePackages = Array.isArray(selectedOffering?.availablePackages)
    ? (selectedOffering.availablePackages as PurchasesPackage[])
    : [];

  if (availablePackages.length === 0) {
    throw new Error(
      `RevenueCat offering '${selectedOffering?.identifier ?? config.offeringId}' has no available packages.`
    );
  }

  return availablePackages;
};

export const getSubscriptionSummaries = async (): Promise<RevenueCatPackageSummary[]> => {
  const packages = await getSubscriptions();
  return packages.map(getPackageSummary);
};

export const resolvePreferredPackage = (
  packages: PurchasesPackage[],
  selectedPackageIdentifier?: string | null
): PurchasesPackage | null => {
  if (!Array.isArray(packages) || packages.length === 0) {
    return null;
  }

  const config = getRevenueCatConfig();

  if (selectedPackageIdentifier?.trim()) {
    const selected = packages.find(
      (pkg) => String((pkg as any)?.identifier ?? "") === selectedPackageIdentifier.trim()
    );
    if (selected) {
      return selected;
    }
  }

  const configured = packages.find(
    (pkg) => String((pkg as any)?.identifier ?? "") === config.packageId
  );
  if (configured) {
    return configured;
  }

  const annual = packages.find(
    (pkg) => String((pkg as any)?.packageType ?? "").toUpperCase() === "ANNUAL"
  );
  if (annual) {
    return annual;
  }

  const byProductId = packages.find((pkg) => {
    const summary = getPackageSummary(pkg);
    return config.productIds.includes(summary.productIdentifier);
  });
  if (byProductId) {
    return byProductId;
  }

  return packages[0] ?? null;
};

export const purchaseSubscription = async (
  packages: PurchasesPackage[],
  selectedPackageIdentifier?: string | null
): Promise<SubscriptionStatus> => {
  if (Platform.OS === "web") {
    throw new Error("Purchases are not supported on web.");
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    throw new Error(configError);
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    throw new Error("RevenueCat is not available.");
  }

  const pkg = resolvePreferredPackage(packages, selectedPackageIdentifier);
  if (!pkg) {
    throw new Error("No subscription packages available to purchase.");
  }

  const { customerInfo } = await Purchases.purchasePackage(pkg);
  const status = statusFromCustomerInfo(customerInfo, getRevenueCatConfig().entitlementId);
  if (!status) {
    throw new Error("Purchase completed but status could not be determined.");
  }

  return status;
};

export const restorePurchases = async (): Promise<SubscriptionStatus | null> => {
  if (Platform.OS === "web") return null;

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    throw new Error(configError);
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) return null;

  try {
    const info = await Purchases.restorePurchases();
    return statusFromCustomerInfo(info, getRevenueCatConfig().entitlementId);
  } catch (error) {
    console.warn("Restore purchases failed:", error);
    return null;
  }
};

export const syncRevenueCatStatusToBackend = async (
  accessToken: string,
  appUserId?: string | null
): Promise<boolean> => {
  if (Platform.OS === "web") {
    return false;
  }

  if (!accessToken || !getApiRoot()) {
    return false;
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    console.warn(`Skipping RevenueCat backend sync: ${configError}`);
    return false;
  }

  const config = getRevenueCatConfig();
  if (!config.syncPath) {
    console.warn("Skipping RevenueCat backend sync: EXPO_PUBLIC_ENTITLEMENT_REVENUECAT_SYNC_PATH is not configured.");
    return false;
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    return false;
  }

  try {
    const info = await Purchases.getCustomerInfo();
    const entitlement = (info as any)?.entitlements?.active?.[config.entitlementId] ?? null;
    const status = statusFromCustomerInfo(info, config.entitlementId);
    const transactionIds = getTransactionIds(info, entitlement);

    const payload = {
      appUserId: appUserId?.trim() ? appUserId.trim() : null,
      platform: Platform.OS,
      entitlementId: config.entitlementId,
      isActive: Boolean(status?.isValid),
      autoRenewing: Boolean(status?.autoRenewing),
      expiryDate: status?.expiryDate ? status.expiryDate.toISOString() : null,
      productId: String(entitlement?.productIdentifier ?? "") || null,
      transactionId: transactionIds.transactionId,
      originalTransactionId: transactionIds.originalTransactionId,
      customerInfo: {
        originalAppUserId:
          typeof (info as any)?.originalAppUserId === "string"
            ? (info as any).originalAppUserId
            : null,
        activeSubscriptions: Array.isArray((info as any)?.activeSubscriptions)
          ? (info as any).activeSubscriptions
          : [],
        latestExpirationDate:
          typeof (info as any)?.latestExpirationDate === "string"
            ? (info as any).latestExpirationDate
            : null,
        entitlementsActive: Object.keys((info as any)?.entitlements?.active ?? {}),
      },
    };

    await apiRequest<unknown>(
      config.syncPath,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      accessToken
    );

    return true;
  } catch (error) {
    console.warn("RevenueCat backend sync failed:", error);
    return false;
  }
};

export const cancelSubscription = async (): Promise<void> => {
  const url =
    Platform.OS === "ios"
      ? "https://apps.apple.com/account/subscriptions"
      : "https://play.google.com/store/account/subscriptions";
  await Linking.openURL(url);
};

// Web-only: Stripe checkout (implemented in purchase.web.ts). Keep a stub here for TS.
export const startStripeCheckout = async (_accessToken?: string | null): Promise<void> => {
  throw new Error("Stripe checkout is only available on web.");
};

// Web-only: Stripe billing portal (implemented in purchase.web.ts). Keep a stub here for TS.
export const startStripePortal = async (_accessToken?: string | null): Promise<void> => {
  throw new Error("Stripe billing portal is only available on web.");
};
