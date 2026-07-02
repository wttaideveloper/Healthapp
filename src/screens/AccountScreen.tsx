import React from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronRight,
  Crown,
  LogOut,
  RefreshCw,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react-native";

import { useAuth } from "../context/authContext";
import { useSubscription } from "../context/subScriptionContext";

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const { isAuthenticated, user, signOut } = useAuth();

  const {
    isSubscribed,
    subscriptionSource,
    workspace,
    providerStatus,
    refreshSubscription,
  } = useSubscription();
  const [isRefreshingAccess, setIsRefreshingAccess] = React.useState(false);

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogout = async () => {
    try {
      await signOut();

      Alert.alert(
        "Signed out",
        "You can continue using the app as guest."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to sign out right now."
      );
    }
  };

  const handleRefreshAccess = async () => {
    if (isRefreshingAccess) {
      return;
    }

    try {
      setIsRefreshingAccess(true);
      await refreshSubscription(true);
      Alert.alert("Access refreshed", "Your latest subscription and workspace access have been loaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to refresh access right now.";
      Alert.alert("Refresh failed", message);
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  const renderSubscriptionText = () => {
    if (subscriptionSource === "workspace" && workspace) {
      return `Workspace access via ${workspace.name}`;
    }

    if (subscriptionSource === "iap") {
      return "Managed through App Store / Play Store";
    }

    if (subscriptionSource === "stripe") {
      return Platform.OS === "web"
        ? "Managed through Stripe billing"
        : "Premium individual access";
    }

    return "No active subscription";
  };

  const renderSubscriptionBadge = () => {
    if (isSubscribed) {
      return (
        <View style={styles.proBadge}>
          <Crown size={14} color="#FFFFFF" />
          <Text style={styles.proBadgeText}>PRO</Text>
        </View>
      );
    }

    return (
      <View style={styles.freeBadge}>
        <Text style={styles.freeBadgeText}>FREE</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* USER CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={28} color="#FFFFFF" />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>
              {isAuthenticated
                ? user?.email?.split("@")[0] ?? "User"
                : "Guest User"}
            </Text>

            <Text style={styles.emailText}>
              {isAuthenticated
                ? user?.email
                : "Sign in to sync your account"}
            </Text>
          </View>

          {renderSubscriptionBadge()}
        </View>

        {/* SUBSCRIPTION CARD */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionTop}>
            <View style={styles.subscriptionIcon}>
              <Crown size={20} color="#0B9FD4" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.subscriptionTitle}>
                {isSubscribed ? "Premium Active" : "Free Plan"}
              </Text>

              <Text style={styles.subscriptionSubtitle}>
                {renderSubscriptionText()}
              </Text>
            </View>
          </View>

          {workspace ? (
            <View style={styles.workspaceBox}>
              <View style={styles.workspaceRow}>
                <Users size={16} color="#1F4F92" />
                <Text style={styles.workspaceText}>
                  {workspace.name}
                </Text>
              </View>

              <Text style={styles.workspaceMeta}>
                Role: {workspace.role} • Status:{" "}
                {workspace.memberStatus}
              </Text>
            </View>
          ) : null}

          {providerStatus ? (
            <Text style={styles.providerStatus}>
              Provider status: {providerStatus}
            </Text>
          ) : null}

          <TouchableOpacity
            style={[styles.refreshButton, isRefreshingAccess ? styles.refreshButtonDisabled : null]}
            onPress={handleRefreshAccess}
            disabled={isRefreshingAccess}
          >
            <RefreshCw size={16} color="#0B9FD4" />
            <Text style={styles.refreshText}>
              {isRefreshingAccess ? "Refreshing..." : "Refresh Access"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* AUTH SECTION */}
        {isAuthenticated ? (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.logoutText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={navigateToSignIn}
            >
              <Text style={styles.primaryButtonText}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={navigateToSignUp}
            >
              <Text style={styles.secondaryButtonText}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.footer}>
          HealthAge
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2a44",
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0B9FD4",
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2a44",
  },

  emailText: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  proBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B9FD4",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },

  proBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  freeBadge: {
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  freeBadgeText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
  },

  subscriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
  },

  subscriptionTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  subscriptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F7FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2a44",
  },

  subscriptionSubtitle: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },

  workspaceBox: {
    marginTop: 16,
    backgroundColor: "#F8FBFE",
    borderRadius: 16,
    padding: 14,
  },

  workspaceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  workspaceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F4F92",
  },

  workspaceMeta: {
    marginTop: 6,
    color: "#53627d",
    fontSize: 12,
  },

  providerStatus: {
    marginTop: 14,
    fontSize: 12,
    color: "#64748B",
  },

  refreshButton: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  refreshButtonDisabled: {
    opacity: 0.55,
  },

  refreshText: {
    color: "#0B9FD4",
    fontWeight: "700",
    fontSize: 14,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2a44",
    marginBottom: 12,
  },

  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2a44",
  },

  authButtons: {
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: "#0B9FD4",
    height: 52,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D5E3F0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  secondaryButtonText: {
    color: "#1F4F92",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutButton: {
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "700",
  },

  footer: {
    marginTop: 24,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
  },
});
