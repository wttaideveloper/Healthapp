import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/PurchaseScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { CustomDrawerContent } from "../components/CustomDrawer";
import { Image, TouchableOpacity, View } from "react-native";
import { icons } from "../components/images";
import PurchaseScreen from "../screens/PurchaseScreen";
import { LinearGradient } from "expo-linear-gradient";
import Font from "../components/CustomisedFont";
import HealthAgeTest from "../screens/healthAgeTest";
import questions from "../screens/QuestionsScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ReportScreen from "../screens/ReportScreen";
import InterestScreen from "../screens/InterestScreen";
import ReportSettings from "../screens/ReportSettings";
import PrintScreen from "../screens/PrintScreen";
import GroupDetailsScreen from "../screens/GroupDetailsScreen";
import FilterScreen from "../screens/FilterScreen";
import { useSubscription } from "../context/subScriptionContext";
import AboutAppScreen from "../screens/AboutAppScreen";

export type DrawerParamList = {
  Main: undefined;
  Profile: undefined;
  Settings: undefined;
  Purchase: undefined;
  healthAgeTest: undefined;
  HistoryScreen: undefined;
  ReportSettings: undefined;
  AboutAppScreen: undefined;
  GroupDetailsScreen: {
    groupName: string;
    groupId: number;
  };
  PrintScreen: {
    screen: string;
  };
  QuestionsScreen: {
    name?: string;
    height?: string;
    age?: string;
    gender?: string;
    weight?: string;
    bloodGlucose?: string;
    bloodPressure?: string;
    fasting?: boolean;
    selectedHeightUnit: string;
    selectedWeightUnit: string;
    heightValue: string;
    weightValue: string;
    bloodPressureSys: string;
    bloodPressureDia: string;
    bloodGlucose_mg: string;
    bloodGlucose_mmol: string;
    selectedGlucoseUnit: string;
    blood_glucose_mmol_points: string;

  };
  InterestScreen: {
    totalScore: number;
    answers: { questionId: number; text: string; points: number }[];
    reportData: {
      name?: string;
      height?: string;
      age?: string;
      gender?: string;
      weight?: string;
      heightValue: string;
      weightValue: string;
      bloodGlucose?: string;
      bloodPressure?: string;
      fasting?: boolean;
      bloodPressureSys: string;
      bloodPressureDia: string;
      bloodGlucose_mg: string;
      bloodGlucose_mmol: string;
      selectedGlucoseUnit: string;
      blood_glucose_mmol_points: string;
      selectedWeightUnit: string;
      selectedHeightUnit:string;
    };
  };
  FilterScreen: undefined;
  ReportScreen: {
    age: string;
    answers: { questionId: number; text: string; points: number }[];
    reportData: {
      name?: string;
      height?: string;
      age?: string;
      gender?: string;
      weight?: string;
      heightValue: string;
      weightValue: string;
      bloodGlucose?: string;
      bloodPressure?: string;
      fasting?: boolean;
      healthAge?: any;
      potentialAge?: any;
      bloodPressureSys: string;
      bloodPressureDia: string;
      bloodGlucose_mg: string;
      bloodGlucose_mmol: string;
      selectedGlucoseUnit: string;
      blood_glucose_mmol_points: string;
      selectedWeightUnit: string;
      selectedHeightUnit:string;
    };
  };
};
export type StackParamList = {
  Drawer: undefined;
  Profile: undefined;
  Settings: undefined;
  AboutAppScreen: undefined;
  Purchase: undefined;
  healthAgeTest: undefined;
  ReportSettings: undefined;
  HistoryScreen: undefined;
  PrintScreen: {
    screen: string;
  };
  GroupDetailsScreen: {
    groupName: string;
    groupId: number;
  };
  FilterScreen: undefined;
  QuestionsScreen: {
    name?: string;
    height?: string;
    age?: string;
    gender?: string;
    weight?: string;
    bloodGlucose?: string;
    bloodPressure?: string;
    fasting?: boolean;
    selectedHeightUnit: string;
    selectedWeightUnit: string;
    heightValue: string;
    weightValue: string;
  };
  InterestScreen: {
    totalScore: number;
    answers: { questionId: number; text: string; points: number }[];
    reportData: {
      name: string;
      height: string;
      age: string;
      heightValue: string;
      weightValue: string;
      gender: string;
      weight: string;
      bloodGlucose: string;
      bloodPressure: string;
      fasting: boolean;
    };
  };
  ReportScreen: {
    age: string;
    answers: { questionId: number; text: string; points: number }[];
    reportData: {
      name: string;
      height: string;
      age: string;
      gender: string;
      weight: string;
      heightValue: string;
      weightValue: string;
      bloodGlucose: string;
      bloodPressure: string;
      fasting: boolean;
      healthAge?: any;
      bloodPressureSys: string;
      bloodPressureDia: string;
      bloodGlucose_mg: string;
      bloodGlucose_mmol: string;
      selectedGlucoseUnit: string;
      selectedWeightUnit: string;
      selectedHeightUnit:string;
      blood_glucose_mmol_points: string;
      potentialAge?: any;
    };
  };
};
const HeaderRight = ({ navigation }) => {
  const { isSubscribed } = useSubscription();

  return isSubscribed ? null : (
    <TouchableOpacity onPress={() => navigation.navigate("Purchase")}>
          <LinearGradient
            colors={["#FDE182", "#F6F3EC", "#CCA02D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 2, // Border thickness
              borderRadius: 999999,
              marginRight: 14,
            }}
          >
            {/* <Image
      source={require("../../assets/images/icon.png")}
      style={{ width: 50, height: 50, borderRadius: 999999 }}
    ></Image> */}
            <View
              style={{
                borderRadius: 999999,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 4,
                paddingHorizontal: 13,
              }}
            >
              <Font
                text={"UPGRADE TO"}
                style={{
                  fontSize: 8,
                  color: "#A07400",
                  fontWeight: "600",
                }}
              />
              <Image
                source={icons.proSymbol}
                style={{ width: 40, height: 18 }}
              ></Image>
            </View>
          </LinearGradient>
    </TouchableOpacity>
  );
};
const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerScreens: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Main"
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          header: () => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image
                    source={icons.menu}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                </TouchableOpacity>
                <Image
                  source={icons.menuLogo}
                  style={{ width: 111, height: 35 }}
                ></Image>
              </View>

              <HeaderRight navigation={navigation} />
            </View>
          ),
          headerTitle: () => "",
          // headerLeft: () => (
          // <View
          //   style={{
          //     flexDirection: "row",
          //     gap: 8,
          //     justifyContent: "center",
          //     alignItems: "center",
          //     marginHorizontal: 20,
          //   }}
          // >
          //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
          //     <Image
          //       source={icons.menu}
          //       style={{ width: 32, height: 32 }}
          //     ></Image>
          //   </TouchableOpacity>
          //   <Image
          //     source={icons.menuLogo}
          //     style={{ width: 111, height: 35 }}
          //   ></Image>
          // </View>
          // ),
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate("Purchase")}>
          //     <LinearGradient
          //       colors={["#FDE182", "#F6F3EC", "#CCA02D"]}
          //       start={{ x: 0, y: 0 }}
          //       end={{ x: 1, y: 1 }}
          //       style={{
          //         padding: 2, // Border thickness
          //         borderRadius: 999999,
          //         marginRight: 14,
          //       }}
          //     >
          //       {/* <Image
          //         source={require("../../assets/images/icon.png")}
          //         style={{ width: 50, height: 50, borderRadius: 999999 }}
          //       ></Image> */}
          //       <View
          //         style={{
          //           borderRadius: 999999,
          //           flexDirection: "column",
          //           justifyContent: "center",
          //           alignItems: "center",
          //           backgroundColor: "white",
          //           padding: 4,
          //           paddingHorizontal: 13,
          //         }}
          //       >
          //         <Font
          //           text={"UPGRADE TO"}
          //           style={{
          //             fontSize: 8,
          //             color: "#A07400",
          //             fontWeight: "600",
          //           }}
          //         />
          //         <Image
          //           source={icons.proSymbol}
          //           style={{ width: 40, height: 18 }}
          //         ></Image>
          //       </View>
          //     </LinearGradient>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={icons.menu}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </TouchableOpacity>
              <Image
                source={icons.menuLogo}
                style={{ width: 111, height: 35 }}
              ></Image>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="Purchase"
        component={PurchaseScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={icons.menu}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </TouchableOpacity>
              <Image
                source={icons.menuLogo}
                style={{ width: 111, height: 35 }}
              ></Image>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={icons.menu}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </TouchableOpacity>
              <Image
                source={icons.menuLogo}
                style={{ width: 111, height: 35 }}
              ></Image>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="GroupDetailsScreen"
        component={GroupDetailsScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={icons.menu}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </TouchableOpacity>
              <Image
                source={icons.menuLogo}
                style={{ width: 111, height: 35 }}
              ></Image>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="healthAgeTest"
        component={HealthAgeTest}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="QuestionsScreen"
        component={QuestionsScreen}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="InterestScreen"
        component={InterestScreen}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="ReportSettings"
        component={ReportSettings}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="AboutAppScreen"
        component={AboutAppScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "white",
            elevation: 1, // Remove Android shadow
            shadowOpacity: 1, // Remove iOS shadow
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          header: () => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity style={{padding:10}} onPress={() => navigation.goBack()}>
                  <Image source={icons.Arrow} style={{ width: 10, height: 16 }}></Image>
                </TouchableOpacity>
                <Font onPress={() => navigation.goBack()} text={"aboutTheAppTitle"} style={{ fontSize: 16 ,fontWeight: 600,padding:10 }} />
              </View>

              <HeaderRight navigation={navigation} />
            </View>
          ),
          headerTitle: () => "",

        })}
      />
      <Drawer.Screen
        name="PrintScreen"
        component={PrintScreen}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
      <Drawer.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={({ navigation }) => ({
          header: () => "",
          headerTitleAlign: "center",
          headerTitle: () => "",
          headerLeft: () => "",
          headerRight: () => "",
        })}
      />
    </Drawer.Navigator>
  );
};
const DrawerNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerScreens} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="healthAgeTest" component={HealthAgeTest} />
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="GroupDetailsScreen" component={GroupDetailsScreen} />
      <Stack.Screen name="PrintScreen" component={PrintScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;
