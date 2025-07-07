import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PurchaseScreen from '../screens/PurchaseScreen';
import { Image, TouchableOpacity, View } from 'react-native';
import { icons } from '../components/images';
import HistoryScreen from '../screens/HistoryScreen';
import { useTranslation } from 'react-i18next';
import { verifySubscriptionStatus } from '../components/utils/purchase';
import UpgradeModal from '../components/upgradeModal';
import { useSubscription } from '../context/subScriptionContext';
import { initDatabase } from '../components/utils/database';

export type BottomTabParamList = {
  Home: undefined;
  Purchase: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC<{ navigation: any }> = ({navigation}) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = React.useState(false);
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const { isSubscribed, autoRenewing, refreshSubscription } = useSubscription();

  React.useEffect(()=>{
    SubscriptionCheck();
  })
  const SubscriptionCheck = () => {
  
    if (isSubscribed && autoRenewing) {
    setIsValid(true);
    } else if (isSubscribed && !autoRenewing) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // setIsValid(true); // change back to dynamic
  };
  return (
    <>
    
    <Tab.Navigator 
    screenOptions={({ route }) => {
      const isHomeScreen = route.name === "Home";

      return {
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === t("home")) {
            iconName = focused ? icons.homeLogo : icons.homeLogo;
          } else if (route.name === t("purchase")) {
            iconName = focused ? icons.purchase : icons.purchase ;
          } else if (route.name === t("history")) {
            iconName = focused ? icons.history : icons.history;
          }
          return <Image source={iconName} style={{width:18,height:18}}  />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        
        tabBarStyle: {
          backgroundColor: "#ffffff",
          paddingBottom: 5,
          height: 60,
        },
        headerTransparent: true, // Transparent header for Home
        // headerStyle: !isHomeScreen
        //   ? {
        //       backgroundColor: "white",
        //       elevation: 0, // Remove Android shadow
        //       shadowOpacity: 0, // Remove iOS shadow
        //       borderBottomWidth: 0,
        //     }
        //   : {}, // Blue header for other screens
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#ffffff",
        },
        headerTitle: () => {
          if (true) {
            return "";
          }
        },
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
        //       <Image source={icons.menu} style={{width:18,height:18}}></Image>
        //   </TouchableOpacity>
        // ),
        headerRight: () =>"",

      };
    }}
    >
      <Tab.Screen name={t("home")} component={HomeScreen} />
      <Tab.Screen name={t("purchase")} component={PurchaseScreen} />
      <Tab.Screen name={t("history")} component={HistoryScreen}  
      listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // Prevent default navigation
              if (isValid) {
                navigation.navigate(t("history"));
              } else {
                setShowModal(true);
              }
            },
          })} />
    </Tab.Navigator>
    <UpgradeModal
            visible={showModal}
            onClose={() => {
              setShowModal(false)
            }}
            navigationTo={() => {setShowModal(false); navigation.navigate(t("purchase"))}}
          ></UpgradeModal>
    </>
  );
};

export default BottomTabNavigator;