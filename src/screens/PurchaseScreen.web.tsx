import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Linking,
    Text,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import Button from "../components/Button";
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";
import {
    startStripeCheckout,
    startStripePortal,
    verifySubscriptionStatusBackend,
    type SubscriptionStatus,
} from "../components/utils/purchase";
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "../components/utils/legal";

const PENDING_STRIPE_CHECKOUT_KEY = "pending_stripe_checkout_started_at";

const PurchaseScreenWeb: React.FC = () => {
    const { width } = useWindowDimensions();
    const {
        isSubscribed,
        autoRenewing,
        expiryDate,
        subscriptionSource,
        providerStatus,
        workspace,
        refreshSubscription,
    } = useSubscription();
    const { accessToken } = useAuth();

    const [actionLoading, setActionLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notice, setNotice] = useState<string | null>(null);
    const [isPollingStripe, setIsPollingStripe] = useState(false);

    const isDesktop = width > 900;
    const openExternalUrl = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert("Unable to open link", url);
        }
    };

    const describeEntitlement = React.useCallback((status: SubscriptionStatus | null): string => {
        if (!accessToken) return "Please sign in to check subscription access.";
        if (!status) return "Could not read entitlement status from the backend.";
        if (status.isValid) {
            const source = status.source === "individual_stripe"
                ? "Stripe subscription"
                : status.source === "workspace"
                    ? "workspace"
                    : status.source ?? "entitlement";
            return `Access is active via ${source}.`;
        }

        return status.providerStatus
            ? `No active access yet. Backend status: ${status.providerStatus}.`
            : "No active access yet. If Stripe checkout just completed, wait a moment and refresh again.";
    }, [accessToken]);

    const refreshAccessStatus = React.useCallback(async (): Promise<SubscriptionStatus | null> => {
        if (!accessToken) {
            await refreshSubscription(true);
            return null;
        }

        const status = await verifySubscriptionStatusBackend(accessToken);
        await refreshSubscription(true);
        return status;
    }, [accessToken, refreshSubscription]);

    const pollStripeEntitlement = React.useCallback(async () => {
        if (!accessToken || typeof window === "undefined") return;

        const maxAttempts = 20;
        const delayMs = 3000;
        setIsPollingStripe(true);

        try {
            for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
                const status = await refreshAccessStatus();
                if (status?.isValid) {
                    window.localStorage.removeItem(PENDING_STRIPE_CHECKOUT_KEY);
                    setNotice(describeEntitlement(status));
                    return;
                }

                setNotice(
                    attempt === 0
                        ? "Waiting for Stripe to confirm your subscription..."
                        : `Waiting for Stripe confirmation... (${attempt + 1}/${maxAttempts})`
                );
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }

            const finalStatus = await refreshAccessStatus();
            setNotice(describeEntitlement(finalStatus));
        } finally {
            setIsPollingStripe(false);
        }
    }, [accessToken, describeEntitlement, refreshAccessStatus]);

    useEffect(() => {
        const init = async () => {
            const status = await refreshAccessStatus();
            if (status?.isValid && typeof window !== "undefined") {
                window.localStorage.removeItem(PENDING_STRIPE_CHECKOUT_KEY);
            }
            setIsLoading(false);
        };
        init();
    }, [refreshAccessStatus]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const path = window.location.pathname.toLowerCase();
        const checkout = (params.get("checkout") ?? params.get("stripe") ?? "").toLowerCase();
        const portal = (params.get("portal") ?? "").toLowerCase();

        const didReturnFromStripe =
            checkout.includes("success") ||
            checkout.includes("complete") ||
            portal === "return" ||
            path.includes("/success");
        const didCancel =
            checkout.includes("cancel") ||
            path.includes("/cancel");

        const pendingStartedAt = Number(window.localStorage.getItem(PENDING_STRIPE_CHECKOUT_KEY) ?? 0);
        const hasRecentPendingCheckout =
            Number.isFinite(pendingStartedAt) &&
            pendingStartedAt > 0 &&
            Date.now() - pendingStartedAt < 10 * 60 * 1000;

        if (didReturnFromStripe || hasRecentPendingCheckout) {
            setNotice("Verifying your latest billing status...");
            pollStripeEntitlement().catch(() => {
                setNotice("Could not verify billing status. Please refresh access.");
            });
            return;
        }

        if (didCancel) {
            setNotice("Checkout was canceled. Your access is unchanged.");
        }
    }, [pollStripeEntitlement]);

    const handleStripeSubscribe = async () => {
        if (!accessToken) return Alert.alert("Login Required", "Please sign in to upgrade.");
        setActionLoading(true);
        try {
            await startStripeCheckout(accessToken);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Could not initiate checkout.";
            Alert.alert("Error", message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleManageBilling = async () => {
        if (!accessToken) return Alert.alert("Login Required", "Please sign in to manage billing.");
        setActionLoading(true);
        try {
            if (subscriptionSource === "workspace") {
                await refreshSubscription(true);
                return;
            }

            await startStripePortal(accessToken);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Could not open billing portal.";
            Alert.alert("Error", message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRefreshAccess = async () => {
        setActionLoading(true);
        try {
            const status = await refreshAccessStatus();
            setNotice(describeEntitlement(status));
        } catch (e) {
            const message = e instanceof Error ? e.message : "Could not refresh access.";
            Alert.alert("Error", message);
        } finally {
            setActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.preHeading}>UPGRADE YOUR EXPERIENCE</Text>
                <Text style={styles.mainHeading}>Health Age <Text style={styles.blue}>Pro</Text></Text>
                <Text style={styles.subHeading}>Unlock clinical-grade insights and unlimited health assessments.</Text>
            </View>

            <View style={[styles.grid, isDesktop ? styles.row : styles.column]}>

                {/* Left Column: Benefits (The "Why") */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Pro Features</Text>
                    <View style={styles.featureRow}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.featureText}>Unlimited Daily Assessments</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.featureText}>Detailed Biomarker Analysis</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.featureText}>PDF Report Exports</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.featureText}>Priority Support</Text>
                    </View>
                </View>

                {/* Middle Column: Subscription (The "Action") */}
                <View style={[styles.card, styles.highlightCard]}>
                    <View style={styles.bestValueTag}><Text style={styles.tagText}>POPULAR</Text></View>
                    <Text style={styles.cardTitle}>Annual Plan</Text>
                    <Text style={styles.price}>$49<Text style={styles.period}>/year</Text></Text>
                    {notice ? (
                        <View style={styles.noticeBox}>
                            <Text style={styles.noticeText}>{notice}</Text>
                        </View>
                    ) : null}

                    {isSubscribed ? (
                        <View style={styles.activeContainer}>
                            <Text style={styles.activeText}>
                                {subscriptionSource === "workspace"
                                    ? "Workspace access is active"
                                    : "Your subscription is active"}
                            </Text>
                            <Text style={styles.statusText}>
                                Source: {subscriptionSource}
                                {providerStatus ? ` • Status: ${providerStatus}` : ""}
                                {expiryDate ? ` • Until ${expiryDate.toLocaleDateString()}` : ""}
                                {!autoRenewing && expiryDate ? " • Ends this period" : ""}
                            </Text>
                            {workspace ? (
                                <Text style={styles.workspaceText}>
                                    {workspace.name} • {workspace.role} • {workspace.memberStatus}
                                </Text>
                            ) : null}
                            <Button
                                title={subscriptionSource === "workspace" ? "Refresh Access" : "Manage Billing"}
                                onPress={handleManageBilling}
                                style={styles.manageBtn}
                                disabled={actionLoading}
                            />
                        </View>
                    ) : isPollingStripe ? (
                        <View style={styles.pendingContainer}>
                            <ActivityIndicator size="small" color="#3B82F6" />
                            <Text style={styles.pendingText}>Confirming payment with Stripe</Text>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={[styles.subscribeBtn, actionLoading ? styles.disabledBtn : null]}
                                onPress={handleStripeSubscribe}
                                disabled={actionLoading}
                            >
                                <Text style={styles.subscribeBtnText}>
                                    {actionLoading ? "Processing..." : "Subscribe with Stripe"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.refreshButton}
                                onPress={handleRefreshAccess}
                                disabled={actionLoading}
                            >
                                <Text style={styles.refreshLink}>Refresh access</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {subscriptionSource === "workspace" ? (
                        <Text style={styles.secureText}>No individual checkout is needed for workspace access.</Text>
                    ) : (
                        <Text style={styles.secureText}>Secure checkout via Stripe</Text>
                    )}
                </View>

            </View>

            {/* Footer Legal */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Web subscriptions are processed by Stripe. Workspace members do not need to purchase an individual web subscription.
                </Text>
                <View style={styles.footerLinks}>
                    <TouchableOpacity onPress={() => openExternalUrl(TERMS_OF_USE_URL)}>
                        <Text style={styles.footerLink}>Terms of Use</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}> • </Text>
                    <TouchableOpacity onPress={() => openExternalUrl(PRIVACY_POLICY_URL)}>
                        <Text style={styles.footerLink}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingVertical: 60, alignItems: "center", paddingHorizontal: 20 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { alignItems: "center", marginBottom: 50 },
    preHeading: { color: "#3B82F6", fontWeight: "800", fontSize: 12, letterSpacing: 1.5 },
    mainHeading: { fontSize: 42, fontWeight: "900", color: "#0F172A", marginTop: 10 },
    blue: { color: "#3B82F6" },
    subHeading: { color: "#64748B", fontSize: 18, marginTop: 12, textAlign: "center", maxWidth: 600 },

    grid: { width: "100%", maxWidth: 1100, gap: 24 },
    row: { flexDirection: "row", alignItems: "stretch" },
    column: { flexDirection: "column" },

    card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 32,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    highlightCard: {
        borderColor: "#3B82F6",
        borderWidth: 2,
        transform: [{ scale: 1.02 }],
    },
    organizationQuestion: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    organizationChevron: { color: "#64748B", fontSize: 12, fontWeight: "800", marginLeft: 10 },
    cardTitle: { fontSize: 20, fontWeight: "700", color: "#0F172A", marginBottom: 20 },
    cardSub: { color: "#64748B", fontSize: 14, marginBottom: 15 },

    featureRow: { flexDirection: "row", marginBottom: 16, alignItems: "center" },
    check: { color: "#10B981", fontWeight: "900", marginRight: 12 },
    featureText: { color: "#475569", fontSize: 15 },

    price: { fontSize: 48, fontWeight: "800", color: "#0F172A" },
    period: { fontSize: 16, color: "#64748B", fontWeight: "400" },

    bestValueTag: {
        position: "absolute",
        top: -12,
        alignSelf: "center",
        backgroundColor: "#3B82F6",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagText: { color: "#FFF", fontSize: 10, fontWeight: "900" },

    subscribeBtn: {
        backgroundColor: "#3B82F6",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 24,
    },
    disabledBtn: { opacity: 0.7 },
    subscribeBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
    noticeBox: {
        backgroundColor: "#EFF6FF",
        borderColor: "#BFDBFE",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 18,
    },
    noticeText: { color: "#1D4ED8", fontSize: 13, fontWeight: "600", textAlign: "center" },

    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: "#0F172A",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 16,
    },
    activateBtn: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    activateBtnText: { color: "#0F172A", fontWeight: "600" },

    manageBtn: { marginTop: 20 },
    activeContainer: { marginTop: 20, alignItems: "center" },
    activeText: { color: "#10B981", fontWeight: "700", fontSize: 14 },
    statusText: { color: "#64748B", fontSize: 12, marginTop: 8, textAlign: "center" },
    workspaceText: { color: "#475569", fontSize: 13, marginTop: 8, textAlign: "center" },
    pendingContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 24,
        minHeight: 86,
    },
    pendingText: { color: "#3B82F6", fontSize: 14, fontWeight: "700" },

    secureText: { fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 16 },
    refreshButton: { alignItems: "center" },
    refreshLink: { color: "#3B82F6", fontSize: 13, textAlign: "center", marginTop: 20, textDecorationLine: "underline" },

    footer: { marginTop: 60, maxWidth: 800 },
    footerText: { textAlign: "center", color: "#94A3B8", fontSize: 12, lineHeight: 18 },
    footerLinks: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 8 },
    footerLink: { color: "#3B82F6", fontSize: 13, fontWeight: "700", textDecorationLine: "underline" },
});

export default PurchaseScreenWeb;
