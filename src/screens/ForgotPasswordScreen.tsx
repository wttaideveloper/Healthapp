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
import { authService } from "../components/utils/authService";
import { isValidEmail } from "../components/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "../components/images";
import { LinearGradient } from "expo-linear-gradient";

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ForgotPassword">;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const isWebDesktop = width >= 760;
  const isNativeMobile = Platform.OS !== "web";

  const backToSignIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  const normalizedEmail = email.trim().toLowerCase();

  const onRequestOtp = async () => {
    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setNotice(null);
      await authService.forgotPassword({ email: normalizedEmail });
      setOtpRequested(true);
      setNotice("If this email is registered, a 6-digit OTP has been sent. It is valid for 10 minutes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }
    if (!/^\d{6}$/.test(otp.trim())) {
      setError("OTP must be a 6-digit code");
      return;
    }
    if (newPassword.trim().length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setNotice(null);
      await authService.resetPassword({
        email: normalizedEmail,
        otp: otp.trim(),
        newPassword: newPassword.trim(),
      });
      setNotice("Password reset successful. Please sign in with your new password.");
      setTimeout(() => {
        backToSignIn();
      }, 450);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const cardContent = (
    <>
      <Text style={[styles.title, isNativeMobile ? styles.mobileTitle : null]}>Forgot password</Text>
      <Text style={[styles.subtitle, isNativeMobile ? styles.mobileSubtitle : null]}>
        Request an OTP and reset your password securely.
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          if (error) setError(null);
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#8b909b"
      />

      {!otpRequested ? (
        <TouchableOpacity style={styles.primaryButtonTouch} onPress={onRequestOtp} disabled={isLoading}>
          <LinearGradient
            colors={["#16A3DE", "#2D579D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButton}
          >
            {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>Send OTP</Text>}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={(value) => {
              setOtp(value.replace(/[^0-9]/g, ""));
              if (error) setError(null);
            }}
            keyboardType="number-pad"
            placeholder="6-digit OTP"
            placeholderTextColor="#8b909b"
            maxLength={6}
          />

          <Text style={styles.label}>New password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={(value) => {
                setNewPassword(value);
                if (error) setError(null);
              }}
              secureTextEntry={!showPassword}
              placeholder="At least 8 characters"
              placeholderTextColor="#8b909b"
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.passwordToggle}
              disabled={isLoading}
            >
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#1663d6" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButtonTouch} onPress={onResetPassword} disabled={isLoading}>
            <LinearGradient
              colors={["#16A3DE", "#2D579D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButton}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.primaryText}>Reset password</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onRequestOtp} disabled={isLoading}>
            <Text style={styles.secondaryText}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={backToSignIn}
        disabled={isLoading}
      >
        <Text style={styles.secondaryText}>Back to sign in</Text>
      </TouchableOpacity>
    </>
  );

  if (isWebDesktop) {
    return (
      <View style={styles.webShell}>
        <View style={styles.webFrame}>
          <View style={styles.webHero}>
            <Image source={icons.menuLogo} style={styles.webLogo} />
            <Text style={styles.webHeroTitle}>Reset your password</Text>
            <Text style={styles.webHeroText}>
              Enter your email to receive an OTP, then set a new secure password.
            </Text>
            <Image source={icons.forgotPassword} style={styles.webHeroImage} />
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
      {isNativeMobile ? (
        <View style={styles.mobileTopBackRow}>
          <View style={styles.mobileTopBackInner}>
            <TouchableOpacity style={styles.mobileBackButton} onPress={backToSignIn}>
              <Ionicons name="arrow-back" size={18} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
  mobileTopBackRow: {
    width: "100%",
    marginBottom: 12,
    alignItems: "center",
  },
  mobileTopBackInner: {
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: 24,
  },
  mobileBackButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D2D7E2",
    alignItems: "center",
    justifyContent: "center",
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
  mobileSubtitle: {
    marginTop: 0,
    marginBottom: 20,
    fontSize: 15,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#455269",
    fontSize: 14,
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
  primaryButtonTouch: {
    marginTop: 16,
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
    paddingVertical: 8,
  },
  secondaryText: {
    color: "#1663d6",
    fontWeight: "600",
  },
  notice: {
    marginTop: 10,
    color: "#155eef",
    fontSize: 13,
  },
  error: {
    marginTop: 10,
    color: "#c62828",
    fontSize: 13,
  },
});

export default ForgotPasswordScreen;
