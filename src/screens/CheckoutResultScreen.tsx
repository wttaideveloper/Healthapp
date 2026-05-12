import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  navigation: any;
  route: {
    name: string;
  };
};

const CheckoutResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const success = route?.name?.toLowerCase() === "success";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>{success ? "PAYMENT SUCCESS" : "PAYMENT CANCELED"}</Text>
        <Text style={styles.title}>{success ? "Checkout completed" : "Checkout was canceled"}</Text>
        <Text style={styles.subtitle}>
          {success
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
