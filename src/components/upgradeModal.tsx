import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { icons } from "./images";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/authContext";
import { useSubscription } from "../context/subScriptionContext";
import {
  getRevenueCatTargetProductIds,
  getSubscriptionSummaries,
  initIAP,
  isNativeStorePurchaseEnabled,
  restorePurchases,
  syncRevenueCatStatusToBackend,
  logStoreError,
  USER_FACING_SUBSCRIPTION_ERROR,
} from "./utils/purchase";
import { startEnd, useDirection } from "./utils/rtl";

interface upgradeModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  navigationTo: () => void;
}

interface BenefitItem {
  icon: any;
  titleKey: string;
  descKey: string;
}

const BENEFIT_ITEMS: BenefitItem[] = [
  {
    icon: icons.proSymbol,
    titleKey: "unlimitedAssessmentsTitle",
    descKey: "unlimitedAssessmentsDesc",
  },
  {
    icon: icons.history,
    titleKey: "assessmentHistoryTitle",
    descKey: "assessmentHistoryDesc",
  },
  {
    icon: icons.csv,
    titleKey: "csvExportTitle",
    descKey: "csvExportDesc",
  },
  {
    icon: icons.print,
    titleKey: "printHealthReportsTitle",
    descKey: "printHealthReportsDesc",
  },
  {
    icon: icons.blankQuestionnaire,
    titleKey: "printableQuestionnaireTitle",
    descKey: "printableQuestionnaireDesc",
  },
  {
    icon: icons.reportSetting,
    titleKey: "personalizedReportBrandingTitle",
    descKey: "personalizedReportBrandingDesc",
  },
];

