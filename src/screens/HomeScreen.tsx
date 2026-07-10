import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
  Text,
  Platform,
  useWindowDimensions,
} from "react-native";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../context/subScriptionContext";
import {
  FREE_DAILY_TASK_LIMIT,
  getDailyLimitStatus,
} from "../components/utils/usageLimit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/authContext";
import i18n from "../components/i18n";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, "Main">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [count, setCount] = React.useState<number>(0);
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const { isSubscribed } = useSubscription();
  const { signOut } = useAuth();
  const hasPremium = isSubscribed;
  const isWebDesktop = width >= 760;

  useFocusEffect(
    React.useCallback(() => {
      getReportCount();
    }, [isSubscribed])
  );

  const getReportCount = async () => {
    try {
      const status = await getDailyLimitStatus(Boolean(isSubscribed));
      setCount(status.used);
    } catch (error) {
      console.warn("Failed to load daily report count:", error);
      setCount(0);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(t("exitApp"), t("appExitConfirmation"), [
          {
            text: t("Hs_Cancel"),
            onPress: () => null,
            style: "cancel",
          },
          {
            text: t("Fs_Close"),
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true; // Prevent default behavior (going back)
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove(); // Cleanup
    }, [])
  );

  const navigateToRootLanguage = () => {
    let parentNavigator: any = navigation;
    while (parentNavigator?.getParent?.()) {
      parentNavigator = parentNavigator.getParent();
    }

    parentNavigator?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Language" }],
      })
    );
  };

  const handleDevResetAppData = () => {
    Alert.alert("Reset app data", "This will clear local app data and restart onboarding.", [
      { text: t("Hs_Cancel"), style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            await AsyncStorage.clear();
            await i18n.changeLanguage("en");
            navigateToRootLanguage();
          } catch (error) {
            console.error("Failed to reset app data:", error);
            Alert.alert("Error", "Unable to reset app data.");
          }
        },
      },
    ]);
  };

  const onStartAssessment = () => {
    if (hasPremium) {
      navigation.navigate("healthAgeTest");
      return;
    }

    if (count < FREE_DAILY_TASK_LIMIT) {
      navigation.navigate("healthAgeTest");
      return;
    }

    Alert.alert(
      `${t("dailyLimit")} : ${count}/${FREE_DAILY_TASK_LIMIT}`,
      t("JoinPro"),
      [
        { text: t("Hs_Cancel"), style: "cancel" },
        {
          text: t("purchase"),
          onPress: () => navigation.navigate("Purchase"),
        },
      ],
      { cancelable: true }
    );
  };

  if (isWebDesktop) {
    return (
      <LinearGradient
        colors={[
          "rgba(218,235,246,1)",
          "rgba(255,255,255,1)",
          "rgba(255,255,255,1)",
          "rgba(255,255,255,1)",
          "rgba(194,233,248,1)",
        ]}
        locations={[0, 0.34, 0.56, 0.76, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.webContainer}
      >
        <View style={styles.webHero}>
          {!hasPremium ? (
            <View style={styles.webLimitPillOuter}>
              <View style={styles.webLimitPillInner}>
                <Image source={icons.freeLimit} style={styles.webLimitLogo} />
                <Text style={styles.webLimitText}>
                  Daily limit {count}/{FREE_DAILY_TASK_LIMIT}
                </Text>
              </View>
            </View>
          ) : (
            <View />
          )}

          <Text style={styles.webHeadline}>{t("helpCalculateHealthAge")}</Text>

          <View style={styles.webCtaRow}>
            <TouchableOpacity onPress={onStartAssessment} activeOpacity={0.88} style={styles.webCtaBtn}>
              <LinearGradient
                colors={["#18A9E6", "#2B57A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.webCtaGradient}
              >
                <Text style={styles.webCtaText}>{t("startAssessment")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.webImageWrap}>
            <Image source={require("../../assets/images/bg-hero.png")} style={styles.webImage} />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {!hasPremium && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <LinearGradient
              colors={["#F3E7DA", "#E8D4C4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 2, // Border thickness
                borderRadius: 999999,
                marginRight: 14,
                width: "50%",
              }}
            >
              {/* <Image
                  source={require("../../assets/images/icon.png")}
                  style={{ width: 50, height: 50, borderRadius: 999999 }}
                ></Image> */}
              <View
                style={{
                  borderRadius: 999999,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                  gap: 6,
                  paddingHorizontal: 13,
                }}
              >
                <Image
                  source={icons.freeLimit}
                  style={{ width: 46, height: 18 }}
                ></Image>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Font
                    text="dailyLimit"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "#955324",
                    }}
                  ></Font>
                  <Font
                    text={` ${count}/${FREE_DAILY_TASK_LIMIT}`}
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "#955324",
                    }}
                  ></Font>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}
        <View>
          <Font
            text="helpCalculateHealthAge"
            style={{ fontWeight: "400", fontSize: 24, marginVertical: 10 }}
          ></Font>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../../assets/images/bg-hero.png")} style={styles.mobileHeroImage} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {/* <Image
              source={icons.message}
              style={{ width: 64, height: 64 }}
            ></Image> */}
          </View>
        </View>
        {__DEV__ && Platform.OS !== "web" && (
          <TouchableOpacity style={styles.devResetButton} onPress={handleDevResetAppData}>
            <Text style={styles.devResetText}>Reset App Data (DEV)</Text>
          </TouchableOpacity>
        )}
      </View>
      <Button
        type="intro"
        style={{
          // backgroundColor:"black",
          padding: 10,
          // marginTop: 40,
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
        title="startAssessment"
        onPress={onStartAssessment}
      ></Button>
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
  },
  welcomeText: {
    fontSize: 24,
    color: "blue",
  },
  subText: {
    fontSize: 18,
    color: "gray",
  },
  devResetButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    backgroundColor: "#fff5f5",
  },
  devResetText: {
    color: "#b91c1c",
    fontSize: 12,
    fontWeight: "600",
  },
  webContainer: {
    flex: 1,
    paddingTop: 44,
    paddingBottom: 46,
    paddingHorizontal: 24,
  },
  webHero: {
    flex: 1,
    maxWidth: 1110,
    width: "100%",
    alignSelf: "center",
  },
  webLimitPillOuter: {
    alignSelf: "flex-end",
    borderRadius: 999,
    padding: 1,
    backgroundColor: "#F0D6BA",
    marginBottom: 20,
  },
  webLimitPillInner: {
    borderRadius: 999,
    backgroundColor: "#F9E4D0",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  webLimitLogo: {
    width: 46,
    height: 18,
  },
  webLimitText: {
    color: "#8E562A",
    fontSize: 28 / 2,
    fontWeight: "700",
  },
  webHeadline: {
    color: "#20497F",
    fontSize: 60,
    fontWeight: "700",
    lineHeight: 72,
    maxWidth: 580,
    marginBottom: 18,
  },
  webImageWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  webImage: {
    width: 560,
    height: 420,
    resizeMode: "contain",
  },
  webCtaRow: {
    marginTop: 4,
    marginBottom: 18,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  webCtaBtn: {
    width: "100%",
    maxWidth: 560,
    borderRadius: 999,
    overflow: "hidden",
  },
  webCtaGradient: {
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  webCtaText: {
    color: "#FFFFFF",
    fontSize: 36 / 2,
    fontWeight: "600",
  },
  mobileHeroImage: {
    width: 320,
    height: 270,
    resizeMode: "contain",
    marginTop: 8,
  },
});

export default HomeScreen;
