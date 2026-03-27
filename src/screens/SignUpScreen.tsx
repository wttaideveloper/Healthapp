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

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { signUp, isLoading } = useAuth();
  const { width } = useWindowDimensions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isWebDesktop = Platform.OS === "web" && width >= 980;

  const onSignUp = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password) {
      setError("Name, email and password are required");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError(null);
      const result = await signUp({
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      if (result.status === "needs_verification") {
        navigation.replace("VerifyEmail", { email: result.email });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up");
    }
  };

  const cardContent = (
    <>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Set up your account to continue using the app.</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="#8b909b"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#8b909b"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="At least 6 characters"
        placeholderTextColor="#8b909b"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.primaryButtonTouch} onPress={onSignUp} disabled={isLoading}>
        <LinearGradient
          colors={["#16A3DE", "#2D579D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryButton}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryText}>Sign up and verify</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.replace("SignIn")}
        disabled={isLoading}
      >
        <Text style={styles.secondaryText}>Back to sign in</Text>
      </TouchableOpacity>
    </>
  );

  if (isWebDesktop) {
    return (
      <View style={styles.webShell}>
        <View style={styles.webHero}>
          <Image source={icons.menuLogo} style={styles.webLogo} />
          <Text style={styles.webHeroTitle}>Join Health Age</Text>
          <Text style={styles.webHeroText}>
            Create your account to save assessments, sync license status, and unlock pro features.
          </Text>
        </View>
        <KeyboardAvoidingView
          style={styles.webCardWrap}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={[styles.card, styles.webCard]}>{cardContent}</View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.card, Platform.OS === "web" ? styles.webCompactCard : null]}>{cardContent}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  webShell: {
    flex: 1,
    backgroundColor: "#EEF4FA",
    flexDirection: "row",
    alignItems: "stretch",
  },
  webHero: {
    flex: 1,
    paddingHorizontal: 56,
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
    maxWidth: 420,
    fontSize: 17,
    lineHeight: 26,
    color: "#456088",
  },
  webCardWrap: {
    width: 520,
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
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0f172a",
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
});

export default SignUpScreen;
