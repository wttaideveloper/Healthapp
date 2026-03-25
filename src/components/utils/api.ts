type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown | null;
  };
};

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

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string | null
): Promise<T> => {
  if (!API_ROOT) {
    throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");
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

  const res = await fetch(`${API_ROOT}${normalizedPath}`, {
    ...options,
    headers,
  });

  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const msg =
      (payload as ApiErrorPayload | null)?.error?.message ??
      (typeof (payload as any)?.message === "string" ? (payload as any).message : null) ??
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return payload as T;
};
