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
        id={undefined}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? icons.homeLogo : icons.homeLogo;
            } else if (route.name === "Purchase") {
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
          headerTitle: () => null,
          headerRight: () => null,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: t("home") }}
        />
        <Tab.Screen
          name="Purchase"
          component={PurchaseScreen}
          options={{ tabBarLabel: t("purchase") }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ tabBarLabel: t("history") }}
          listeners={({ navigation: tabNavigation }) => ({
            tabPress: (e) => {
              if (hasPremium) {
                tabNavigation.navigate("History");
              } else {
                (e as any).preventDefault?.();
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
          navigation.navigate("Purchase");
        }}
      />
    </>
  );
};

export default BottomTabNavigator;
