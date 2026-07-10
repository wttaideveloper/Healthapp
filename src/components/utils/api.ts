type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown | null;
  };
  code?: string;
  message?: string;
  detail?: string | Array<{ msg?: string; message?: string }>;
};

export class ApiError extends Error {
  status?: number;
  isNetworkError: boolean;
  isTimeout: boolean;

  constructor(
    message: string,
    options: { status?: number; isNetworkError?: boolean; isTimeout?: boolean } = {}
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.isNetworkError = Boolean(options.isNetworkError);
    this.isTimeout = Boolean(options.isTimeout);
  }
}

const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

const rawBase = (process.env.EXPO_PUBLIC_API_BASE_URL ?? "").trim();
const baseNoSlash = rawBase.replace(/\/$/, "");

// Accept either:
// - EXPO_PUBLIC_API_BASE_URL="https://example.com" (recommended)
// - EXPO_PUBLIC_API_BASE_URL="https://example.com/api/v1"
const API_ROOT =
  baseNoSlash.endsWith("/api/v1") || baseNoSlash.endsWith("/api/v1/")
    ? baseNoSlash.replace(/\/$/, "")
    : baseNoSlash
      ? `${baseNoSlash}/api/v1`
      : "";

export const getApiRoot = (): string => API_ROOT;

const isAbortError = (error: unknown): boolean =>
  error instanceof Error &&
  (error.name === "AbortError" || error.message.toLowerCase().includes("aborted"));

const extractFastApiDetail = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const detail = (payload as ApiErrorPayload).detail;
  if (typeof detail === "string" && detail.trim()) {
    return detail.trim();
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((entry) => entry?.msg ?? entry?.message ?? "")
      .map((value) => value.trim())
      .filter(Boolean);
    if (messages.length) {
      return messages.join(". ");
    }
  }

  return null;
};

const toUserFacingHttpError = (status: number, serverMessage: string | null): string => {
  if (status === 401 || status === 403) {
    return serverMessage?.trim() || "Invalid email or password.";
  }

  if (status === 404) {
    return serverMessage?.trim() || "The requested service is unavailable. Please try again later.";
  }

  if (status >= 500) {
    return "The server is temporarily unavailable. Please try again in a moment.";
  }

  if (serverMessage?.trim()) {
    return serverMessage.trim();
  }

  return `Request failed (${status}). Please try again.`;
};

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string | null
): Promise<T> => {
  if (!API_ROOT) {
    console.error("[API] Missing EXPO_PUBLIC_API_BASE_URL");
    throw new ApiError(
      "Sign-in is temporarily unavailable. Please try again later.",
      { status: 503 }
    );
  }

  const headers = new Headers(options.headers ?? {});
  // Avoid triggering CORS preflight for simple GET/HEAD requests when no body is sent.
  // We only set Content-Type when a body is present (POST/PATCH/PUT with JSON).
  if (options.body != null) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const normalizedPath = (() => {
    const p = path.trim() || "/";
    const withSlash = p.startsWith("/") ? p : `/${p}`;
    return withSlash.startsWith("/api/v1") ? withSlash.slice("/api/v1".length) || "/" : withSlash;
  })();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_ROOT}${normalizedPath}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } catch (error) {
    if (isAbortError(error)) {
      throw new ApiError("Request timed out. Please check your connection and try again.", {
        isNetworkError: true,
        isTimeout: true,
      });
    }

    console.warn("[API] Network request failed:", error);
    throw new ApiError("Unable to reach the server. Please check your internet connection and try again.", {
      isNetworkError: true,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const serverMessage =
      (payload as ApiErrorPayload | null)?.error?.message ??
      (typeof (payload as ApiErrorPayload | null)?.message === "string"
        ? (payload as ApiErrorPayload).message
        : null) ??
      extractFastApiDetail(payload);

    const message = toUserFacingHttpError(res.status, serverMessage);
    console.warn(`[API] ${res.status} ${normalizedPath}:`, serverMessage ?? message);
    throw new ApiError(message, { status: res.status });
  }

  return payload as T;
};
