import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest, ApiError, getApiRoot } from "./api";
import { isValidName } from "./validation";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  hasAccess?: boolean;
  isEmailVerified?: boolean;
  status?: "pending" | "active";
  entitlement?: {
    source: "workspace" | "individual_iap" | "individual_stripe" | null;
    expiresAt: string | null;
    providerStatus: string | null;
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
  } | null;

  // Backwards-compat for older screens.
  emailVerified: boolean;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type VerifyEmailInput = {
  email: string;
  code: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  email: string;
  otp: string;
  newPassword: string;
};

export type SignInResult =
  | { status: "authenticated"; user: AuthUser; session: AuthSession }
  | { status: "needs_verification"; email: string };

export type SignUpResult =
  | { status: "authenticated"; user: AuthUser; session: AuthSession }
  | { status: "needs_verification"; email: string };

const SHOULD_FORCE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK_AUTH === "true";
const USE_MOCK_AUTH = SHOULD_FORCE_MOCK || (!getApiRoot() && __DEV__);

const MOCK_USERS_KEY = "mock_auth_users";
const MOCK_RESET_OTP_KEY = "mock_auth_reset_otp";

type StoredMockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
};

type StoredMockResetOtp = {
  email: string;
  otp: string;
  expiresAt: number;
};

const randomId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isValidEmail = (email: string): boolean => {
  // Pragmatic check; backend still enforces normalization + validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const normalizeAuthErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  const raw = error instanceof Error ? error.message : String(error ?? "");
  const normalized = raw.trim();
  const lower = normalized.toLowerCase();

  if (
    lower.includes("invalid email address") ||
    lower.includes("body/email") ||
    lower.includes("email must be")
  ) {
    return "Please enter a valid email address.";
  }

  if (lower.includes("password") && lower.includes("required")) {
    return "Password is required.";
  }

  if (lower.includes("missing expo_public_api_base_url")) {
    return "Sign-in is temporarily unavailable. Please try again later.";
  }

  if (
    lower.includes("unable to reach") ||
    lower.includes("timed out") ||
    lower.includes("network request failed") ||
    lower.includes("network error")
  ) {
    return "Unable to connect. Please check your internet connection and try again.";
  }

  if (
    lower.includes("invalid sign-in response") ||
    lower.includes("invalid sign-up response") ||
    lower.includes("invalid user response")
  ) {
    return "Sign-in failed due to an unexpected server response. Please try again.";
  }

  if (lower.includes("invalid email or password") || lower.includes("unauthorized")) {
    return "Invalid email or password.";
  }

  return normalized || "Unable to sign in";
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const unwrapPayload = (payload: unknown): Record<string, unknown> | null => {
  if (!isRecord(payload)) {
    return null;
  }

  if (isRecord(payload.data)) {
    return payload.data;
  }

  if (isRecord(payload.result)) {
    return payload.result;
  }

  return payload;
};

const parseNeedsVerificationEmail = (payload: unknown): string | null => {
  const source = unwrapPayload(payload);
  if (!source) {
    return null;
  }

  const status = source.status ?? source.state;
  const needsVerification =
    status === "needs_verification" ||
    status === "pending_verification" ||
    status === "pending";

  if (!needsVerification) {
    return null;
  }

  if (typeof source.email === "string" && source.email.trim()) {
    return source.email.trim();
  }

  const nestedUser = source.user;
  if (isRecord(nestedUser) && typeof nestedUser.email === "string" && nestedUser.email.trim()) {
    return nestedUser.email.trim();
  }

  return null;
};

const parseAuthenticatedAuthResponse = (
  payload: unknown
): { user: AuthUser; session: AuthSession } | null => {
  const source = unwrapPayload(payload);
  if (!source) {
    return null;
  }

  const userRaw = source.user ?? source.profile ?? source.account;
  const user = buildUserFromBackend(userRaw);
  const session =
    buildSessionFromBackend(source) ??
    buildSessionFromBackend(source.session) ??
    buildSessionFromBackend(payload);

  if (!user || !session) {
    return null;
  }

  return { user, session };
};

const getMockUsers = async (): Promise<StoredMockUser[]> => {
  const raw = await AsyncStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StoredMockUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setMockUsers = async (users: StoredMockUser[]): Promise<void> => {
  await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const getMockResetOtps = async (): Promise<StoredMockResetOtp[]> => {
  const raw = await AsyncStorage.getItem(MOCK_RESET_OTP_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredMockResetOtp[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setMockResetOtps = async (entries: StoredMockResetOtp[]): Promise<void> => {
  await AsyncStorage.setItem(MOCK_RESET_OTP_KEY, JSON.stringify(entries));
};

const toAuthUser = (user: StoredMockUser): AuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  hasAccess: false,
  emailVerified: user.emailVerified,
});

const buildUserFromBackend = (raw: unknown): AuthUser | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const source = raw as Record<string, unknown>;
  const id =
    typeof source.id === "string"
      ? source.id
      : typeof source._id === "string"
        ? source._id
        : null;

  const email = typeof source.email === "string" ? source.email : null;
  const name =
    typeof source.name === "string"
      ? source.name
      : typeof source.fullName === "string"
        ? source.fullName
        : "";

  if (!id || !email) {
    return null;
  }

  const isEmailVerified =
    typeof source.isEmailVerified === "boolean"
      ? source.isEmailVerified
      : typeof source.emailVerified === "boolean"
        ? source.emailVerified
        : true;

  const entitlement =
    source.entitlement && typeof source.entitlement === "object"
      ? (source.entitlement as AuthUser["entitlement"])
      : null;

  return {
    id,
    email,
    name,
    role: source.role === "admin" || source.role === "user" ? source.role : undefined,
    hasAccess: typeof source.hasAccess === "boolean" ? source.hasAccess : undefined,
    isEmailVerified,
    status: source.status === "pending" || source.status === "active" ? source.status : undefined,
    entitlement,
    emailVerified: isEmailVerified,
  };
};

const buildSessionFromBackend = (raw: unknown): AuthSession | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const source = raw as Record<string, unknown>;
  const accessToken =
    typeof source.accessToken === "string"
      ? source.accessToken
      : typeof source.token === "string"
        ? source.token
        : null;

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken:
      typeof source.refreshToken === "string" ? source.refreshToken : undefined,
  };
};

const mockSignUp = async ({ name, email, password }: SignUpInput): Promise<SignUpResult> => {
  const normalized = normalizeEmail(email);
  const normalizedName = name.trim();
  const users = await getMockUsers();
  const existing = users.find((u) => normalizeEmail(u.email) === normalized);

  if (!isValidName(normalizedName)) {
    throw new Error("Name must start with a letter and cannot be numbers only.");
  }

  if (existing) {
    throw new Error("User already exists. Please sign in.");
  }

  users.push({
    id: randomId(),
    name: normalizedName,
    email: normalized,
    password,
    emailVerified: false,
  });

  await setMockUsers(users);

  return {
    status: "needs_verification",
    email: normalized,
  };
};

const mockSignIn = async ({ email, password }: SignInInput): Promise<SignInResult> => {
  const normalized = normalizeEmail(email);
  const users = await getMockUsers();

  const user = users.find((u) => normalizeEmail(u.email) === normalized);
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  if (!user.emailVerified) {
    return {
      status: "needs_verification",
      email: user.email,
    };
  }

  return {
    status: "authenticated",
    user: toAuthUser(user),
    session: {
      accessToken: `mock_token_${user.id}`,
    },
  };
};

const mockVerifyEmail = async ({ email, code }: VerifyEmailInput): Promise<void> => {
  if (code.trim() !== "123456") {
    throw new Error("Invalid verification code. Use 123456 in development.");
  }

  const normalized = normalizeEmail(email);
  const users = await getMockUsers();
  const index = users.findIndex((u) => normalizeEmail(u.email) === normalized);

  if (index === -1) {
    throw new Error("User not found. Please sign up first.");
  }

  users[index] = {
    ...users[index],
    emailVerified: true,
  };

  await setMockUsers(users);
};

const mockForgotPassword = async ({ email }: ForgotPasswordInput): Promise<void> => {
  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) {
    throw new Error("Please enter a valid email address.");
  }

  const users = await getMockUsers();
  const exists = users.some((u) => normalizeEmail(u.email) === normalized);
  if (!exists) {
    // Keep the response generic even in mock mode.
    return;
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const entries = (await getMockResetOtps()).filter((entry) => entry.email !== normalized);
  entries.push({ email: normalized, otp, expiresAt });
  await setMockResetOtps(entries);

  if (__DEV__) {
    console.log(`Mock forgot-password OTP for ${normalized}: ${otp}`);
  }
};

const mockResetPassword = async ({ email, otp, newPassword }: ResetPasswordInput): Promise<void> => {
  const normalized = normalizeEmail(email);
  const normalizedOtp = otp.trim();
  const trimmedPassword = newPassword.trim();

  if (!isValidEmail(normalized)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!/^\d{6}$/.test(normalizedOtp)) {
    throw new Error("OTP must be a 6-digit code.");
  }
  if (trimmedPassword.length < 8) {
    throw new Error("New password must be at least 8 characters.");
  }

  const entries = await getMockResetOtps();
  const record = entries.find((entry) => entry.email === normalized);
  if (!record || record.expiresAt < Date.now()) {
    throw new Error("OTP expired or invalid. Please request a new code.");
  }
  if (record.otp !== normalizedOtp) {
    throw new Error("Invalid OTP. Please try again.");
  }

  const users = await getMockUsers();
  const index = users.findIndex((u) => normalizeEmail(u.email) === normalized);
  if (index === -1) {
    throw new Error("Account not found.");
  }

  users[index] = {
    ...users[index],
    password: trimmedPassword,
  };
  await setMockUsers(users);
  await setMockResetOtps(entries.filter((entry) => entry.email !== normalized));
};

const mockMe = async (token: string): Promise<AuthUser> => {
  if (!token.startsWith("mock_token_")) {
    throw new Error("Invalid session");
  }

  const userId = token.replace("mock_token_", "");
  const users = await getMockUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw new Error("Session expired");
  }

  return toAuthUser(user);
};

