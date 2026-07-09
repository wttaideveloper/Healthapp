import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/HomeScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AccountScreen from "../screens/AccountScreen";
import UpgradeModal from "../components/upgradeModal";
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";

export type BottomTabParamList = {
  Home: undefined;
  Purchase: undefined;
  History: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const { isSubscribed } = useSubscription();
  const { isAuthenticated } = useAuth();
  const hasPremium = isSubscribed;

  return (
    <>
      <Tab.Navigator
        id={undefined}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              route.name === "Home"
                ? focused
                  ? "home"
                  : "home-outline"
                : route.name === "Purchase"
                ? focused
                  ? "card"
                  : "card-outline"
                : route.name === "History"
                ? focused
                  ? "time"
                  : "time-outline"
                : focused
                ? "person"
                : "person-outline";

            return <Ionicons name={iconName} size={size ?? 20} color={color} />;
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
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{ tabBarLabel: isAuthenticated ? "Account" : "Login" }}
        />
      </Tab.Navigator>
      <UpgradeModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        navigationTo={() => {
          setShowModal(false);
          const drawerNavigation = navigation.getParent?.() ?? navigation;
          drawerNavigation.navigate("Purchase");
        }}
      />
    </>
  );
};

export default BottomTabNavigator;
