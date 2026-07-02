import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSubscription } from "../context/subScriptionContext";

type Props = {
  navigation: any;
  route: {
    name: string;
  };
};

const CheckoutResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isSubscribed, subscriptionSource, refreshSubscription } = useSubscription();
  const success = route?.name?.toLowerCase() === "success";
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      refreshSubscription(true).catch((error) => {
        console.warn("Failed to refresh entitlement after checkout:", error);
      });
    }
  }, [refreshSubscription, success]);

  const handleContinue = async () => {
    if (success) {
      setIsRefreshing(true);
      try {
        await refreshSubscription(true);
      } catch (error) {
        console.warn("Failed to refresh entitlement before continuing:", error);
      } finally {
        setIsRefreshing(false);
      }
    }

    navigation.navigate("Main");
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshSubscription(true);
    } catch (error) {
      console.warn("Failed to refresh entitlement from checkout result:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <View style={styles.webPanel}>
          <View style={[styles.statusMark, success ? styles.statusMarkSuccess : styles.statusMarkCanceled]}>
            <Text style={styles.statusMarkText}>{success ? "✓" : "!"}</Text>
          </View>
          <Text style={styles.webEyebrow}>{success ? "PAYMENT SUCCESSFUL" : "CHECKOUT CANCELED"}</Text>
          <Text style={styles.webTitle}>
            {success ? "You may now close this window" : "Checkout was canceled"}
          </Text>
          <Text style={styles.webSubtitle}>
            {success
              ? "Your payment is complete. Continue in the app, or use the button below if this opened inside the same window."
              : "No charge was made. You can close this window or continue in the app."}
          </Text>

          {success ? (
            <Text style={styles.webStatus}>
              {isSubscribed
                ? `Access is active${subscriptionSource !== "none" ? ` via ${subscriptionSource}` : ""}.`
                : "Access is being verified. It can take a moment to appear."}
            </Text>
          ) : null}

          <View style={styles.webActions}>
            <TouchableOpacity
              style={[styles.webPrimaryBtn, isRefreshing ? styles.disabledBtn : null]}
              onPress={handleContinue}
              disabled={isRefreshing}
            >
              <Text style={styles.webPrimaryText}>{isRefreshing ? "Refreshing..." : "Continue"}</Text>
            </TouchableOpacity>

            {success ? (
              <TouchableOpacity
                style={[styles.webSecondaryBtn, isRefreshing ? styles.disabledBtn : null]}
                onPress={handleRefresh}
                disabled={isRefreshing}
              >
                <Text style={styles.webSecondaryText}>Refresh Access</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.webSecondaryBtn} onPress={() => navigation.navigate("Purchase")}>
                <Text style={styles.webSecondaryText}>Try Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>{success ? "PAYMENT SUCCESS" : "PAYMENT CANCELED"}</Text>
        <Text style={styles.title}>{success ? "Checkout completed" : "Checkout was canceled"}</Text>
        <Text style={styles.subtitle}>
          {success && isSubscribed
            ? `Access is active${subscriptionSource !== "none" ? ` via ${subscriptionSource}` : ""}.`
            : success
            ? "Your payment was received. We are verifying your access status now."
            : "No charge was made. You can continue using the app or try checkout again."}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("Main")}>
            <Text style={styles.primaryText}>Go To Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("Purchase")}>
            <Text style={styles.secondaryText}>{success ? "Open Purchase" : "Try Again"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F6FBFF",
  },
  webPanel: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDEAF7",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingVertical: 42,
    paddingHorizontal: 28,
    shadowColor: "#0B2742",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  statusMark: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  statusMarkSuccess: {
    backgroundColor: "#E8F8EF",
    borderWidth: 1,
    borderColor: "#BDEACC",
  },
  statusMarkCanceled: {
    backgroundColor: "#FFF4E6",
    borderWidth: 1,
    borderColor: "#FFD59D",
  },
  statusMarkText: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "800",
    color: "#176B3A",
  },
  webEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2B6BA6",
    letterSpacing: 0,
    textAlign: "center",
  },
  webTitle: {
    marginTop: 12,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: "#18345A",
    textAlign: "center",
  },
  webSubtitle: {
    marginTop: 12,
    maxWidth: 440,
    fontSize: 16,
    lineHeight: 24,
    color: "#526B8F",
    textAlign: "center",
  },
  webStatus: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#EEF7FF",
    color: "#244C7C",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  webActions: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  webPrimaryBtn: {
    minWidth: 132,
    alignItems: "center",
    backgroundColor: "#1469D9",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  webPrimaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  webSecondaryBtn: {
    minWidth: 132,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D9EF",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: "#F8FBFF",
  },
  webSecondaryText: {
    color: "#295487",
    fontSize: 14,
    fontWeight: "800",
  },
  disabledBtn: {
    opacity: 0.65,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 620,
    borderWidth: 1,
    borderColor: "#DCE8F5",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  badge: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "700",
    color: "#2D5E96",
    backgroundColor: "#EEF6FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
  },
  title: {
    marginTop: 14,
    fontSize: 28,
    fontWeight: "700",
    color: "#1D365D",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#516B8F",
    lineHeight: 22,
  },
  helperNote: {
    marginTop: 8,
    fontSize: 14,
    color: "#274273",
    lineHeight: 20,
    fontWeight: "600",
  },
  actions: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#1469D9",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#C7D9EF",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: "#F8FBFF",
  },
  secondaryText: {
    color: "#295487",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CheckoutResultScreen;