const UpgradeModal: React.FC<upgradeModalProps> = ({
  visible,
  onClose,
  navigationTo,
}) => {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const { width, height } = useWindowDimensions();
  const { user, accessToken } = useAuth();
  const { refreshSubscription } = useSubscription();

  const [planPrice, setPlanPrice] = React.useState("$49/year");
  const [planName, setPlanName] = React.useState<string | null>(null);
  const [restoring, setRestoring] = React.useState(false);

  React.useEffect(() => {
    if (!visible || Platform.OS === "web") {
      return;
    }

    const loadPlanSummary = async () => {
      try {
        await initIAP();
        const summaries = await getSubscriptionSummaries();
        const targetProductIds = getRevenueCatTargetProductIds();
        const preferred =
          summaries.find((item) =>
            targetProductIds.includes(item.productIdentifier)
          ) ??
          summaries.find((item) => item.packageType.toUpperCase() === "ANNUAL") ??
          summaries[0];

        if (!preferred) {
          return;
        }

        if (preferred.priceString) {
          setPlanPrice(preferred.priceString);
        }
        if (preferred.title || preferred.description) {
          setPlanName(preferred.title || preferred.description);
        }
      } catch {
        // Keep fallback plan text.
      }
    };

    loadPlanSummary().catch(() => undefined);
  }, [visible]);

  const canRestore =
    Platform.OS !== "web" && isNativeStorePurchaseEnabled();

  const handleRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    try {
      await initIAP();
      const restoredStatus = await restorePurchases();
      if (!restoredStatus?.isValid) {
        Alert.alert(t("noPurchasesFound"), t("noPurchasesFoundDesc"));
        return;
      }

      let syncFailed = false;
      if (accessToken) {
        try {
          await syncRevenueCatStatusToBackend(
            accessToken,
            user?.id ?? null,
            "restore"
          );
        } catch (syncError) {
          logStoreError("restoreModalSync", syncError);
          syncFailed = true;
        }
      }
      await refreshSubscription(true).catch((refreshError) =>
        logStoreError("restoreModalRefresh", refreshError)
      );

      if (syncFailed) {
        // Found in the store but not confirmed by the backend: keep the modal open, no success claim.
        Alert.alert(t("restorePending"), t("restorePendingDesc"));
        return;
      }

      Alert.alert(t("restoreComplete"), t("restoreCompleteDesc"));
      onClose();
    } catch (error) {
      logStoreError("restoreModal", error);
      Alert.alert(t("restoreFailed"), USER_FACING_SUBSCRIPTION_ERROR);
    } finally {
      setRestoring(false);
    }
  };

  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const isCompact = width < 480;
  const isWide = width >= 640;
  const sideMargin = isCompact ? 12 : 24;
  const cardWidth = Math.min(
    width - sideMargin * 2 - insets.left - insets.right,
    720
  );
  const cardMaxHeight = Math.max(
    320,
    Math.min(height * 0.92, height - insets.top - insets.bottom - 24)
  );
  const hPad = isCompact ? 16 : 24;

  const [focusedKey, setFocusedKey] = React.useState<string | null>(null);
  const focusProps = (key: string) =>
    isWeb
      ? {
          onFocus: () => setFocusedKey(key),
          onBlur: () => setFocusedKey((cur) => (cur === key ? null : cur)),
        }
      : {};
  const focusRing = (key: string) =>
    isWeb && focusedKey === key ? (styles.focusRing as any) : null;

  // Lock background page scroll while the modal is open (web only).
  React.useEffect(() => {
    if (!isWeb || !visible || typeof document === "undefined") return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [visible, isWeb]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.modalOverlay,
            {
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 12,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation?.()}>
            <View
              style={[
                styles.modalCard,
                { width: cardWidth, maxHeight: cardMaxHeight },
              ]}
              role="dialog"
              aria-modal
              aria-label={t("unlockHealthAgePremium")}
              accessibilityViewIsModal
            >
              <LinearGradient
                colors={["#0F9AD1", "#2D579D", "#CCA02D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.topAccentBar}
              />

              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={t("closeDialog")}
                style={[
                  styles.closeIconBtn,
                  startEnd({ end: 12 }),
                  focusRing("close"),
                ]}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                {...focusProps("close")}
              >
                <Image source={icons.closeDark} style={styles.closeIcon} />
              </TouchableOpacity>

              {/* A. Header (fixed, so the badge can never be scrolled out or clipped) */}
              <View
                style={[
                  styles.headerSection,
                  { paddingHorizontal: hPad + (isCompact ? 20 : 28) },
                ]}
              >
                <Image
                  source={icons.proVersion}
                  style={isCompact ? styles.badgeSmall : styles.badge}
                  resizeMode="contain"
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                />
                <Text
                  style={[styles.mainTitle, isCompact && styles.mainTitleCompact]}
                  accessibilityRole="header"
                >
                  {t("unlockHealthAgePremium")}
                </Text>
                <Text style={styles.subtitle}>{t("premiumSubtitle")}</Text>
              </View>

              {/* B. Benefits (the only scrolling region) */}
              <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={[
                  styles.scrollContent,
                  { paddingHorizontal: hPad },
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.benefitsContainer}>
                  {BENEFIT_ITEMS.map((item, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.benefitRow,
                        isWide && styles.benefitRowWide,
                      ]}
                    >
                      <View style={styles.benefitIconBox}>
                        <Image
                          source={item.icon}
                          style={styles.benefitIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.benefitTextBox}>
                        <Text style={styles.benefitTitle}>{t(item.titleKey)}</Text>
                        <Text style={styles.benefitDesc}>{t(item.descKey)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* C. Pricing + actions (persistent footer) */}
              <View
                style={[
                  styles.footer,
                  { paddingHorizontal: hPad, paddingBottom: isCompact ? 14 : 18 },
                ]}
              >
                <View style={styles.pricingCard}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceValue}>{planPrice}</Text>
                    <Text style={styles.planDurationText}>
                      {planName || t("annualSubscriptionSub")}
                    </Text>
                  </View>
                  <Text style={styles.autoRenewNotice}>{t("autoRenewTerms")}</Text>
                </View>

                <TouchableOpacity
                  onPress={navigationTo}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  style={[styles.upgradeBtnWrapper, focusRing("upgrade")]}
                  {...focusProps("upgrade")}
                >
                  <LinearGradient
                    colors={["#0F9AD1", "#2D579D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.upgradeGradient}
                  >
                    <Text style={styles.upgradeBtnText}>
                      {t("upgradeToPremium")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.secondaryRow}>
                  <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.65}
                    accessibilityRole="button"
                    style={[styles.secondaryBtn, focusRing("later")]}
                    {...focusProps("later")}
                  >
                    <Text style={styles.maybeLaterText}>{t("maybeLater")}</Text>
                  </TouchableOpacity>

                  {canRestore ? (
                    <TouchableOpacity
                      onPress={handleRestore}
                      disabled={restoring}
                      activeOpacity={0.65}
                      accessibilityRole="button"
                      style={[styles.secondaryBtn, focusRing("restore")]}
                      {...focusProps("restore")}
                    >
                      {restoring ? (
                        <ActivityIndicator size="small" color="#5A6D87" />
                      ) : (
                        <Text style={styles.restoreText}>
                          {t("restorePurchases")}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UpgradeModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(12, 22, 39, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4EAF2",
    overflow: "hidden",
    shadowColor: "#0C1627",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 12,
  },
  topAccentBar: {
    height: 5,
    width: "100%",
  },
  closeIconBtn: {
    position: "absolute",
    top: 14,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 14,
    height: 14,
    tintColor: "#475467",
  },
  focusRing: {
    outlineWidth: 3,
    outlineStyle: "solid",
    outlineColor: "#0F6FD1",
    outlineOffset: 2,
  } as any,
  headerSection: {
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 12,
  },
  badge: {
    width: 76,
    height: 73,
    marginBottom: 8,
  },
  badgeSmall: {
    width: 60,
    height: 58,
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#182A4E",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  mainTitleCompact: {
    fontSize: 19,
  },
  subtitle: {
    fontSize: 13,
    color: "#556579",
    textAlign: "center",
    lineHeight: 18,
  },
  scrollArea: {
    flexShrink: 1,
    flexGrow: 0,
    minHeight: 0,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  benefitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F9FBFE",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E8EEF5",
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  benefitRowWide: {
    width: "50%",
  },
  benefitIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#EDF4FC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9E6F7",
  },
  benefitIcon: {
    width: 20,
    height: 20,
  },
  benefitTextBox: {
    flex: 1,
    minWidth: 0,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F3860",
    marginBottom: 1,
  },
  benefitDesc: {
    fontSize: 12,
    color: "#566478",
    lineHeight: 16,
  },
  footer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E8EEF5",
    backgroundColor: "#FFFFFF",
  },
  pricingCard: {
    backgroundColor: "#FFFDF7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0DFAD",
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    columnGap: 10,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1B3158",
    letterSpacing: -0.5,
  },
  planDurationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475467",
  },
  autoRenewNotice: {
    fontSize: 12,
    color: "#5B6B82",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 4,
  },
  upgradeBtnWrapper: {
    width: "100%",
    borderRadius: 999,
    shadowColor: "#0F9AD1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  upgradeGradient: {
    minHeight: 48,
    borderRadius: 999,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  secondaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
    marginTop: 6,
  },
  secondaryBtn: {
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  maybeLaterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5A70",
  },
  restoreText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#2D579D",
    textDecorationLine: "underline",
  },
});
