import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import * as RNIap from "react-native-iap";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Button from "../components/Button";
import {
  cancelSubscription,
  getSubscriptions,
  initIAP,
  itemSkus,
  purchaseSubscription,
  restorePurchases,
  restoreSubscription,
  verifySubscriptionStatus,
} from "../components/utils/purchase";
import { LinearGradient } from "expo-linear-gradient";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../context/subScriptionContext";
import { useFocusEffect } from "@react-navigation/native";

// Define product IDs (same as those set in Google Play/App Store)
// const productIds = ['healthAge_OneTime_Purchase', 'healthAge_Yearly_Subscription'];

const PurchaseScreen: React.FC = () => {
  const { isSubscribed, autoRenewing, expiryDate, refreshSubscription } =
    useSubscription();
  const remainingDays = Math.ceil(
    (expiryDate - new Date()) / (1000 * 60 * 60 * 24)
  );

  const SubscriptionButton = () => {
    if (isSubscribed && autoRenewing) {
      return (
        <View
          style={{
            gap: 10,
            padding: 20,
            marginTop: 40,
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
          }}
        >
          <Font
            text="NowAProMember"
            style={{ color: "#262F40", textAlign: "center" }}
          ></Font>
          {actionLoading ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Button
              style={{
                padding: 10,
              }}
              // title="cancelSub"
              title="cancelSub"
              onPress={handleCancel}
              disabled={actionLoading}
            />
          )}
        </View>
      );
    } else if (isSubscribed && !autoRenewing) {
      return (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Font
              text={"SubDaysRemaining"}
              style={{ color: "#262F40", textAlign: "center" }}
            ></Font>
            <Font
              text={" " + `${remainingDays}`}
              style={{
                color: remainingDays < 3 ? "red" : "#262F40",
                textAlign: "center",
              }}
            ></Font>
          </View>
          {actionLoading ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Button
              title="RenewSub"
              style={{
                padding: 10,
                marginTop: 40,
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
              }}
              onPress={handleRenew}
              disabled={actionLoading}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          {actionLoading ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Button
              style={{
                padding: 10,
                marginTop: 40,
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
              }}
              title="upgrade"
              onPress={handlePurchase}
              disabled={actionLoading}
            />
          )}
        </>
      );
    }
  };
  console.log(
    isSubscribed,
    autoRenewing,
    refreshSubscription,
    "isSubscribed, autoRenewing, refreshSubscription "
  );

  const [subscriptions, setSubscriptions] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const setupIAP = async () => {
      await initIAP();
      const subs = await getSubscriptions();
      console.log("subs", subs);
      setSubscriptions(subs);
    };
    setupIAP();
    // getSubscriptions();
  }, []);

  // const handlePurchase = async () => {
  //   try {
  //     console.log(subscriptions,"subscriptions");

  //     const purchase = await purchaseSubscription(subscriptions);
  //     let text1 = t("UpgradeComplete");
  //     let text2 = t("NowAProMember");
  //     Alert.alert("✅ " + text1, text2);
  //     refreshSubscription();
  //   } catch (error: any) {
  //     Alert.alert("❌ " + t("Error"));
  //   }
  // };
  // const handleRestore = async () => {
  //   const purchases = await restorePurchases();
  //   if (purchases.length > 0) {
  //     refreshSubscription();
  //     Alert.alert("Restored", "Your subscription is active!");
  //   } else {
  //     Alert.alert("No Purchases", "No active subscriptions found.");
  //   }
  // };

  const benefits = [
    { text: "UnlimitedReports" },
    { text: "FullReportHistory" },
    { text: "PrintYourQuestionnaire" },
    { text: "printYourReport" },
  ];

  const [Subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useFocusEffect(
  React.useCallback(() => {
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
        await initIAP();

        // Option 1: Simple check
        // const { Subscribed } = await checkActiveSubscriptions();

        // Option 2: Verified check (recommended)
        const { isValid } = await verifySubscriptionStatus();

        setSubscribed(isValid);
      } catch (error) {
        console.error("Subscription check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();

    // Add purchase listener
    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        // Handle new purchases
        if (purchase.productId === itemSkus[0]) {
          setSubscribed(true);
          await RNIap.finishTransaction({ purchase: purchase });
        }
      }
    );

    return () => {
      purchaseUpdateSubscription.remove();
    };
  }, [])
);

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await cancelSubscription();
      await refreshSubscription();
    } catch (error: any) {
      Alert.alert(
        t("Error"),
        error?.message ?? "Failed to cancel subscription."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // const handleRenew = async () => {
  //   setActionLoading(true);
  //   try {
  //     await restoreSubscription();
  //     await refreshSubscription();
  //   } catch (error: any) {
  //     Alert.alert(
  //       t("Error"),
  //       error?.message ?? "Failed to renew subscription."
  //     );
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  const handleRenew = async () => {
  setActionLoading(true);
  try {
    // In testing: Just try to purchase again
    const purchase = await purchaseSubscription(subscriptions);
    Alert.alert("✅ " + t("SubscriptionRenewed"), t("NowAProMember"));
    await refreshSubscription();
  } catch (error: any) {
    Alert.alert(
      t("Error"),
      error?.message ?? "Failed to renew subscription."
    );
  } finally {
    setActionLoading(false);
  }
};

  const handlePurchase = async () => {
    setActionLoading(true);
    try {
      const purchase = await purchaseSubscription(subscriptions);
      Alert.alert("✅ " + t("UpgradeComplete"), t("NowAProMember"));
      await refreshSubscription();
    } catch (error: any) {
      Alert.alert("❌ " + t("Error"), error?.message ?? "Purchase failed.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#ffe0a4", "#ffeebb", "#fee1a1"]}
        style={[
          {
            // Border thickness
            borderRadius: 14,
            flexDirection: "row",
            // flex: 1,
            borderWidth: 1,
            borderColor: "#EAECF1",
            // justifyContent: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 10,
            marginVertical: 10,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <Font
            text={Platform.OS === "ios" ? "$49" : "$39"}
            style={{ fontSize: 40, fontWeight: 600, color: "#B8751D" }}
          ></Font>
          <Font
            text="yearlyPurchase"
            style={{ fontSize: 12, fontWeight: 500, color: "#B8751D" }}
          ></Font>
        </View>
        <Image
          source={icons.proVersion}
          style={{ width: 105, height: 100 }}
        ></Image>
      </LinearGradient>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          gap: 10,
        }}
      >
        <Font
          text="goBeyond"
          style={{
            color: "#274273",
            fontWeight: 700,
            fontSize: 20,
            textAlign: "center",
          }}
        ></Font>
        <Font
          text="JoinPro"
          style={{
            color: "#274273",
            fontWeight: 400,
            fontSize: 14,
            textAlign: "center",
          }}
        ></Font>
      </View>
      <View
        style={{
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          marginVertical: 10,
          gap: 10,
          backgroundColor: "#F8FAFB",
          borderRadius: 24,
          paddingHorizontal: 24,
          paddingVertical: 20,
        }}
      >
        <View>
          <Font
            text="WhyJoinPro"
            style={{
              color: "#274273",
              fontWeight: 700,
              fontSize: 20,
              // textAlign: "center",
            }}
          ></Font>
        </View>
        <View style={{ borderWidth: 1, borderColor: "#f2f5f9" }}></View>
        {benefits.map((val, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
              marginVertical: 5,
            }}
          >
            <Image
              source={icons.tick}
              style={{ width: 24, height: 24 }}
            ></Image>
            <Font
              text={val.text}
              style={{
                color: "#274273",
                fontWeight: 400,
                fontSize: 14,
                textAlign: "center",
              }}
            ></Font>
          </View>
        ))}
      </View>
      {SubscriptionButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default PurchaseScreen;
