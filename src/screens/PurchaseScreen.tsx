import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/Button";
import Font from "../components/CustomisedFont";
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";
import {
  cancelSubscription,
  getRevenueCatConfigurationError,
  getRevenueCatTargetProductIds,
  getSubscriptions,
  getSubscriptionSummaries,
  initIAP,
  isNativeStorePurchaseEnabled,
  isPurchaseCancelledError,
  purchaseSubscription,
  restorePurchases,
  startStripeCheckout,
  startStripePortal,
  syncRevenueCatStatusToBackend,
  verifySubscriptionStatusBackend,
  verifySubscriptionStatusRevenueCat,
  USER_FACING_SUBSCRIPTION_ERROR,
  logStoreError,
  type RevenueCatPackageSummary,
} from "../components/utils/purchase";
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "../components/utils/legal";

const FALLBACK_PLAN_PRICE = "$49/year";
const FALLBACK_PLAN_DESCRIPTION = "Annual Pro subscription";

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
    workspace,
    refreshSubscription,
    setDebugSubscriptionOverride,
    debugSubscriptionOverride,
  } = useSubscription();
  const { accessToken, user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [availablePlans, setAvailablePlans] = useState<RevenueCatPackageSummary[]>([]);
  const [selectedPackageIdentifier, setSelectedPackageIdentifier] = useState<string | null>(null);
  const [storeError, setStoreError] = useState<string | null>(null);
  const [webNotice, setWebNotice] = useState<string | null>(null);

  const promptSignIn = React.useCallback((message: string) => {
    Alert.alert("Sign in required", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign in",
        onPress: () => {
          let rootNavigation: any = navigation;
          while (rootNavigation?.getParent?.()) {
            rootNavigation = rootNavigation.getParent();
          }
          rootNavigation?.navigate?.("SignIn");
        },
      },
    ]);
  }, [navigation]);

  const openExternalUrl = React.useCallback(async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Unable to open link", url);
    }
  }, []);

  const isInitialMount = React.useRef(true);
  const refreshInFlight = React.useRef(false);
  const refreshSubscriptionRef = React.useRef(refreshSubscription);

  React.useEffect(() => {
    refreshSubscriptionRef.current = refreshSubscription;
  }, [refreshSubscription]);

  React.useEffect(() => {
    if (Platform.OS === "web" || isNativeStorePurchaseEnabled()) {
      return;
    }

    const handleNativeBillingReturn = async (urlValue: string) => {
      if (!urlValue) return;

      try {
        const parsed = new URL(urlValue);
        const path = parsed.pathname.toLowerCase();
        if (!path.includes("purchase")) {
          return;
        }

        const checkout = (parsed.searchParams.get("checkout") ?? "").toLowerCase();
        const portal = (parsed.searchParams.get("portal") ?? "").toLowerCase();

        if (checkout === "success" || portal === "return") {
          setWebNotice("Checkout completed. Verifying your subscription status...");
          await refreshSubscriptionRef.current(true);
          return;
        }

        if (checkout === "cancel") {
          setWebNotice("Checkout was canceled. You can try again any time.");
        }
      } catch {
        // Ignore malformed callback URLs.
      }
    };

    Linking.getInitialURL()
      .then((value) => {
        if (value) {
          handleNativeBillingReturn(value).catch(() => undefined);
        }
      })
      .catch(() => undefined);

    const sub = Linking.addEventListener("url", ({ url }) => {
      handleNativeBillingReturn(url).catch(() => undefined);
    });

    return () => {
      sub.remove();
    };
  }, []);

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
    const targetProductIds = getRevenueCatTargetProductIds();
    return (
      availablePlans.find((item) => targetProductIds.includes(item.productIdentifier)) ??
      availablePlans.find((item) => item.identifier === selectedPackageIdentifier) ??
      availablePlans.find((item) => item.packageType.toUpperCase() === "ANNUAL") ??
      availablePlans[0]
    );
  }, [availablePlans, selectedPackageIdentifier]);

  const loadNativePlanOptions = React.useCallback(async () => {
    if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
      setStoreError(null);
      setAvailablePlans([]);
      setSelectedPackageIdentifier(null);
      return;
    }

    const configError = getRevenueCatConfigurationError();
    if (configError) {
      logStoreError("screen-config", configError);
      setStoreError(USER_FACING_SUBSCRIPTION_ERROR);
      setAvailablePlans([]);
      setSelectedPackageIdentifier(null);
      return;
    }

    try {
      await initIAP();
      const summaries = await getSubscriptionSummaries();
      if (!summaries.length) {
        logStoreError("screen-load", "No subscription summaries returned from store.");
        setStoreError(USER_FACING_SUBSCRIPTION_ERROR);
        setAvailablePlans([]);
        setSelectedPackageIdentifier(null);
        return;
      }

      setStoreError(null);
      setAvailablePlans(summaries);
      setSelectedPackageIdentifier((prev) => {
        const targetProductIds = getRevenueCatTargetProductIds();
        const configuredProduct = summaries.find((item) =>
          targetProductIds.includes(item.productIdentifier)
        );
        if (configuredProduct) {
          return configuredProduct.identifier;
        }

        if (prev && summaries.some((item) => item.identifier === prev)) {
          return prev;
        }

        const annual = summaries.find((item) => item.packageType.toUpperCase() === "ANNUAL");
        return annual?.identifier ?? summaries[0]?.identifier ?? null;
      });
    } catch (error) {
      logStoreError("screen-load", error);
      setStoreError(USER_FACING_SUBSCRIPTION_ERROR);
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

    if (Platform.OS !== "web" && isNativeStorePurchaseEnabled() && storeError) {
      Alert.alert("Subscriptions unavailable", storeError);
      return;
    }

    setActionLoading(true);
    try {
      await setDebugSubscriptionOverride(null);
      if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
        await startStripeCheckout(accessToken);
        return;
      }

      await initIAP();
      const existingStoreStatus = await verifySubscriptionStatusRevenueCat();
      if (existingStoreStatus?.isValid) {
        await refreshSubscription(true);
        const backendStatus = await verifySubscriptionStatusBackend(accessToken);
        if (backendStatus?.isValid) {
          Alert.alert("Subscription active", "Your Pro access is already active for this account.");
          return;
        }

        Alert.alert(
          "Already subscribed on this Apple ID",
          "This Apple ID already has an active subscription. Sign in with the app account that owns this purchase, or manage the subscription from your App Store settings."
        );
        return;
      }
      const packages = await getSubscriptions();
      await purchaseSubscription(packages, selectedPackageIdentifier);
      const syncedStatus = await syncRevenueCatStatusToBackend(accessToken, user?.id ?? null, "purchase");
      await refreshSubscription(true);
      if (syncedStatus?.isValid) {
        Alert.alert("Upgrade complete", "Subscription is active. Pro features are unlocked.");
      } else {
        Alert.alert("Purchase synced", "Your purchase was sent to the backend. Refreshing access now.");
      }
    } catch (error) {
      if (isPurchaseCancelledError(error)) {
        return;
      }
      logStoreError("subscribe", error);
      const message =
        error instanceof Error && error.message === USER_FACING_SUBSCRIPTION_ERROR
          ? error.message
          : USER_FACING_SUBSCRIPTION_ERROR;
      Alert.alert("Subscription failed", message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    if (actionLoading) return;
    if (!accessToken) {
      promptSignIn("Please sign in before restoring purchases.");
      return;
    }

    if (Platform.OS === "web" || !isNativeStorePurchaseEnabled()) {
      Alert.alert("Restore unavailable", "Restore purchases is only available in the iOS and Android apps.");
      return;
    }

    if (storeError) {
      Alert.alert("Subscriptions unavailable", storeError);
      return;
    }

    setActionLoading(true);
    try {
      await initIAP();
      const restoredStatus = await restorePurchases();
      if (!restoredStatus?.isValid) {
        Alert.alert("No purchases found", "No active subscription was found for this Apple ID.");
        return;
      }

      const syncedStatus = await syncRevenueCatStatusToBackend(
        accessToken,
        user?.id ?? null,
        "restore"
      );
      await refreshSubscription(true);

      if (syncedStatus?.isValid || restoredStatus.isValid) {
        Alert.alert("Restore complete", "Your subscription has been restored.");
      } else {
        Alert.alert(
          "Restore pending",
          "A store subscription was found, but backend access could not be confirmed yet. Try Refresh Status."
        );
      }
    } catch (error) {
      logStoreError("restore", error);
      Alert.alert("Restore failed", USER_FACING_SUBSCRIPTION_ERROR);
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

      if (!isNativeStorePurchaseEnabled()) {
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
      ? "In-app purchase"
      : subscriptionSource === "stripe"
        ? Platform.OS === "web"
          ? "Stripe subscription"
          : "Individual account access"
        : subscriptionSource === "workspace"
          ? "Workspace access"
          : subscriptionSource === "mixed"
            ? "Store purchase + backend entitlement sync"
            : "Not active";
  const canOpenStripeBilling =
    Platform.OS === "web" &&
    isSubscribed &&
    subscriptionSource === "stripe";
  const showNativeStripeRefresh =
    Platform.OS !== "web" &&
    !isNativeStorePurchaseEnabled();
  const stripeCancelAtPeriodEnd =
    subscriptionSource === "stripe" &&
    isSubscribed &&
    !autoRenewing &&
    Boolean(expiryLabel);
  const isWorkspaceAccess = subscriptionSource === "workspace";
  const isStoreManagedAccess = subscriptionSource === "iap" || subscriptionSource === "mixed";
  const statusMessage = stripeCancelAtPeriodEnd
    ? `Your subscription is scheduled to end on ${expiryLabel}.`
    : isWorkspaceAccess
      ? `${workspace?.name ?? "Your workspace"} provides your Pro access.`
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
            {workspace ? (
              <Text style={styles.workspaceMetaText}>
                Workspace: {workspace.name} ({workspace.role}, {workspace.memberStatus})
              </Text>
            ) : null}
            {Platform.OS !== "web" && isStoreManagedAccess ? (
              <>
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
            {showNativeStripeRefresh ? (
              <Button
                style={styles.actionButtonSecondary}
                title="Refresh Status"
                onPress={handleManualStatusRefresh}
                disabled={actionLoading}
              />
            ) : null}
          </View>
        ) : (
          <View
            style={[
              styles.accessCard,
              webContentWidthStyle,
              isNativeMobile ? styles.accessCardMobile : null,
            ]}
          >
            {webNotice ? (
              <View style={styles.noticeCard}>
                <Text style={styles.noticeText}>{webNotice}</Text>
              </View>
            ) : null}
            <Text style={styles.accessTitle}>Health Age Pro</Text>
            <Text style={styles.accessSubtitle}>
              Subscribe yearly for individual Pro access. Workspace access is applied automatically when your
              organization invites the email address you use to sign in.
            </Text>

            {Platform.OS !== "web" && storeError ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>Subscriptions unavailable</Text>
                <Text style={styles.errorBody}>{storeError}</Text>
                <Button
                  style={styles.actionButton}
                  title="Retry"
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

            <Button
              type="intro"
              style={styles.actionButton}
              title="upgrade"
              onPress={handleSubscribe}
              disabled={
                actionLoading ||
                (Platform.OS !== "web" &&
                  isNativeStorePurchaseEnabled() &&
                  Boolean(storeError))
              }
            />

            {Platform.OS !== "web" && isNativeStorePurchaseEnabled() ? (
              <TouchableOpacity
                style={{ marginTop: 10, alignItems: "center" }}
                onPress={handleRestorePurchases}
                disabled={actionLoading || Boolean(storeError)}
              >
                <Text style={styles.refreshText}>Restore Purchases</Text>
              </TouchableOpacity>
            ) : null}

            {Platform.OS !== "web" ? (
              <>
                <TouchableOpacity
                  style={{ marginTop: 10, alignItems: "center" }}
                  onPress={handleManageSubscription}
                  disabled={actionLoading}
                >
                  <Text style={styles.refreshText}>Manage existing subscription</Text>
                </TouchableOpacity>
                {showNativeStripeRefresh ? (
                  <TouchableOpacity
                    style={{ marginTop: 10, alignItems: "center" }}
                    onPress={handleManualStatusRefresh}
                    disabled={actionLoading}
                  >
                    <Text style={styles.refreshText}>Refresh status in app</Text>
                  </TouchableOpacity>
                ) : null}
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

          </View>
        )}

        <View style={styles.legalSection}>
          <Text style={styles.disclosureText}>
            {Platform.OS === "web"
              ? "Health Age Pro web subscriptions are processed by Stripe Checkout and can be managed from the billing portal."
              : `Health Age Pro is an auto-renewable annual subscription. Payment is charged through your ${Platform.OS === "ios" ? "Apple App Store" : "Google Play"} account.`}
          </Text>
          {Platform.OS !== "web" ? (
            <Text style={styles.disclosureText}>
              The subscription renews automatically unless canceled at least 24 hours before the current period ends.
            </Text>
          ) : null}
          <View style={styles.legalLinkRow}>
            <TouchableOpacity onPress={() => openExternalUrl(TERMS_OF_USE_URL)}>
              <Text style={styles.legalLink}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.legalDivider}> • </Text>
            <TouchableOpacity onPress={() => openExternalUrl(PRIVACY_POLICY_URL)}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
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
  accessCard: {
    backgroundColor: "#F8FAFB",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#EAECF1",
    marginTop: 8,
  },
  accessCardMobile: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 0,
  },
  accessTitle: { color: "#274273", fontWeight: "700", fontSize: 20 },
  accessSubtitle: { color: "#274273", fontSize: 14, marginTop: 8, marginBottom: 12 },
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
  organizationAccessBox: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E6ECF2",
  },
  organizationAccessQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  organizationAccessQuestionText: {
    color: "#274273",
    fontSize: 14,
    fontWeight: "700",
  },
  organizationAccessChevron: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
  },
  organizationAccessPanel: {
    paddingTop: 2,
  },
  organizationAccessText: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
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
  legalLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  legalLink: {
    color: "#1663d6",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  legalDivider: {
    color: "#7D8699",
    marginHorizontal: 6,
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
  workspaceMetaText: {
    marginTop: 8,
    color: "#315E99",
    fontSize: 12,
    fontWeight: "600",
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