export const authService = {
  useMock: USE_MOCK_AUTH,

  async signIn(input: SignInInput): Promise<SignInResult> {
    if (USE_MOCK_AUTH) {
      return mockSignIn(input);
    }

    const email = normalizeEmail(input.email);
    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!input.password) {
      throw new Error("Password is required.");
    }

    try {
      const payload = await apiRequest<unknown>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: input.password }),
      });

      const verificationEmail = parseNeedsVerificationEmail(payload);
      if (verificationEmail) {
        return {
          status: "needs_verification",
          email: verificationEmail,
        };
      }

      const parsed = parseAuthenticatedAuthResponse(payload);
      if (!parsed) {
        console.error("[Auth] Unrecognized login response shape:", payload);
        throw new Error("Invalid sign-in response from server");
      }

      return {
        status: "authenticated",
        user: parsed.user,
        session: parsed.session,
      };
    } catch (error) {
      throw new Error(normalizeAuthErrorMessage(error));
    }
  },

  async signUp(input: SignUpInput): Promise<SignUpResult> {
    if (USE_MOCK_AUTH) {
      return mockSignUp(input);
    }

    const email = normalizeEmail(input.email);
    const normalizedName = input.name?.trim() ?? "";
    if (!normalizedName) {
      throw new Error("Name is required.");
    }
    if (!isValidName(normalizedName)) {
      throw new Error("Name must start with a letter and cannot be numbers only.");
    }
    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!input.password || input.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const payload = await apiRequest<unknown>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name: normalizedName, email, password: input.password }),
    });

    const verificationEmail = parseNeedsVerificationEmail(payload);
    if (verificationEmail) {
      return {
        status: "needs_verification",
        email: verificationEmail,
      };
    }

    const parsed = parseAuthenticatedAuthResponse(payload);
    if (parsed) {
      return { status: "authenticated", user: parsed.user, session: parsed.session };
    }

    console.error("[Auth] Unrecognized sign-up response shape:", payload);
    throw new Error("Invalid sign-up response from server");
  },

  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    if (USE_MOCK_AUTH) {
      await mockVerifyEmail(input);
      return;
    }
    // Backend does not expose an email verification endpoint in the provided API.
    throw new Error("Email verification is not supported by the backend yet.");
  },

  async resendVerification(email: string): Promise<void> {
    if (USE_MOCK_AUTH) {
      return;
    }
    throw new Error("Email verification is not supported by the backend yet.");
  },

  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    if (USE_MOCK_AUTH) {
      await mockForgotPassword(input);
      return;
    }

    const email = normalizeEmail(input.email);
    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }

    await apiRequest<unknown>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    if (USE_MOCK_AUTH) {
      await mockResetPassword(input);
      return;
    }

    const email = normalizeEmail(input.email);
    const otp = input.otp.trim();
    const newPassword = input.newPassword.trim();

    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!/^\d{6}$/.test(otp)) {
      throw new Error("OTP must be a 6-digit code.");
    }
    if (newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters.");
    }

    await apiRequest<unknown>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, otp, newPassword }),
    });
  },

  async me(accessToken: string): Promise<AuthUser> {
    if (USE_MOCK_AUTH) {
      return mockMe(accessToken);
    }

    const payload = await apiRequest<unknown>("/auth/me", { method: "GET" }, accessToken);
    const source = unwrapPayload(payload);
    const user = buildUserFromBackend(source?.user ?? source ?? payload);

    if (!user) {
      console.error("[Auth] Unrecognized /auth/me response shape:", payload);
      throw new Error("Invalid user response from server");
    }

    return user;
  },
};
