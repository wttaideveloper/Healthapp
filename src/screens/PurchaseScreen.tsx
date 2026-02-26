// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Platform,
//   Image,
//   ActivityIndicator,
//   Alert,
//   Linking,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useTranslation } from "react-i18next";
// import type { PurchasesPackage } from "react-native-purchases";

// import Button from "../components/Button";
// import Font from "../components/CustomisedFont";
// import { icons } from "../components/images";
// import { useSubscription } from "../context/subScriptionContext";
// import {
//   getSubscriptions,
//   initIAP,
//   purchaseSubscription,
// } from "../components/utils/purchase";

// // Using Apple's Standard EULA and Privacy Policy as placeholders
// const TERMS_OF_USE_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
// const PRIVACY_POLICY_URL = "https://www.apple.com/legal/privacy/";

// const PurchaseScreen: React.FC = () => {
//   const {
//     isSubscribed,
//     refreshSubscription,
//     setDebugSubscriptionOverride,
//     debugSubscriptionOverride,
//   } = useSubscription();
//   const { t } = useTranslation();

//   const [subscriptions, setSubscriptions] = useState<PurchasesPackage[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   const loadOfferings = async (): Promise<void> => {
//     const subs = await getSubscriptions();
//     setSubscriptions(subs);
//   };

//   useEffect(() => {
//     const setup = async () => {
//       await initIAP();
//       await loadOfferings();
//     };
//     setup();
//   }, []);

//   const openLegalLink = async (url: string) => {
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert(t("Error"), "Unable to open link");
//       }
//     } catch (error) {
//       console.error("Failed to open legal link:", error);
//     }
//   };

//   // Fixed FocusEffect to prevent infinite loops
//   useFocusEffect(
//     React.useCallback(() => {
//       let isActive = true;

//       const checkSubscription = async () => {
//         if (actionLoading) return;
//         setIsLoading(true);
//         try {
//           if (isActive) {
//             await refreshSubscription(true);
//             await loadOfferings();
//           }
//         } catch (error) {
//           console.error("Subscription refresh failed:", error);
//         } finally {
//           if (isActive) setIsLoading(false);
//         }
//       };

//       checkSubscription();
//       return () => { isActive = false; };
//     }, [])
//   );

//   const handlePurchase = async () => {
//     setActionLoading(true);
//     try {
//       await purchaseSubscription(subscriptions);
//       Alert.alert("✅ " + t("UpgradeComplete"), t("NowAProMember"));
//       await refreshSubscription(true);
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : "Purchase failed.";
//       Alert.alert("❌ " + t("Error"), message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDevSubscriptionToggle = async () => {
//     if (actionLoading) return;
//     setActionLoading(true);
//     try {
//       await setDebugSubscriptionOverride(!isSubscribed);
//     } catch (error) {
//       console.error("Debug toggle failed:", error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const benefits = [
//     { text: "UnlimitedReports" },
//     { text: "FullReportHistory" },
//     { text: "PrintYourQuestionnaire" },
//     { text: "printYourReport" },
//   ];

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0B9FD4" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{ paddingBottom: 120 }}
//       >
//         {isSubscribed ? (
//           <View style={styles.proBadgeCard}>
//             <Font text="NowAProMember" style={styles.proBadgeTitle} />
//             <Font text="Lifetime Access Enabled" style={styles.proBadgeSub} />
//           </View>
//         ) : (
//           <>
//             <LinearGradient
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1, y: 0 }}
//               colors={["#ffe0a4", "#ffeebb", "#fee1a1"]}
//               style={styles.priceCard}
//             >
//               <View style={styles.priceTextContainer}>
//                 <Font
//                   text={Platform.OS === "ios" ? "$49" : "$39"}
//                   style={styles.priceValue}
//                 />
//                 <Font text="Lifetime Access" style={styles.priceLabel} />
//               </View>
//               <Image source={icons.proVersion} style={styles.proIcon} />
//             </LinearGradient>

//             <View style={styles.headerTextContainer}>
//               <Font text="goBeyond" style={styles.headerTitle} />
//               <Font text="JoinPro" style={styles.headerSub} />
//             </View>

//             <View style={styles.benefitsCard}>
//               <Font text="WhyJoinPro" style={styles.sectionTitle} />
//               <View style={styles.divider} />
//               {benefits.map((val, index) => (
//                 <View key={index} style={styles.benefitRow}>
//                   <Image source={icons.tick} style={styles.tickIcon} />
//                   <Font text={val.text} style={styles.benefitText} />
//                 </View>
//               ))}

