import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAuth } from "../context/authContext";
import { isValidEmail } from "../components/utils/validation";

type SignInScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignIn">;
};

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { signIn, isLoading, useMockAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSignIn = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setError(null);
      const result = await signIn({
        email: normalizedEmail,
        password,
      });

      if (result.status === "needs_verification") {
        navigation.replace("VerifyEmail", { email: result.email });
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Continue after onboarding with your account.</Text>

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
          placeholder="Your password"
          placeholderTextColor="#8b909b"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {useMockAuth ? (
          <Text style={styles.hint}>Mock auth is enabled. Verification code: 123456</Text>
        ) : null}

        <TouchableOpacity style={styles.primaryButton} onPress={onSignIn} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>Sign in</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("SignUp")}
          disabled={isLoading}
        >
          <Text style={styles.secondaryText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7fb",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: "#455269",
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "600",
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#fbfcfe",
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: "#1663d6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "700",
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
