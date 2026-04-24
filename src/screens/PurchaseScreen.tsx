import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/Button";
import Font from "../components/CustomisedFont";
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";
import {
  activateLicenseKey,
  cancelSubscription,
  getRevenueCatConfigurationError,
  getSubscriptions,
  getSubscriptionSummaries,
  initIAP,
  purchaseSubscription,
  restorePurchases,
  startStripeCheckout,
  startStripePortal,
  syncRevenueCatStatusToBackend,
  verifySubscriptionStatusRevenueCat,
  type RevenueCatPackageSummary,
} from "../components/utils/purchase";

const TERMS_OF_USE_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const PRIVACY_POLICY_URL = "https://www.apple.com/legal/privacy/";
const FALLBACK_PLAN_PRICE = "$49/year";
const FALLBACK_PLAN_DESCRIPTION = "Annual Pro subscription";
const LICENSE_KEY_FORMAT = "ORG-******-******-******-******";
const LICENSE_KEY_REGEX = /^ORG-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/;

const formatDate = (value: Date | null): string | null => {
  if (!value) return null;
  return value.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PurchaseScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const {
    isSubscribed,
    autoRenewing,
    expiryDate,
    subscriptionSource,
    providerStatus,
    refreshSubscription,
    setDebugSubscriptionOverride,
    debugSubscriptionOverride,
  } = useSubscription();
  const { accessToken, user } = useAuth();

  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [availablePlans, setAvailablePlans] = useState<RevenueCatPackageSummary[]>([]);
  const [selectedPackageIdentifier, setSelectedPackageIdentifier] = useState<string | null>(null);
  const [storeError, setStoreError] = useState<string | null>(null);
  const [webNotice, setWebNotice] = useState<string | null>(null);
  const [licenseError, setLicenseError] = useState<string | null>(null);

  const promptSignIn = React.useCallback((message: string) => {
    Alert.alert("Sign in required", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign in",
        onPress: () => navigation.navigate("SignIn"),
      },
    ]);
  }, [navigation]);

  const isInitialMount = React.useRef(true);
  const refreshInFlight = React.useRef(false);
  const refreshSubscriptionRef = React.useRef(refreshSubscription);

  React.useEffect(() => {
    refreshSubscriptionRef.current = refreshSubscription;
  }, [refreshSubscription]);

  React.useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const checkoutSignal =
      params.get("checkout") ??
      params.get("checkout_status") ??
      params.get("session_status") ??
      params.get("stripe");

    const pathSignal = window.location.pathname.toLowerCase();
    const normalized = (checkoutSignal ?? "").toLowerCase();
    const isSuccessPath = pathSignal.includes("/success");
    const isCancelPath = pathSignal.includes("/cancel");

    if (!checkoutSignal && !isSuccessPath && !isCancelPath) {
      return;
    }

    if (normalized.includes("success") || normalized === "paid" || normalized === "complete") {
      setWebNotice("Checkout completed. Verifying your subscription status...");
      refreshSubscription(true).catch(() => undefined);
      return;
    }

    if (normalized.includes("cancel")) {
      setWebNotice("Checkout was canceled. You can try again any time.");
      return;
    }

    if (isSuccessPath) {
      setWebNotice("Checkout/portal update received. Verifying your subscription status...");
      refreshSubscription(true).catch(() => undefined);
      return;
    }

    if (isCancelPath) {
      setWebNotice("Action canceled. Your current subscription status is unchanged.");
    }
  }, [refreshSubscription]);

  const selectedPlan = React.useMemo(() => {
    if (!availablePlans.length) return null;
    return (
      availablePlans.find((item) => item.identifier === selectedPackageIdentifier) ??
      availablePlans.find((item) => item.packageType.toUpperCase() === "ANNUAL") ??
      availablePlans[0]
    );
  }, [availablePlans, selectedPackageIdentifier]);

  const loadNativePlanOptions = React.useCallback(async () => {
    if (Platform.OS === "web") {
      return;
    }

    const configError = getRevenueCatConfigurationError();
    if (configError) {
      setStoreError(configError);
      setAvailablePlans([]);
      setSelectedPackageIdentifier(null);
      return;
    }

    try {
      await initIAP();
      const summaries = await getSubscriptionSummaries();
      if (!summaries.length) {
        setStoreError("Store plan unavailable right now. Please try again.");
        setAvailablePlans([]);
        setSelectedPackageIdentifier(null);
        return;
      }

      setStoreError(null);
      setAvailablePlans(summaries);
      setSelectedPackageIdentifier((prev) => {
        if (prev && summaries.some((item) => item.identifier === prev)) {
          return prev;
        }

        const annual = summaries.find((item) => item.packageType.toUpperCase() === "ANNUAL");
        return annual?.identifier ?? summaries[0]?.identifier ?? null;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load plans from store.";
      setStoreError(message);
      setAvailablePlans([]);
      setSelectedPackageIdentifier(null);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refresh = async () => {
        if (refreshInFlight.current) {
          return;
        }
        refreshInFlight.current = true;

        if (isInitialMount.current) {
          setIsLoading(true);
        }

        try {
          if (!isActive) return;
          await refreshSubscriptionRef.current(true);
          if (Platform.OS !== "web") {
            await loadNativePlanOptions();
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
            isInitialMount.current = false;
          }
          refreshInFlight.current = false;
        }
      };

      refresh().catch((error) => {
        console.warn("Failed to refresh purchase screen:", error);
      });

      return () => {
        isActive = false;
      };
    }, [loadNativePlanOptions])
  );

  const handleActivateLicense = async () => {
    if (!accessToken) {
      promptSignIn("Please sign in before activating a license key.");
      return;
    }

    const normalizedKey = licenseKey.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setLicenseKey(normalizedKey);

    if (!normalizedKey) {
      const message = "Please enter your license key.";
      setLicenseError(message);
      Alert.alert("Missing key", message);
      return;
    }

    if (!LICENSE_KEY_REGEX.test(normalizedKey)) {
      const message = `Invalid license key format. Use ${LICENSE_KEY_FORMAT}`;
      setLicenseError(message);
      Alert.alert("Invalid format", message);
      return;
    }

    setActionLoading(true);
    try {
      await setDebugSubscriptionOverride(null);
      setLicenseError(null);
      const status = await activateLicenseKey(accessToken, normalizedKey);
      await refreshSubscription(true);
      if (!status.isValid) {
        const statusText =
          status.providerStatus && status.providerStatus.trim()
            ? ` (status: ${status.providerStatus})`
            : "";
        const message = `License key was submitted but is not active${statusText}.`;
        setLicenseError(message);
        Alert.alert("Activation pending", message);
        return;
      }
      Alert.alert("License activated", "Pro features are now enabled.");
      setLicenseKey("");
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "Unable to activate license";
      const message =
        /max.*activation|activation.*limit|device.*limit/i.test(rawMessage)
          ? "This license key has reached its maximum activation limit. Please contact your admin."
          : rawMessage;
      setLicenseError(message);
      Alert.alert("Activation failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDevSubscriptionToggle = async () => {
    if (!__DEV__ || actionLoading) return;

    setActionLoading(true);
    try {
      await setDebugSubscriptionOverride(!isSubscribed);
    } catch {
      Alert.alert("Dev Error", "Failed to toggle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (actionLoading) return;
    if (!accessToken) {
      promptSignIn("Please sign in before starting a subscription.");
      return;
    }

    if (Platform.OS !== "web" && storeError) {
      Alert.alert("RevenueCat setup required", storeError);
      return;
    }

    setActionLoading(true);
    try {
      await setDebugSubscriptionOverride(null);
      if (Platform.OS === "web") {
        await startStripeCheckout(accessToken);
        return;
      }

      await initIAP();
      const existingStoreStatus = await verifySubscriptionStatusRevenueCat();
      if (existingStoreStatus?.isValid) {
        Alert.alert(
          "Already subscribed on this Apple ID",
          "This Apple ID already has an active subscription. Use Restore Purchases to link it to this account."
        );
        return;
      }
      const packages = await getSubscriptions();
      await purchaseSubscription(packages, selectedPackageIdentifier);
      await syncRevenueCatStatusToBackend(accessToken, user?.id ?? null);
      await refreshSubscription(true);
      Alert.alert("Upgrade complete", "Subscription is active. Pro features are unlocked.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to subscribe";
      Alert.alert("Subscription failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async () => {
    if (actionLoading) return;
    if (!accessToken) {
      promptSignIn("Please sign in before restoring purchases.");
      return;
    }

    setActionLoading(true);
    try {
      await setDebugSubscriptionOverride(null);
      const restored = await restorePurchases();
      await syncRevenueCatStatusToBackend(accessToken, user?.id ?? null);
      await refreshSubscription(true);

      if (restored?.isValid) {
        const expiryLabel = formatDate(restored.expiryDate);
        Alert.alert(
          "Restore complete",
          expiryLabel ? `Subscription restored until ${expiryLabel}.` : "Subscription restored successfully."
        );
      } else {
        Alert.alert("Restore complete", "No active subscription was found to restore.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to restore purchases";
      Alert.alert("Restore failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!accessToken) {
      promptSignIn("Please sign in before opening billing or subscription settings.");
      return;
    }
    try {
      if (Platform.OS === "web") {
        await startStripePortal(accessToken);
        return;
      }
      await cancelSubscription();
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Platform.OS === "web"
          ? "Unable to open billing portal"
          : "Unable to open subscription management";
      Alert.alert("Action failed", message);
    }
  };

  const handleManualStatusRefresh = async () => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      if (__DEV__ && debugSubscriptionOverride !== null) {
        await setDebugSubscriptionOverride(null);
      }
      await refreshSubscription(true);
      if (__DEV__ && debugSubscriptionOverride !== null) {
        Alert.alert("Status refreshed", "Live subscription status reloaded (DEV override cleared).");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to refresh status";
      Alert.alert("Refresh failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const expiryLabel = formatDate(expiryDate);
  const scrollContentStyle = React.useMemo(
    () => [
      styles.scrollContent,
      Platform.OS !== "web"
        ? {
          paddingBottom: 36 + insets.bottom,
        }
        : null,
    ],
    [insets.bottom]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B9FD4" />
      </View>
    );
  }

  const planPrice = selectedPlan?.priceString || FALLBACK_PLAN_PRICE;
  const planTitle = selectedPlan?.title || selectedPlan?.description || FALLBACK_PLAN_DESCRIPTION;
  const planPeriod = selectedPlan?.billingPeriod ? `Billing period: ${selectedPlan.billingPeriod}` : "";
  const showPlanOptions = Platform.OS !== "web" && __DEV__;
  const sourceLabel =
    subscriptionSource === "iap"
      ? "In-app purchase (RevenueCat)"
      : subscriptionSource === "stripe"
        ? "Stripe subscription"
        : subscriptionSource === "enterprise"
          ? "Enterprise license key"
          : subscriptionSource === "mixed"
            ? "RevenueCat + backend license sync"
            : "Not active";
  const canOpenStripeBilling =
    Platform.OS === "web" &&
    isSubscribed &&
    subscriptionSource === "stripe";
  const stripeCancelAtPeriodEnd =
    subscriptionSource === "stripe" &&
    isSubscribed &&
    !autoRenewing &&
    Boolean(expiryLabel);
  const statusMessage = stripeCancelAtPeriodEnd
    ? `Your subscription is scheduled to end on ${expiryLabel}.`
    : autoRenewing
      ? `Subscription is active${expiryLabel ? ` until ${expiryLabel}` : ""}.`
      : `Premium access is active${expiryLabel ? ` until ${expiryLabel}` : ""}.`;

  const webContentWidthStyle = Platform.OS === "web" ? styles.webContentWidth : null;
  const isNativeMobile = Platform.OS !== "web";
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container} contentContainerStyle={scrollContentStyle}>
        {isSubscribed ? (
          <View
            style={[
              styles.proBadgeCard,
              webContentWidthStyle,
              isNativeMobile ? styles.proBadgeCardMobile : null,
            ]}
          >
            <Text style={styles.proTag}>PRO</Text>
            <Font text="NowAProMember" style={styles.proBadgeTitle} />
            <Text style={styles.proBadgeSub}>
              {statusMessage}
            </Text>
            <Text style={styles.sourceMetaLine} numberOfLines={1} ellipsizeMode="tail">
              Access source: {sourceLabel}
              {providerStatus ? `   |   Provider status: ${providerStatus}` : ""}
            </Text>
            {Platform.OS !== "web" ? (
              <>
                <Button
                  type="intro"
                  style={{ padding: 10, marginTop: 12 }}
                  title="Restore Purchases"
                  onPress={handleRestore}
                  disabled={actionLoading}
                />
                <Button
                  type="intro"
                  style={{ padding: 10, marginTop: 12 }}
                  title="Manage Subscription"
                  onPress={handleManageSubscription}
                  disabled={actionLoading}
                />
              </>
            ) : canOpenStripeBilling ? (
              <Button
                style={styles.actionButton}
                title="Manage Billing"
                onPress={handleManageSubscription}
                disabled={actionLoading}
              />
            ) : null}
          </View>
        ) : (
          <View
            style={[
              styles.licenseCard,
              webContentWidthStyle,
              isNativeMobile ? styles.licenseCardMobile : null,
            ]}
          >
            {webNotice ? (
              <View style={styles.noticeCard}>
                <Text style={styles.noticeText}>{webNotice}</Text>
              </View>
            ) : null}
            <Text style={styles.licenseTitle}>Health Age Pro</Text>
            <Text style={styles.licenseSubtitle}>
              Subscribe yearly for full premium access. If you were given a manual license key from your admin panel,
              you can activate it below instead of purchasing.
            </Text>

            {Platform.OS !== "web" && storeError ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>Store configuration required</Text>
                <Text style={styles.errorBody}>{storeError}</Text>
                <Button
                  style={styles.actionButton}
                  title="Retry Store Load"
                  onPress={loadNativePlanOptions}
                  disabled={actionLoading}
                />
              </View>
            ) : null}

            <View style={styles.planCard}>
              <Text style={styles.planPrice}>{planPrice}</Text>
              <Text style={styles.planName}>{planTitle}</Text>
              <Text style={styles.planMeta}>Recurring annual subscription. Cancel any time from your store settings.</Text>
              {planPeriod ? <Text style={styles.planMeta}>{planPeriod}</Text> : null}
            </View>

            {/* {showPlanOptions ? (
              <View style={styles.optionsWrap}>
                {availablePlans.map((plan) => {
                  const active = plan.identifier === selectedPlan?.identifier;
                  const optionTitle =
                    plan.title ||
                    plan.description ||
                    (__DEV__ ? plan.identifier : "Annual Plan");
                  return (
                    <TouchableOpacity
                      key={plan.identifier}
                      style={[styles.optionCard, active ? styles.optionCardActive : null]}
                      onPress={() => setSelectedPackageIdentifier(plan.identifier)}
                      disabled={actionLoading}
                    >
                      <Text style={[styles.optionTitle, active ? styles.optionTitleActive : null]}>
                        {optionTitle}
                      </Text>
                      <Text style={[styles.optionPrice, active ? styles.optionTitleActive : null]}>
                        {plan.priceString || planPrice}
                      </Text>
                      {__DEV__ ? (
                        <Text style={[styles.optionDebug, active ? styles.optionTitleActive : null]}>
                          {plan.identifier}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null} */}

            <TextInput
              style={[styles.licenseInput, licenseError ? styles.licenseInputError : null]}
              value={licenseKey}
              onChangeText={(value) => {
                const normalized = value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
                setLicenseKey(normalized);
                if (licenseError) {
                  setLicenseError(null);
                }
              }}
              placeholder={`Enter license key (${LICENSE_KEY_FORMAT})`}
              placeholderTextColor="#8b909b"
              autoCapitalize="characters"
              autoCorrect={false}
              autoComplete="off"
              maxLength={31}
            />
            {licenseError ? <Text style={styles.licenseErrorText}>{licenseError}</Text> : null}
            {Platform.OS === "web" ? (
              <View style={styles.webActionRow}>
                <View style={styles.webActionItem}>
                  <Button
                    style={styles.webActionButton}
                    title={actionLoading ? "Activating..." : "Activate License"}
                    onPress={handleActivateLicense}
                    disabled={actionLoading}
                  />
                </View>
                <View style={styles.webActionItem}>
                  <Button
                    style={styles.webActionButton}
                    title="Subscribe"
                    onPress={handleSubscribe}
                    disabled={actionLoading}
                  />
                </View>
              </View>
            ) : (
              <>
                <Button
                  type="intro"
                  style={styles.actionButton}
                  title={actionLoading ? "Activating..." : "Activate License"}
                  onPress={handleActivateLicense}
                  disabled={actionLoading}
                />

                <Text style={styles.orText}>or</Text>
                <Button
                  type="intro"
                  style={styles.actionButtonSecondary}
                  title="Subscribe"
                  onPress={handleSubscribe}
                  disabled={actionLoading}
                />
              </>
            )}

            {Platform.OS !== "web" ? (
              <>
                <Button
                  type="intro"
                  style={{ marginTop: 20 }}
                  title="Restore Purchases"
                  onPress={handleRestore}
                  disabled={actionLoading}
                />
                <TouchableOpacity
                  style={{ marginTop: 10, alignItems: "center" }}
                  onPress={handleManageSubscription}
                  disabled={actionLoading}
                >
                  <Text style={styles.refreshText}>Manage existing subscription</Text>
                </TouchableOpacity>
              </>
            ) : canOpenStripeBilling ? (
              <TouchableOpacity
                style={{ marginTop: 10, alignItems: "center" }}
                onPress={handleManageSubscription}
                disabled={actionLoading}
              >
                <Text style={styles.refreshText}>Open Billing Portal</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={{ marginTop: 10, alignItems: "center" }}
              onPress={handleManualStatusRefresh}
              disabled={actionLoading}
            >
              <Text style={styles.refreshText}>I already have a license, refresh status</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.legalSection}>
          <Text style={styles.disclosureText}>
            Premium access is tied to your signed-in account. Native apps use store subscriptions through RevenueCat.
          </Text>
          <Text style={styles.disclosureText}>
            Web checkout uses Stripe. Admin-issued license keys can also unlock premium access.
          </Text>
          <Text style={styles.disclosureText}>Terms: {TERMS_OF_USE_URL}</Text>
          <Text style={styles.disclosureText}>Privacy: {PRIVACY_POLICY_URL}</Text>
        </View>

        {__DEV__ ? (
          <Button
            style={{
              ...styles.actionButton,
              ...(webContentWidthStyle ?? {}),
            }}
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
  scrollContent: { paddingBottom: 120, alignItems: "center" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  webContentWidth: {
    width: "100%",
    maxWidth: 900,
  },
  actionButton: {
    marginTop: 10,
  },
  actionButtonSecondary: {
    marginTop: 6,
  },
  webActionRow: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  webActionItem: {
    width: 220,
    maxWidth: "48%",
  },
  webActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  licenseCard: {
    backgroundColor: "#F8FAFB",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#EAECF1",
    marginTop: 8,
  },
  licenseCardMobile: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 0,
  },
  licenseTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
  licenseSubtitle: { color: "#274273", fontSize: 14, marginTop: 8, marginBottom: 12 },
  planCard: {
    borderWidth: 1,
    borderColor: "#E5DCC7",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#FFF9EE",
    marginBottom: 14,
  },
  errorCard: {
    borderWidth: 1,
    borderColor: "#F1C5C5",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFF2F2",
    marginBottom: 12,
  },
  errorTitle: {
    color: "#8A1717",
    fontSize: 14,
    fontWeight: "700",
  },
  errorBody: {
    color: "#9C2A2A",
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  planPrice: {
    color: "#8A5B00",
    fontSize: 26,
    fontWeight: "700",
  },
  planName: {
    color: "#274273",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  planMeta: {
    color: "#7D8699",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  noticeCard: {
    borderWidth: 1,
    borderColor: "#C9E3FF",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#EEF7FF",
    marginBottom: 12,
  },
  noticeText: {
    color: "#214F87",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  optionsWrap: {
    marginBottom: 12,
    gap: 8,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: "#D8DEEA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FBFCFE",
  },
  optionCardActive: {
    borderColor: "#1663d6",
    backgroundColor: "#EEF5FF",
  },
  optionTitle: {
    color: "#1B2F54",
    fontSize: 13,
    fontWeight: "600",
  },
  optionTitleActive: {
    color: "#0C3E8A",
  },
  optionPrice: {
    color: "#5D6980",
    marginTop: 4,
    fontSize: 13,
  },
  licenseInput: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#fbfcfe",
  },
  licenseInputError: {
    borderColor: "#DC2626",
  },
  licenseErrorText: {
    alignSelf: "flex-start",
    marginTop: 6,
    color: "#B42318",
    fontSize: 13,
    fontWeight: "500",
  },
  licenseHintText: {
    alignSelf: "flex-start",
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
  },
  refreshText: {
    color: "#1663d6",
    textDecorationLine: "underline",
    fontSize: 13,
    fontWeight: "500",
  },
  orText: {
    marginTop: 10,
    textAlign: "center",
    color: "#7D8699",
    fontSize: 12,
    fontWeight: "600",
  },
  legalSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E6ECF2",
    width: "100%",
    maxWidth: 900,
  },
  disclosureText: {
    color: "#7D8699",
    fontSize: 11,
    lineHeight: 16,
  },
  proBadgeCard: {
    borderRadius: 20,
    backgroundColor: "#EEF7FF",
    padding: 25,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C9E3FF",
  },
  proBadgeCardMobile: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 8,
    alignItems: "flex-start",
  },
  proTag: {
    backgroundColor: "#0C64D8",
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  proBadgeTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
  proBadgeSub: { color: "#0B9FD4", fontWeight: "600", fontSize: 14, marginTop: 5, textAlign: "center" },
  sourceMetaLine: {
    marginTop: 10,
    color: "#315E99",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "left",
    width: "100%",
  },
  optionDebug: {
    marginTop: 4,
    fontSize: 11,
    color: "#516280",
  },
  bottomLoaderContainer: { position: "absolute", bottom: 30, left: 20, right: 20 },
});

export default PurchaseScreen;
