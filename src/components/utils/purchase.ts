import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking, Platform } from "react-native";
import type { CustomerInfo, PurchasesPackage } from "react-native-purchases";
import { apiRequest, getApiRoot } from "./api";

const SUB_STATUS_STORAGE_KEY = "sub_status";
const ENTITLEMENT_STATUS_PATH =
  process.env.EXPO_PUBLIC_ENTITLEMENT_STATUS_PATH ?? "/entitlements/me";
const STRIPE_CHECKOUT_PATH =
  process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_PATH ?? "/stripe/checkout";
const STRIPE_PORTAL_PATH =
  process.env.EXPO_PUBLIC_STRIPE_PORTAL_PATH ?? "/stripe/portal";
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
// Mac App Store builds MUST use StoreKit via RevenueCat ("iap").
// Stripe is only for non-store / direct Mac Catalyst distribution when explicitly set.
const MAC_CATALYST_BILLING_MODE = (
  process.env.EXPO_PUBLIC_MAC_CATALYST_BILLING_MODE ?? "iap"
).trim().toLowerCase();
const NATIVE_RETURN_SCHEME = (
  process.env.EXPO_PUBLIC_NATIVE_RETURN_SCHEME ?? "com.wtt.healthAge"
).trim();
const MAC_STRIPE_SUCCESS_URL = (
  process.env.EXPO_PUBLIC_MAC_STRIPE_SUCCESS_URL ?? "https://health-age.vercel.app/success?checkout=success&source=macapp"
).trim();
const MAC_STRIPE_CANCEL_URL = (
  process.env.EXPO_PUBLIC_MAC_STRIPE_CANCEL_URL ?? "https://health-age.vercel.app/cancel?checkout=cancel&source=macapp"
).trim();
const MAC_STRIPE_PORTAL_RETURN_URL = (
  process.env.EXPO_PUBLIC_MAC_STRIPE_PORTAL_RETURN_URL ?? "https://health-age.vercel.app/purchase?portal=return&source=macapp"
).trim();

type RevenueCatRuntimeConfig = {
  iosApiKey: string;
  androidApiKey: string;
  entitlementId: string;
  offeringId: string;
  packageId: string;
  productIds: string[];
  syncPath: string;
};

type RevenueCatSyncAction = "purchase" | "restore" | "status_check";

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

export const USER_FACING_SUBSCRIPTION_ERROR =
  "Unable to load subscriptions. Please try again.";

export const logStoreError = (context: string, error: unknown): void => {
  const message =
    error instanceof Error ? error.message : String(error ?? "Unknown store error");
  console.warn(`[RevenueCat:${context}]`, message);
};

