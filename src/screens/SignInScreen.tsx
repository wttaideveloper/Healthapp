import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAuth } from "../context/authContext";
import { isValidEmail } from "../components/utils/validation";
import { icons } from "../components/images";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type SignInScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignIn">;
};

type SignInFieldErrors = {
  email?: string;
  password?: string;
};

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { signIn, isLoading, useMockAuth } = useAuth();
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isWebDesktop = Platform.OS === "web" && width >= 980;
  const isNativeMobile = Platform.OS !== "web";

  const clearFieldError = (field: keyof SignInFieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  };

  const onSignIn = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const nextErrors: SignInFieldErrors = {};

    if (!normalizedEmail) {
      nextErrors.email = "Email is required";
    } else if (!isValidEmail(normalizedEmail)) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    }

    if (nextErrors.email || nextErrors.password) {
      setFieldErrors(nextErrors);
      setSubmitError(null);
      return;
    }

    try {
      setFieldErrors({});
      setSubmitError(null);
      const result = await signIn({
        email: normalizedEmail,
        password,
      });

      if (result.status === "needs_verification") {
        navigation.replace("VerifyEmail", { email: result.email });
        return;
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unable to sign in");
    }
  };

  const cardContent = (
    <>
      <Text style={[styles.title, isNativeMobile ? styles.mobileTitle : null]}>Sign in</Text>
      <Text style={[styles.subtitle, isNativeMobile ? styles.mobileSubtitle : null]}>Continue with your account.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, fieldErrors.email ? styles.inputError : null]}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          clearFieldError("email");
          if (submitError) setSubmitError(null);
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#8b909b"
      />
      {fieldErrors.email ? <Text style={styles.error}>{fieldErrors.email}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={[styles.passwordRow, fieldErrors.password ? styles.inputError : null]}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            clearFieldError("password");
            if (submitError) setSubmitError(null);
          }}
          secureTextEntry={!showPassword}
          placeholder="Your password"
          placeholderTextColor="#8b909b"
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.passwordToggle}
          disabled={isLoading}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={18}
            color="#1663d6"
          />
        </TouchableOpacity>
      </View>
      {fieldErrors.password ? <Text style={styles.error}>{fieldErrors.password}</Text> : null}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("ForgotPassword")}
        disabled={isLoading}
      >
        <Text style={styles.forgotButtonText}>Forgot password?</Text>
      </TouchableOpacity>

      {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
      {useMockAuth ? (
        <Text style={styles.hint}>Mock auth is enabled. Verification code: 123456</Text>
      ) : null}

      <TouchableOpacity style={styles.primaryButtonTouch} onPress={onSignIn} disabled={isLoading}>
        <LinearGradient
          colors={["#16A3DE", "#2D579D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryButton}
        >
          {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>Sign in</Text>}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("SignUp")}
        disabled={isLoading}
      >
        <Text style={styles.secondaryText}>Create account</Text>
      </TouchableOpacity>
    </>
  );

  if (isWebDesktop) {
    return (
      <View style={styles.webShell}>
        <View style={styles.webFrame}>
          <View style={styles.webHero}>
            <Image source={icons.menuLogo} style={styles.webLogo} />
            <Text style={styles.webHeroTitle}>Welcome back</Text>
            <Text style={styles.webHeroText}>
              Sign in to continue your Health Age assessments, reports, and premium features.
            </Text>
            <Image source={icons.login} style={styles.webHeroImage} />
          </View>
          <KeyboardAvoidingView
            style={styles.webCardWrap}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={[styles.card, styles.webCard]}>{cardContent}</View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, isNativeMobile ? styles.mobileContainer : null]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.card,
          Platform.OS === "web" ? styles.webCompactCard : styles.mobileCard,
        ]}
      >
        {cardContent}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  mobileContainer: {
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  webShell: {
    flex: 1,
    backgroundColor: "#EEF4FA",
    padding: 24,
  },
  webFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 1280,
    alignSelf: "center",
    backgroundColor: "#F7FBFF",
    borderRadius: 24,
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDE8F6",
  },
  webHero: {
    flex: 1,
    paddingHorizontal: 56,
    paddingVertical: 44,
    justifyContent: "center",
    backgroundColor: "#E2EEF8",
  },
  webLogo: {
    width: 190,
    height: 56,
    resizeMode: "contain",
    marginBottom: 24,
  },
  webHeroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1E3A6D",
    marginBottom: 10,
  },
  webHeroText: {
    maxWidth: 430,
    fontSize: 17,
    lineHeight: 26,
    color: "#456088",
  },
  webHeroImage: {
    width: "100%",
    height: 300,
    maxWidth: 480,
    resizeMode: "contain",
    marginTop: 18,
  },
  webCardWrap: {
    width: 560,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  webCard: {
    width: "100%",
  },
  webCompactCard: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  mobileCard: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
    padding: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0f172a",
  },
  mobileTitle: {
    fontSize: 50,
    lineHeight: 54,
    marginBottom: 6,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#455269",
    fontSize: 14,
  },
  mobileSubtitle: {
    marginTop: 0,
    marginBottom: 20,
    fontSize: 15,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#111827",
    backgroundColor: "#F9FBFD",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  passwordRow: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 12,
    backgroundColor: "#F9FBFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    color: "#111827",
    paddingVertical: 12,
  },
  passwordToggle: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
  },
  forgotButton: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  forgotButtonText: {
    color: "#1663d6",
    fontWeight: "600",
    fontSize: 13,
  },
  primaryButtonTouch: {
    marginTop: 18,
    borderRadius: 12,
    overflow: "hidden",
  },
  primaryButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  secondaryText: {
    color: "#1663d6",
    fontWeight: "600",
  },
  error: {
    marginTop: 10,
    color: "#c62828",
  },
  hint: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 12,
  },
});

export default SignInScreen;
