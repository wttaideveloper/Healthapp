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
} from "../components/utils/purchase";
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "../components/utils/legal";

const PurchaseScreenWeb: React.FC = () => {
    const { width } = useWindowDimensions();
    const { isSubscribed, subscriptionSource, workspace, refreshSubscription } = useSubscription();
    const { accessToken } = useAuth();

    const [actionLoading, setActionLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isDesktop = width > 900;
    const openExternalUrl = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert("Unable to open link", url);
        }
    };

    useEffect(() => {
        const init = async () => {
            await refreshSubscription(true);
            setIsLoading(false);
        };
        init();
    }, []);

    const handleStripeSubscribe = async () => {
        if (!accessToken) return Alert.alert("Login Required", "Please sign in to upgrade.");
        setActionLoading(true);
        try {
            await startStripeCheckout(accessToken);
        } catch (e) {
            Alert.alert("Error", "Could not initiate checkout.");
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

                    {isSubscribed ? (
                        <View style={styles.activeContainer}>
                            <Text style={styles.activeText}>
                                {subscriptionSource === "workspace"
                                    ? "Workspace access is active"
                                    : "Your subscription is active"}
                            </Text>
                            {workspace ? (
                                <Text style={styles.workspaceText}>
                                    {workspace.name} • {workspace.role} • {workspace.memberStatus}
                                </Text>
                            ) : null}
                            <Button
                                title={subscriptionSource === "workspace" ? "Refresh Access" : "Manage Billing"}
                                onPress={() => {
                                    if (subscriptionSource === "workspace") {
                                        refreshSubscription(true);
                                        return;
                                    }
                                    startStripePortal(accessToken!);
                                }}
                                style={styles.manageBtn}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.subscribeBtn}
                            onPress={handleStripeSubscribe}
                            disabled={actionLoading}
                        >
                            <Text style={styles.subscribeBtnText}>
                                {actionLoading ? "Processing..." : "Subscribe Now"}
                            </Text>
                        </TouchableOpacity>
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
    subscribeBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },

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
    workspaceText: { color: "#475569", fontSize: 13, marginTop: 8, textAlign: "center" },

    secureText: { fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 16 },
    refreshLink: { color: "#3B82F6", fontSize: 13, textAlign: "center", marginTop: 20, textDecorationLine: "underline" },

    footer: { marginTop: 60, maxWidth: 800 },
    footerText: { textAlign: "center", color: "#94A3B8", fontSize: 12, lineHeight: 18 },
    footerLinks: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 8 },
    footerLink: { color: "#3B82F6", fontSize: 13, fontWeight: "700", textDecorationLine: "underline" },
});

export default PurchaseScreenWeb;