export const toUserFacingStoreError = (error: unknown): string => {
  logStoreError("ui", error);
  return USER_FACING_SUBSCRIPTION_ERROR;
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

export const getRevenueCatTargetProductIds = (): string[] =>
  getRevenueCatConfig().productIds;

const isMacCatalyst = (): boolean =>
  Platform.OS === "ios" && Boolean((Platform as any)?.constants?.isMacCatalyst);

/**
 * Stripe on native is Mac Catalyst only, and only when billing mode is explicitly "stripe".
 * Default / "iap" / any other value uses RevenueCat (StoreKit) — required for Mac App Store.
 */
const shouldUseStripeOnNative = (): boolean =>
  isMacCatalyst() && MAC_CATALYST_BILLING_MODE === "stripe";

export const isNativeStorePurchaseEnabled = (): boolean =>
  Platform.OS !== "web" && !shouldUseStripeOnNative();

const assertStripeAllowedOnCurrentPlatform = (): void => {
  if (Platform.OS === "web") {
    return;
  }

  if (isNativeStorePurchaseEnabled()) {
    throw new Error(
      "Stripe checkout is not available in App Store builds. Use In-App Purchase via RevenueCat."
    );
  }

  if (!shouldUseStripeOnNative()) {
    throw new Error(
      "Stripe checkout is disabled on this platform. Set EXPO_PUBLIC_MAC_CATALYST_BILLING_MODE=stripe only for non-store Mac builds."
    );
  }
};

const getNativeBillingReturnUrls = (): { successUrl: string; cancelUrl: string; returnUrl: string } => {
  // Only used when shouldUseStripeOnNative() is true (explicit Mac Catalyst stripe mode).
  if (isMacCatalyst() && MAC_CATALYST_BILLING_MODE === "stripe") {
    return {
      successUrl: MAC_STRIPE_SUCCESS_URL,
      cancelUrl: MAC_STRIPE_CANCEL_URL,
      returnUrl: MAC_STRIPE_PORTAL_RETURN_URL,
    };
  }

  const encodedSuccess = encodeURIComponent("success");
  const encodedCancel = encodeURIComponent("cancel");
  return {
    successUrl: `${NATIVE_RETURN_SCHEME}://purchase?checkout=${encodedSuccess}`,
    cancelUrl: `${NATIVE_RETURN_SCHEME}://purchase?checkout=${encodedCancel}`,
    returnUrl: `${NATIVE_RETURN_SCHEME}://purchase?portal=return`,
  };
};

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

const cacheSubscriptionStatus = async (status: SubscriptionStatus): Promise<void> => {
  await AsyncStorage.setItem(SUB_STATUS_STORAGE_KEY, JSON.stringify(status));
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

const getPackageProductIdentifiers = (pkg: PurchasesPackage): string[] => {
  const storeProduct = (pkg as any)?.storeProduct ?? {};
  return [
    storeProduct?.identifier,
    storeProduct?.productIdentifier,
    storeProduct?.productId,
    (pkg as any)?.productIdentifier,
    (pkg as any)?.productId,
  ]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);
};

const packageMatchesConfiguredProduct = (
  pkg: PurchasesPackage,
  productIds: string[]
): boolean => {
  if (!productIds.length) {
    return false;
  }

  const configured = new Set(productIds.map((value) => value.trim()).filter(Boolean));
  return getPackageProductIdentifiers(pkg).some((identifier) =>
    Array.from(configured).some(
      (productId) => identifier === productId || identifier.startsWith(`${productId}:`)
    )
  );
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

  const normalizedTransactionId =
    typeof latestTransactionId === "string" && latestTransactionId.trim()
      ? latestTransactionId.trim()
      : typeof originalTransactionId === "string" && originalTransactionId.trim()
        ? originalTransactionId.trim()
        : null;

  return {
    transactionId: normalizedTransactionId,
    originalTransactionId:
      typeof originalTransactionId === "string" && originalTransactionId.trim()
        ? originalTransactionId.trim()
        : normalizedTransactionId,
  };
};

export const isPurchaseCancelledError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { userCancelled?: boolean; code?: string };
  return (
    candidate.userCancelled === true ||
    candidate.code === "PURCHASE_CANCELLED" ||
    candidate.code === "1"
  );
};

export const initIAP = async (): Promise<void> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
    return;
  }

  const Purchases = getPurchases();
  if (!Purchases) {
    logStoreError("init", "RevenueCat native module is unavailable in this build.");
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    logStoreError("init", configError);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
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
    logStoreError("configure", error);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }
};

export const verifySubscriptionStatusRevenueCat = async (): Promise<SubscriptionStatus | null> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) return null;

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
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) return;

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

    await cacheSubscriptionStatus(status);
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
    source: backend.source ?? rc.source ?? null,
    provider: backend.provider ?? rc.provider ?? null,
    providerStatus: backend.providerStatus ?? rc.providerStatus ?? null,
    workspace: backend.workspace ?? rc.workspace ?? null,
    individual: backend.individual ?? rc.individual ?? null,
  };
};

