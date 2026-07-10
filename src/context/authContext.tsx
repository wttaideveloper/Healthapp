import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ApiError } from "../components/utils/api";
import {
  AuthUser,
  SignInInput,
  SignInResult,
  SignUpInput,
  SignUpResult,
  authService,
} from "../components/utils/authService";

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isLoading: boolean;
  pendingVerificationEmail: string | null;
  useMockAuth: boolean;
  signIn: (input: SignInInput) => Promise<SignInResult>;
  signUp: (input: SignUpInput) => Promise<SignUpResult>;
  verifyEmail: (code: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AUTH_STORAGE_KEY = "auth_state";

type StoredAuthState = {
  accessToken: string;
  user: AuthUser;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [pendingVerificationPassword, setPendingVerificationPassword] = useState<string | null>(null);

  const persistSession = async (nextUser: AuthUser, nextToken: string) => {
    const payload: StoredAuthState = {
      user: nextUser,
      accessToken: nextToken,
    };

    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
    setUser(nextUser);
    setAccessToken(nextToken);
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const rawState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (!rawState) {
          return;
        }

        const parsed = JSON.parse(rawState) as StoredAuthState;

        if (!parsed?.accessToken || !parsed?.user) {
          await clearSession();
          return;
        }

        try {
          const resolvedUser = await authService.me(parsed.accessToken);
          setAccessToken(parsed.accessToken);
          setUser(resolvedUser);
          await AsyncStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
              accessToken: parsed.accessToken,
              user: resolvedUser,
            } as StoredAuthState)
          );
        } catch (error) {
          const isUnauthorized =
            error instanceof ApiError && (error.status === 401 || error.status === 403);
          const isRecoverableNetwork =
            error instanceof ApiError && (error.isNetworkError || error.isTimeout);

          if (isUnauthorized) {
            console.warn("Auth session expired, clearing session:", error);
            await clearSession();
            return;
          }

          if (isRecoverableNetwork) {
            console.warn("Auth hydration using cached session due to network issue:", error);
            setAccessToken(parsed.accessToken);
            setUser(parsed.user);
            return;
          }

          console.warn("Auth session hydration failed, clearing session:", error);
          await clearSession();
        }
      } catch (error) {
        console.error("Failed to hydrate auth state:", error);
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateAuth();
  }, []);

  const signIn = async (input: SignInInput): Promise<SignInResult> => {
    setIsLoading(true);

    try {
      const result = await authService.signIn(input);

      if (result.status === "needs_verification") {
        setPendingVerificationEmail(result.email);
        setPendingVerificationPassword(input.password);
        await clearSession();
        return result;
      }

      await persistSession(result.user, result.session.accessToken);
      setPendingVerificationEmail(null);
      setPendingVerificationPassword(null);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (input: SignUpInput): Promise<SignUpResult> => {
    setIsLoading(true);

    try {
      const result = await authService.signUp(input);
      if (result.status === "needs_verification") {
        setPendingVerificationEmail(result.email);
        setPendingVerificationPassword(input.password);
        await clearSession();
        return result;
      }

      await persistSession(result.user, result.session.accessToken);
      setPendingVerificationEmail(null);
      setPendingVerificationPassword(null);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string): Promise<void> => {
    if (!pendingVerificationEmail || !pendingVerificationPassword) {
      throw new Error("No pending verification email found");
    }

    setIsLoading(true);

    try {
      await authService.verifyEmail({
        email: pendingVerificationEmail,
        code,
      });

      try {
        const signInResult = await authService.signIn({
          email: pendingVerificationEmail,
          password: pendingVerificationPassword,
        });

        if (signInResult.status !== "authenticated") {
          throw new Error("Verification completed. Please sign in manually.");
        }

        await persistSession(signInResult.user, signInResult.session.accessToken);
        setPendingVerificationEmail(null);
        setPendingVerificationPassword(null);
      } catch {
        setPendingVerificationEmail(null);
        setPendingVerificationPassword(null);
        throw new Error("Verification completed. Please sign in with your password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!pendingVerificationEmail) {
      throw new Error("No pending verification email found");
    }

    setIsLoading(true);
    try {
      await authService.resendVerification(pendingVerificationEmail);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await clearSession();
      setPendingVerificationEmail(null);
      setPendingVerificationPassword(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isHydrated,
      isLoading,
      pendingVerificationEmail,
      useMockAuth: authService.useMock,
      signIn,
      signUp,
      verifyEmail,
      resendVerification,
      signOut,
    }),
    [user, accessToken, isHydrated, isLoading, pendingVerificationEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
