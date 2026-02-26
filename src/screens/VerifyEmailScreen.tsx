import React, { useEffect, useState } from "react";
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
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAuth } from "../context/authContext";

type VerifyEmailRouteProp = RouteProp<RootStackParamList, "VerifyEmail">;
type VerifyEmailNavigationProp = StackNavigationProp<RootStackParamList, "VerifyEmail">;

type VerifyEmailProps = {
  route: VerifyEmailRouteProp;
  navigation: VerifyEmailNavigationProp;
};

const VerifyEmailScreen: React.FC<VerifyEmailProps> = ({ route, navigation }) => {
  const { verifyEmail, resendVerification, isLoading, pendingVerificationEmail } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const targetEmail = pendingVerificationEmail ?? route.params?.email ?? "";

  useEffect(() => {
    if (!targetEmail) {
      navigation.replace("SignIn");
    }
  }, [navigation, targetEmail]);

  const onVerify = async () => {
    if (!code.trim()) {
      setError("Verification code is required");
      return;
    }

    try {
      setError(null);
      await verifyEmail(code.trim());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to verify email";
      if (message.toLowerCase().includes("sign in")) {
        navigation.replace("SignIn");
        return;
      }
      setError(message);
    }
  };

  const onResend = async () => {
    try {
      setError(null);
      await resendVerification();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resend code");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Verify email</Text>
        <Text style={styles.subtitle}>Enter the code sent to {targetEmail}.</Text>

        <Text style={styles.label}>Verification code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="6-digit code"
          placeholderTextColor="#8b909b"
          keyboardType="number-pad"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={onVerify} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>Verify and continue</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onResend} disabled={isLoading}>
          <Text style={styles.secondaryText}>Resend code</Text>
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
    paddingVertical: 8,
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

export default VerifyEmailScreen;
