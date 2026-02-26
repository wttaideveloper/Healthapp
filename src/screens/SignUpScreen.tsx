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

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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

      navigation.replace("VerifyEmail", { email: result.email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
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

        <TouchableOpacity style={styles.primaryButton} onPress={onSignUp} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryText}>Sign up and verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.replace("SignIn")}
          disabled={isLoading}
        >
          <Text style={styles.secondaryText}>Back to sign in</Text>
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
});

export default SignUpScreen;
