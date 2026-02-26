import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
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

export type SignInResult =
  | { status: "authenticated"; user: AuthUser; session: AuthSession }
  | { status: "needs_verification"; email: string };

export type SignUpResult = {
  status: "needs_verification";
  email: string;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const SHOULD_FORCE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK_AUTH === "true";
const USE_MOCK_AUTH = SHOULD_FORCE_MOCK || (!API_BASE_URL && __DEV__);

const MOCK_USERS_KEY = "mock_auth_users";

type StoredMockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
};

const randomId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

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

const toAuthUser = (user: StoredMockUser): AuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  emailVerified: user.emailVerified,
});

const request = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error(
      "Missing EXPO_PUBLIC_API_BASE_URL. Set this env var or enable mock auth with EXPO_PUBLIC_USE_MOCK_AUTH=true."
    );
  }

  const headers = new Headers(options.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof (payload as { message?: unknown }).message === "string"
        ? (payload as { message: string }).message
        : "Authentication request failed";
    throw new Error(message);
  }

  return payload as T;
};

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

  return {
    id,
    email,
    name,
    emailVerified:
      typeof source.emailVerified === "boolean" ? source.emailVerified : true,
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
  const users = await getMockUsers();
  const existing = users.find((u) => normalizeEmail(u.email) === normalized);

  if (existing) {
    throw new Error("User already exists. Please sign in.");
  }

  users.push({
    id: randomId(),
    name: name.trim(),
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

    const payload = await request<unknown>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const source = payload as Record<string, unknown>;
    const needsVerification = source?.needsVerification === true;
    const user = buildUserFromBackend(source?.user);
    const session = buildSessionFromBackend(source?.session ?? source);

    if (needsVerification || !user?.emailVerified) {
      return {
        status: "needs_verification",
        email: input.email,
      };
    }

    if (!user || !session) {
      throw new Error("Invalid sign-in response from server");
    }

    return {
      status: "authenticated",
      user,
      session,
    };
  },

  async signUp(input: SignUpInput): Promise<SignUpResult> {
    if (USE_MOCK_AUTH) {
      return mockSignUp(input);
    }

    const payload = await request<unknown>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const source = payload as Record<string, unknown>;

    return {
      status: "needs_verification",
      email:
        typeof source?.email === "string"
          ? source.email
          : normalizeEmail(input.email),
    };
  },

  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    if (USE_MOCK_AUTH) {
      await mockVerifyEmail(input);
      return;
    }

    await request<unknown>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async resendVerification(email: string): Promise<void> {
    if (USE_MOCK_AUTH) {
      return;
    }

    await request<unknown>("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async me(accessToken: string): Promise<AuthUser> {
    if (USE_MOCK_AUTH) {
      return mockMe(accessToken);
    }

    const payload = await request<unknown>("/auth/me", { method: "GET" }, accessToken);
    const user = buildUserFromBackend(
      (payload as Record<string, unknown>)?.user ?? payload
    );

    if (!user) {
      throw new Error("Invalid user response from server");
    }

    return user;
  },
};
