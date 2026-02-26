import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
  Text,
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
  const { t } = useTranslation();
  const { isSubscribed } = useSubscription();
  const { signOut } = useAuth();
  const hasPremium = isSubscribed;

  useFocusEffect(
    React.useCallback(() => {
      getReportCount();
    }, [isSubscribed])
  );

  const getReportCount = async () => {
    const status = await getDailyLimitStatus(Boolean(isSubscribed));
    setCount(status.used);
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
            <Image
              source={icons.HomeScreen}
              style={{ width: 354, height: 354 }}
            ></Image>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {/* <Image
              source={icons.message}
              style={{ width: 64, height: 64 }}
            ></Image> */}
          </View>
        </View>
        {__DEV__ && (
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
        onPress={() => {
          if (hasPremium) {
            navigation.navigate("healthAgeTest");
          } else {
            if (count < FREE_DAILY_TASK_LIMIT) {
              navigation.navigate("healthAgeTest");
            } else {
              console.log(count, "count");
              
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
              return;
            }
          }
          // navigation.navigate("healthAgeTest")
        }}
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
});

export default HomeScreen;