export const getSubscriptions = async (): Promise<PurchasesPackage[]> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) return [];

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    logStoreError("offerings", configError);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    logStoreError("offerings", "RevenueCat module is unavailable.");
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  try {
    const config = getRevenueCatConfig();
    const offerings = await Purchases.getOfferings();
    const namedOffering = offerings?.all?.[config.offeringId] ?? null;
    const currentOffering = offerings?.current ?? null;
    const selectedOffering = namedOffering ?? currentOffering;

    if (!selectedOffering) {
      logStoreError(
        "offerings",
        `No offering available. Expected offering '${config.offeringId}'.`
      );
      throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
    }

    const availablePackages = Array.isArray(selectedOffering?.availablePackages)
      ? (selectedOffering.availablePackages as PurchasesPackage[])
      : [];

    if (availablePackages.length === 0) {
      logStoreError(
        "offerings",
        `Offering '${selectedOffering?.identifier ?? config.offeringId}' has no packages.`
      );
      throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
    }

    return availablePackages;
  } catch (error) {
    if (error instanceof Error && error.message === USER_FACING_SUBSCRIPTION_ERROR) {
      throw error;
    }
    logStoreError("offerings", error);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }
};

export const getSubscriptionSummaries = async (): Promise<RevenueCatPackageSummary[]> => {
  try {
    const packages = await getSubscriptions();
    return packages.map(getPackageSummary);
  } catch (error) {
    logStoreError("summaries", error);
    return [];
  }
};

export const resolvePreferredPackage = (
  packages: PurchasesPackage[],
  selectedPackageIdentifier?: string | null
): PurchasesPackage | null => {
  if (!Array.isArray(packages) || packages.length === 0) {
    return null;
  }

  const config = getRevenueCatConfig();

  const byProductId = packages.find((pkg) =>
    packageMatchesConfiguredProduct(pkg, config.productIds)
  );
  if (byProductId) {
    return byProductId;
  }

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

  return packages[0] ?? null;
};

export const purchaseSubscription = async (
  packages: PurchasesPackage[],
  selectedPackageIdentifier?: string | null
): Promise<SubscriptionStatus> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
    throw new Error("Purchases are not supported on web.");
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    logStoreError("purchase", configError);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    logStoreError("purchase", "RevenueCat is not available.");
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  const pkg = resolvePreferredPackage(packages, selectedPackageIdentifier);
  if (!pkg) {
    logStoreError("purchase", "No subscription packages available to purchase.");
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const status = statusFromCustomerInfo(customerInfo, getRevenueCatConfig().entitlementId);
    if (!status) {
      logStoreError("purchase", "Purchase completed but status could not be determined.");
      throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
    }

    return status;
  } catch (error) {
    if (isPurchaseCancelledError(error)) {
      throw error;
    }

    logStoreError("purchase", error);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
  }
};

