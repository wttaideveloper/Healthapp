import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { initDatabase } from "../components/utils/database";
import {
  calculateHealthAge,
  calculatePotentialHealthAge,
  readExcelFile,
} from "../components/utils/readExcel";
import { getTodayReportCount } from "../components/utils/reportService";
import { verifySubscriptionStatus } from "../components/utils/purchase";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../context/subScriptionContext";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, "Main">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {


  const [count, setCount] = React.useState();
  const { t } = useTranslation();



  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const { isSubscribed, autoRenewing, refreshSubscription } = useSubscription();
  const checkSubscription = async () => {
    // const { isValid } = await verifySubscriptionStatus();
    if (isSubscribed && autoRenewing) {
      setIsValid(true);
    } else if (isSubscribed && !autoRenewing) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // setIsValid(isValid);
    // setIsValid(true); // change later to dynamic
    // getReportCount();
  };

  useFocusEffect(
    React.useCallback(() => {
      checkSubscription();
      getReportCount();
    }, [])
  )
  const getReportCount = async () => {
    const ReportCount = await getTodayReportCount();
    console.log(ReportCount, "count");

    setCount(ReportCount);
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


  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {!isValid && (
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
                    text={` ${count || 0}/3`}
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
          console.log(isValid, "isValid");

          if (isValid) {
            navigation.navigate("healthAgeTest");
          } else {
            if (parseInt(count) < 3) {
              navigation.navigate("healthAgeTest");
            } else {
              console.log(count, "count");
              
              Alert.alert(
                `${t("dailyLimit")} : ${count || 0}/3`,
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
});

export default HomeScreen;
