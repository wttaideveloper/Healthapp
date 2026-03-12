import AsyncStorage from "@react-native-async-storage/async-storage";

const SUB_STATUS_STORAGE_KEY = "sub_status";
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
    target.premium;

  const expiryRaw =
    target.expiryDate ??
    target.expiresAt ??
    target.expirationDate ??
    target.licenseExpiry;

  return {
    isValid: Boolean(isValidRaw),
    autoRenewing: false,
    expiryDate: typeof expiryRaw === "string" ? new Date(expiryRaw) : null,
  };
};

export const initIAP = async (): Promise<void> => {
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
  } catch {
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

export const verifySubscriptionStatusLive = async (): Promise<SubscriptionStatus> => {
  return verifySubscriptionStatusSafe();
};

// Native-only exports kept for compatibility with existing imports.
export const getSubscriptions = async (): Promise<never[]> => [];
export const purchaseSubscription = async (): Promise<never> => {
  throw new Error("Purchases are not supported on web.");
};
export const restorePurchases = async (): Promise<never> => {
  throw new Error("Restore is not supported on web.");
};
export const cancelSubscription = async (): Promise<void> => {
  throw new Error("Manage subscription is not supported on web.");
};
export const restoreSubscription = async (): Promise<never> => {
  throw new Error("Restore is not supported on web.");
};