export const restorePurchases = async (): Promise<SubscriptionStatus | null> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) return null;

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    logStoreError("restore", configError);
    throw new Error(USER_FACING_SUBSCRIPTION_ERROR);
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
  appUserId?: string | null,
  action: RevenueCatSyncAction = "status_check"
): Promise<SubscriptionStatus | null> => {
  if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
    return null;
  }

  if (!accessToken || !getApiRoot()) {
    return null;
  }

  const configError = getRevenueCatConfigurationError();
  if (configError) {
    console.warn(`Skipping RevenueCat backend sync: ${configError}`);
    return null;
  }

  const config = getRevenueCatConfig();
  if (!config.syncPath) {
    console.warn("Skipping RevenueCat backend sync: EXPO_PUBLIC_ENTITLEMENT_REVENUECAT_SYNC_PATH is not configured.");
    return null;
  }

  await initIAP();
  const Purchases = getPurchases();
  if (!Purchases) {
    return null;
  }

  try {
    const info = await Purchases.getCustomerInfo();
    const entitlement = (info as any)?.entitlements?.active?.[config.entitlementId] ?? null;
    const status = statusFromCustomerInfo(info, config.entitlementId);
    const activeSubscriptions = Array.isArray((info as any)?.activeSubscriptions)
      ? ((info as any).activeSubscriptions as unknown[])
      : [];
    const productId =
      String(entitlement?.productIdentifier ?? "").trim() ||
      (typeof activeSubscriptions[0] === "string" ? activeSubscriptions[0] : "") ||
      null;
    const transactionIds = getTransactionIds(info, entitlement);
    if (!transactionIds.transactionId || !transactionIds.originalTransactionId) {
      const message =
        "RevenueCat did not provide transaction identifiers, so the store purchase was not synced to the backend.";
      if (action === "status_check") {
        console.warn(message);
        return null;
      }
      throw new Error(message);
    }

    const originalAppUserId =
      typeof (info as any)?.originalAppUserId === "string"
        ? (info as any).originalAppUserId
        : null;

    const payload = {
      appUserId: appUserId?.trim() ? appUserId.trim() : null,
      platform: Platform.OS,
      action,
      entitlementId: config.entitlementId,
      isActive: Boolean(status?.isValid),
      autoRenewing: Boolean(status?.autoRenewing),
      expiryDate: status?.expiryDate ? status.expiryDate.toISOString() : null,
      productId,
      transactionId: transactionIds.transactionId,
      originalTransactionId: transactionIds.originalTransactionId,
      customerInfo: {
        originalAppUserId,
        activeSubscriptions,
        latestExpirationDate:
          typeof (info as any)?.latestExpirationDate === "string"
            ? (info as any).latestExpirationDate
            : null,
        entitlementsActive: Object.keys((info as any)?.entitlements?.active ?? {}),
      },
    };

    const response = await apiRequest<unknown>(
      config.syncPath,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      accessToken
    );

    const backendStatus = normalizeBackendStatus(response);
    if (backendStatus) {
      await cacheSubscriptionStatus(backendStatus);
    }

    return backendStatus;
  } catch (error) {
    console.warn("RevenueCat backend sync failed:", error);
    throw error;
  }
};

export const cancelSubscription = async (): Promise<void> => {
  if (shouldUseStripeOnNative()) {
    throw new Error("Use billing portal for direct macOS distribution.");
  }
  // Mac Catalyst (IAP) and iPhone/iPad share Platform.OS === "ios" → Apple subscription settings.
  const url =
    Platform.OS === "ios"
      ? "https://apps.apple.com/account/subscriptions"
      : "https://play.google.com/store/account/subscriptions";
  await Linking.openURL(url);
};

export const startStripeCheckout = async (accessToken?: string | null): Promise<void> => {
  // Hard block: never open Stripe/web checkout from App Store native builds (incl. Mac Catalyst IAP).
  assertStripeAllowedOnCurrentPlatform();

  if (!getApiRoot()) {
    throw new Error("Billing is unavailable: API base URL is not configured.");
  }

  const body = shouldUseStripeOnNative()
    ? (() => {
        const urls = getNativeBillingReturnUrls();
        return {
          ...urls,
          // Compatibility for backends expecting snake_case fields.
          success_url: urls.successUrl,
          cancel_url: urls.cancelUrl,
          return_url: urls.returnUrl,
        };
      })()
    : {};

  const payload = await apiRequest<unknown>(
    STRIPE_CHECKOUT_PATH,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    accessToken
  );

  const url =
    payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string"
      ? (payload as any).url
      : null;

  if (!url) {
    throw new Error("Checkout URL missing from response");
  }

  await Linking.openURL(url);
};

export const startStripePortal = async (accessToken?: string | null): Promise<void> => {
  // Hard block: never open Stripe portal from App Store native builds (incl. Mac Catalyst IAP).
  assertStripeAllowedOnCurrentPlatform();

  if (!getApiRoot()) {
    throw new Error("Billing portal is unavailable: API base URL is not configured.");
  }

  const body = shouldUseStripeOnNative()
    ? (() => {
        const returnUrl = getNativeBillingReturnUrls().returnUrl;
        return {
          returnUrl,
          return_url: returnUrl,
        };
      })()
    : {};

  const payload = await apiRequest<unknown>(
    STRIPE_PORTAL_PATH,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    accessToken
  );

  const url =
    payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string"
      ? (payload as any).url
      : null;

  if (!url) {
    throw new Error("Billing portal URL missing from response");
  }

  await Linking.openURL(url);
};