//               {/* Integrated Legal Section for Guidelines */}
//               <View style={styles.legalSection}>
//                 <Text style={styles.disclosureText}>
//                   One-time purchase for lifetime access. No recurring charges or auto-renewals.
//                 </Text>
//                 <View style={styles.linkRow}>
//                   <TouchableOpacity onPress={() => openLegalLink(TERMS_OF_USE_URL)}>
//                     <Text style={styles.legalLink}>Terms of Use</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.linkSeparator}> • </Text>
//                   <TouchableOpacity onPress={() => openLegalLink(PRIVACY_POLICY_URL)}>
//                     <Text style={styles.legalLink}>Privacy Policy</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </>
//         )}

//         {__DEV__ && (
//           <Button
//             style={{
//               padding: 10,
//               marginTop: 12,
//             }}
//             title={isSubscribed ? "DEV: Disable Subscription" : "DEV: Enable Subscription"}
//             onPress={handleDevSubscriptionToggle}
//             disabled={actionLoading}
//           />
//         )}
//       </ScrollView>

//       {/* Action Button */}
//       {!isSubscribed && (
//         <View style={styles.bottomButtonContainer}>
//           {actionLoading ? (
//             <ActivityIndicator />
//           ) : (
//             <Button
//               style={{
//                 padding: 10,
//                 marginTop: 12,
//               }}
//               title="upgrade" onPress={handlePurchase} />
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   priceCard: {
//     borderRadius: 14,
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#EAECF1",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     padding: 15,
//     marginVertical: 10,
//   },
//   priceTextContainer: { alignItems: "center", gap: 5 },
//   priceValue: { fontSize: 40, fontWeight: "700", color: "#B8751D" },
//   priceLabel: { fontSize: 14, fontWeight: "600", color: "#B8751D" },
//   proIcon: { width: 90, height: 90 },
//   headerTextContainer: { marginVertical: 20, gap: 8, alignItems: "center" },
//   headerTitle: { color: "#274273", fontWeight: "700", fontSize: 22 },
//   headerSub: { color: "#274273", fontWeight: "400", fontSize: 14 },
//   benefitsCard: {
//     backgroundColor: "#F8FAFB",
//     borderRadius: 24,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "#EAECF1",
//   },
//   sectionTitle: { color: "#274273", fontWeight: "700", fontSize: 18 },
//   divider: { height: 1, backgroundColor: "#E6ECF2", marginVertical: 12 },
//   benefitRow: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 6 },
//   tickIcon: { width: 22, height: 22 },
//   benefitText: { color: "#274273", fontSize: 15 },
//   legalSection: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: "#E6ECF2", alignItems: "center" },
//   disclosureText: { color: "#7D8699", fontSize: 11, textAlign: "center", marginBottom: 10, lineHeight: 16 },
//   linkRow: { flexDirection: "row", alignItems: "center" },
//   legalLink: { color: "#0B9FD4", fontSize: 12, textDecorationLine: "underline", fontWeight: "500" },
//   linkSeparator: { color: "#7D8699", marginHorizontal: 8 },
//   bottomButtonContainer: { position: "absolute", bottom: 30, left: 20, right: 20 },
//   proBadgeCard: { borderRadius: 20, backgroundColor: "#F8FAFB", padding: 25, marginTop: 20, alignItems: "center", borderWidth: 1, borderColor: "#EAECF1" },
//   proBadgeTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
//   proBadgeSub: { color: "#0B9FD4", fontWeight: "600", fontSize: 14, marginTop: 5 },
// });

// export default PurchaseScreen;


import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "../components/Button";
import Font from "../components/CustomisedFont";
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";
import { activateLicenseKey } from "../components/utils/purchase";

const TERMS_OF_USE_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const PRIVACY_POLICY_URL = "https://www.apple.com/legal/privacy/";

const PurchaseScreen: React.FC = () => {
  const {
    isSubscribed,
    refreshSubscription,
    setDebugSubscriptionOverride,
  } = useSubscription();
  const { accessToken } = useAuth();

  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const isInitialMount = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refresh = async () => {
        // Only show the full-screen loader on the very first mount
        if (isInitialMount.current) {
          setIsLoading(true);
        }

        try {
          if (isActive) {
            // Pass 'false' if you don't want a hard-fetch every single focus
            await refreshSubscription(true);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
            isInitialMount.current = false; // Mark initial load as done
          }
        }
      };

      refresh();
      return () => {
        isActive = false;
      };
    }, [refreshSubscription]) // Ensure this is memoized in context!
  );

  const handleActivateLicense = async () => {
    if (!accessToken) {
      Alert.alert("Sign in required", "Please sign in before activating a license key.");
      return;
    }

    if (!licenseKey.trim()) {
      Alert.alert("Missing key", "Please enter your license key.");
      return;
    }

    setActionLoading(true);
    try {
      await activateLicenseKey(accessToken, licenseKey);
      await refreshSubscription(true);
      Alert.alert("License activated", "Pro features are now enabled.");
      setLicenseKey("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to activate license";
      Alert.alert("Activation failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDevSubscriptionToggle = async () => {
    if (!__DEV__ || actionLoading) return;

    setActionLoading(true);
    try {
      // Logic: Toggle current state
      await setDebugSubscriptionOverride(!isSubscribed);

      // IMPORTANT: Don't call refreshSubscription(true) here manually 
      // if your context already updates the local 'isSubscribed' state, 
      // as it triggers a double render.
    } catch (e) {
      Alert.alert("Dev Error", "Failed to toggle");
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B9FD4" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        {isSubscribed ? (
          <View style={styles.proBadgeCard}>
            <Font text="NowAProMember" style={styles.proBadgeTitle} />
            <Text style={styles.proBadgeSub}>Your license is active and all pro features are unlocked.</Text>
          </View>
        ) : (
          <View style={styles.licenseCard}>
            <Text style={styles.licenseTitle}>Activate Pro License</Text>
            <Text style={styles.licenseSubtitle}>
              Enter your license key from the backend/admin panel to unlock all premium features.
            </Text>

            <TextInput
              style={styles.licenseInput}
              value={licenseKey}
              onChangeText={setLicenseKey}
              placeholder="Enter license key"
              placeholderTextColor="#8b909b"
              autoCapitalize="characters"
            />

            <Button
              style={{ padding: 10, marginTop: 12 }}
              title={actionLoading ? "Activating..." : "Activate License"}
              onPress={handleActivateLicense}
              disabled={actionLoading}
            />

            <TouchableOpacity
              style={{ marginTop: 10, alignItems: "center" }}
              onPress={() => refreshSubscription(true)}
              disabled={actionLoading}
            >
              <Text style={styles.refreshText}>I already have a license, refresh status</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.legalSection}>
          <Text style={styles.disclosureText}>
            Premium access is controlled by your account license status from our backend.
          </Text>
          <Text style={styles.disclosureText}>Terms: {TERMS_OF_USE_URL}</Text>
          <Text style={styles.disclosureText}>Privacy: {PRIVACY_POLICY_URL}</Text>
        </View>

        {__DEV__ ? (
          <Button
            style={{ padding: 10, marginTop: 12 }}
            title={isSubscribed ? "DEV: Disable Subscription" : "DEV: Enable Subscription"}
            onPress={handleDevSubscriptionToggle}
            disabled={actionLoading}
          />
        ) : null}
      </ScrollView>

      {!isSubscribed && actionLoading ? (
        <View style={styles.bottomLoaderContainer}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  licenseCard: {
    backgroundColor: "#F8FAFB",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#EAECF1",
    marginTop: 8,
  },
  licenseTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
  licenseSubtitle: { color: "#274273", fontSize: 14, marginTop: 8, marginBottom: 12 },
  licenseInput: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#fbfcfe",
  },
  refreshText: {
    color: "#1663d6",
    textDecorationLine: "underline",
    fontSize: 13,
    fontWeight: "500",
  },
  legalSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E6ECF2",
  },
  disclosureText: {
    color: "#7D8699",
    fontSize: 11,
    lineHeight: 16,
  },
  proBadgeCard: {
    borderRadius: 20,
    backgroundColor: "#F8FAFB",
    padding: 25,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAECF1",
  },
  proBadgeTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
  proBadgeSub: { color: "#0B9FD4", fontWeight: "600", fontSize: 14, marginTop: 5, textAlign: "center" },
  bottomLoaderContainer: { position: "absolute", bottom: 30, left: 20, right: 20 },
});

export default PurchaseScreen;
