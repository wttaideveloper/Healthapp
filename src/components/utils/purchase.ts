import { Alert, Linking, Platform } from "react-native";
import * as RNIap from "react-native-iap";

export const itemSkus = Platform.select({
  ios: ["healthAge_yearly_premium_package_ios"],
  android: ["health_age_yearly_premium_package"],
});

export const initIAP = async () => {
  try {
    console.log("Running");
    await RNIap.initConnection();

    console.log("IAP Connection Initialized ");
  } catch (error) {
    console.error("IAP Connection Error:", error);
  }
};

export const getSubscriptions = async () => {
  try {
    const subscriptions = await RNIap.getSubscriptions({ skus: itemSkus });
    console.log(
      "📦 Subscriptions:",
      JSON.stringify(subscriptions),
      itemSkus,
      "itemSkus"
    );
    return JSON.stringify(subscriptions);
  } catch (error) {
    console.log("❌ Error Fetching Subscriptions:", error);
    return [];
  }
};


export const purchaseSubscription = async (subscriptions) => {
  try {
    if (!subscriptions || subscriptions.length === 0) {
      console.error("Subscriptions are empty or undefined:", subscriptions);
      throw new Error("No subscriptions available for purchase.");
    }

    const sku = Platform.select({
      ios: "healthAge_yearly_premium_package_ios",
      android: "health_age_yearly_premium_package",
    });

    const OfferDetails = JSON.parse(subscriptions);

    const offerToken = OfferDetails?.[0]?.subscriptionOfferDetails?.[0].offerToken
    if (!offerToken) {
      console.error(
        "Offer token is missing in subscription offer details:",
        OfferDetails
      );
      throw new Error("No valid subscription offer token found.");
    }

    console.log("Offer Token:", offerToken);

    let purchase;
    if (Platform.OS === "android") {
      purchase = await RNIap.requestSubscription({
        sku,
        subscriptionOffers: [{ sku, offerToken }],
      });
    } else {
      purchase = await RNIap.requestSubscription({ sku });
    }

    console.log("✅ Purchase Success:", purchase);
    return purchase;
  } catch (error) {
    console.error("❌ Purchase Failed:", error?.message ?? error);
    Alert.alert("Purchase Error", error?.message ?? "Unknown error occurred.");
    throw error;
  }
};

export const restorePurchases = async () => {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    console.log("Restored Purchases:", purchases);
    return purchases;
  } catch (error) {
    console.log("Restore Purchase Error:", error);
  }
};


export const verifySubscriptionStatus = async () => {
  try {
    let autoRenewing = false;
    let isSubscribed = false;
    let expiryDate = null;

    const purchases = await RNIap.getAvailablePurchases();
    let subscriptionPurchase = purchases.find((p) =>
      itemSkus.includes(p.productId)
    );

    if (subscriptionPurchase) {
      autoRenewing = subscriptionPurchase.autoRenewingAndroid ?? false;
      try {
        const receiptData = JSON.parse(subscriptionPurchase.transactionReceipt);
        expiryDate = new Date(
          receiptData?.expires_date_ms ??
            receiptData.purchaseTime + 365 * 24 * 60 * 60 * 1000
        );
        isSubscribed = expiryDate > new Date();
      } catch (e) {
        console.log("Receipt parse error:", e);
      }
    } else {
      const history = await RNIap.getPurchaseHistory();
      subscriptionPurchase = history.find((p) =>
        itemSkus.includes(p.productId)
      );
      if (subscriptionPurchase) {
        try {
          const receiptData = JSON.parse(subscriptionPurchase.transactionReceipt);
          expiryDate = new Date(
            receiptData?.expires_date_ms ??
              receiptData.purchaseTime + 365 * 24 * 60 * 60 * 1000
          );
          isSubscribed = expiryDate > new Date();
        } catch (e) {
          console.log("Receipt parse error:", e);
        }
      }
    }

    return { isValid: isSubscribed, autoRenewing, expiryDate };
  } catch (error) {
    console.error("Verification error:", error.message || error);
    return { isValid: false, error };
  }
};

export const cancelSubscription = async () => {
  try {
    // 1. Get active purchases first
    const purchases = await RNIap.getAvailablePurchases();
    console.log("get available purchase", purchases);

    const activeSubscription = purchases.find((p) =>
      itemSkus.includes(p.productId)
    );
    // Alert.alert("Active Subs" , JSON.stringify(activeSubscription) )
    if (!activeSubscription) {
      throw new Error("No active subscription found");
    }

    // 2. Platform-specific cancellation
    if (Platform.OS === "ios") {
      // iOS: Open App Store's subscription management page
      // await RNIap.requestSubscription({
      //   sku: activeSubscription.productId,
      //   andDangerouslyFinishTransactionAutomaticallyIOS: false,
      // });
      Alert.alert(
        "Manage Subscription",
        "Please cancel your subscription in the App Store settings.",
        [
          {
            text: "Open Settings",
            onPress: () =>
              Linking.openURL(
                "itms-apps://apps.apple.com/account/subscriptions"
              ),
          },
          { text: "Cancel" },
        ]
      );
    } else {
      Alert.alert(
        "Manage Subscription",
        "Please cancel your subscription in Google Play Store.",
        [
          {
            text: "Open Play Store",
            onPress: () =>
              Linking.openURL(
                "https://play.google.com/store/account/subscriptions"
              ),
          },
          { text: "Cancel" },
        ]
      );
    }
  } catch (error: any) {
    console.error("❌ Cancellation Error:", error);
    Alert.alert(
      "Error",
      error.message || "Failed to cancel subscription. Please try again."
    );
    throw error;
  }
};

export const restoreSubscription = async () => {
  try {
    // 1. Get active purchases first
    const purchases = await RNIap.getAvailablePurchases();
    console.log("get available purchase", purchases);

    const activeSubscription = purchases.find((p) =>
      itemSkus.includes(p.productId)
    );
    // Alert.alert("Active Subs" , JSON.stringify(activeSubscription) )
    // if (!activeSubscription) {
    //   throw new Error("No active subscription found");
    // }

    // 2. Platform-specific cancellation
    if (Platform.OS === "ios") {
      // iOS: Open App Store's subscription management page
      await RNIap.requestSubscription({
        sku: activeSubscription.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
      Alert.alert(
        "Manage Subscription",
        "Please cancel your subscription in the App Store settings.",
        [
          {
            text: "Open Settings",
            onPress: () =>
              Linking.openURL(
                "itms-apps://apps.apple.com/account/subscriptions"
              ),
          },
          { text: "Cancel" },
        ]
      );
    } else {
      Alert.alert(
        "Manage Subscription",
        "Please cancel your subscription in Google Play Store.",
        [
          {
            text: "Open Play Store",
            onPress: () =>
              Linking.openURL(
                "https://play.google.com/store/account/subscriptions"
              ),
          },
          { text: "Cancel" },
        ]
      );
    }
  } catch (error: any) {
    console.error("❌ Cancellation Error:", error);
    Alert.alert(
      "Error",
      error.message || "Failed to cancel subscription. Please try again."
    );
    throw error;
  }
};
