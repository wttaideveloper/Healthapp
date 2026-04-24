import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isAuthenticated, user, signOut } = useAuth();

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Signed out", "You can continue using the app as a guest.");
    } catch (error) {
      Alert.alert("Error", "Unable to sign out right now.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isAuthenticated ? "Account" : "Login"}</Text>
      {isAuthenticated ? (
        <>
          <Text style={styles.subtitle}>
            Signed in as {user?.email ?? "your account"}.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
            <Text style={styles.secondaryText}>Sign out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            You can use the app as guest. Sign in is only required for purchase and license actions.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={navigateToSignIn}>
            <Text style={styles.primaryText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={navigateToSignUp}>
            <Text style={styles.secondaryText}>Create account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2a44",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#53627d",
    marginBottom: 20,
    lineHeight: 21,
  },
  primaryButton: {
    backgroundColor: "#0B9FD4",
    borderRadius: 999,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#CFE0F2",
    borderRadius: 999,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#1F4F92",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default AccountScreen;
