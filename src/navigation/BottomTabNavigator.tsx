import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/HomeScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { icons } from "../components/images";
import UpgradeModal from "../components/upgradeModal";
import { useSubscription } from "../context/subScriptionContext";

export type BottomTabParamList = {
  Home: undefined;
  Purchase: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const { isSubscribed } = useSubscription();
  const hasPremium = isSubscribed;

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === t("home")) {
              iconName = focused ? icons.homeLogo : icons.homeLogo;
            } else if (route.name === t("purchase")) {
              iconName = focused ? icons.purchase : icons.purchase;
            } else {
              iconName = focused ? icons.history : icons.history;
            }
            return <Image source={iconName} style={{ width: 18, height: 18 }} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            paddingBottom: 5,
            height: 60,
          },
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#ffffff",
          },
          headerTitle: () => "",
          headerRight: () => "",
        })}
      >
        <Tab.Screen name={t("home")} component={HomeScreen} />
        <Tab.Screen name={t("purchase")} component={PurchaseScreen} />
        <Tab.Screen
          name={t("history")}
          component={HistoryScreen}
          listeners={({ navigation: tabNavigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (hasPremium) {
                tabNavigation.navigate(t("history"));
              } else {
                setShowModal(true);
              }
            },
          })}
        />
      </Tab.Navigator>
      <UpgradeModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        navigationTo={() => {
          setShowModal(false);
          navigation.navigate(t("purchase"));
        }}
      />
    </>
  );
};

export default BottomTabNavigator;
