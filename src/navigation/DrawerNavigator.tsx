import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/PurchaseScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { CustomDrawerContent } from "../components/CustomDrawer";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
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
import HomeScreen from "../screens/HomeScreen";
import UpgradeModal from "../components/upgradeModal";
import { useAuth } from "../context/authContext";
import i18n from "../components/i18n";
import CheckoutResultScreen from "../screens/CheckoutResultScreen";
import { clearCachedSubscriptionStatus } from "../components/utils/purchase";

export type DrawerParamList = {
  Main: undefined;
  success: undefined;
  cancel: undefined;
  Profile: undefined;
  Settings: undefined;
  Purchase: undefined;
  healthAgeTest:
    | {
        resumeFromQuestions?: boolean;
        resumeStep?: number;
        prefill?: {
          name?: string;
          age?: string;
          gender?: string;
          selectedHeightUnit?: string;
          selectedWeightUnit?: string;
          selectedGlucoseUnit?: string;
          fasting?: boolean;
          heightValue?: string;
          weightValue?: string;
          bloodPressureSys?: string;
          bloodPressureDia?: string;
          bloodGlucose_mg?: string;
          bloodGlucose_mmol?: string;
          blood_glucose_mmol_points?: string;
        };
      }
    | undefined;
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
  healthAgeTest:
    | {
        resumeFromQuestions?: boolean;
        resumeStep?: number;
        prefill?: {
          name?: string;
          age?: string;
          gender?: string;
          selectedHeightUnit?: string;
          selectedWeightUnit?: string;
          selectedGlucoseUnit?: string;
          fasting?: boolean;
          heightValue?: string;
          weightValue?: string;
          bloodPressureSys?: string;
          bloodPressureDia?: string;
          bloodGlucose_mg?: string;
          bloodGlucose_mmol?: string;
          blood_glucose_mmol_points?: string;
        };
      }
    | undefined;
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
    <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: "Purchase" })}>
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
const WebStack = createStackNavigator<DrawerParamList>();
const DEBUG_SUB_OVERRIDE_KEY = "debug_subscription_override";

const WebShellHeader: React.FC<{
  navigation: any;
  hasPremium: boolean;
  onRequireUpgrade: () => void;
}> = ({ navigation, hasPremium, onRequireUpgrade }) => {
  const { user, signOut } = useAuth();
  const initial = (user?.name?.trim()?.[0] ?? user?.email?.trim()?.[0] ?? "A").toUpperCase();
  const [currentLanguage, setCurrentLanguage] = React.useState(
    (i18n.language ?? "en").split("-")[0].toLowerCase()
  );
  const languageCode = currentLanguage;
  const languageLabel =
    languageCode === "en"
      ? "English"
      : languageCode === "hi"
      ? "हिन्दी"
      : languageCode.toUpperCase();

  const [reportsOpen, setReportsOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "es", label: "Español" },
    { code: "ja", label: "日本語" },
    { code: "fr", label: "Français" },
    { code: "zh", label: "中文" },
    { code: "ko", label: "한국어" },
    { code: "ru", label: "Русский" },
    { code: "pt", label: "Português" },
    { code: "de", label: "Deutsch" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "mg", label: "Malagasy" },
    { code: "da", label: "Dansk" },
    { code: "ta", label: "தமிழ்" },
  ];

  const goRoot = (name: string, params?: any) => {
    setReportsOpen(false);
    setLanguageOpen(false);
    navigation.navigate(name, params);
  };

  const goReports = (routeName: "PrintScreen" | "ReportSettings", params?: any) => {
    if (!hasPremium) {
      onRequireUpgrade();
      return;
    }
    goRoot(routeName, params);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      await clearCachedSubscriptionStatus();
      await AsyncStorage.removeItem(DEBUG_SUB_OVERRIDE_KEY);
      const parent = navigation.getParent?.();
      parent?.reset?.({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } catch (error) {
      console.error("Web logout failed:", error);
    }
  };

  const handleSelectLanguage = async (code: string) => {
    try {
      await i18n.changeLanguage(code);
      await AsyncStorage.setItem("language", code);
      setCurrentLanguage(code);
      setLanguageOpen(false);
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  return (
    <View style={webStyles.navbar}>
      <View style={webStyles.navInner}>
        <TouchableOpacity style={webStyles.brand} onPress={() => goRoot("Main")}>
          <Image source={icons.menuLogo} style={webStyles.brandLogo} />
        </TouchableOpacity>

        <View style={webStyles.links}>
          <TouchableOpacity style={webStyles.linkBtn} onPress={() => goRoot("Purchase")}>
            <Text style={webStyles.linkText}>Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={webStyles.linkBtn}
            onPress={() => {
              if (hasPremium) {
                goRoot("HistoryScreen");
              } else {
                onRequireUpgrade();
              }
            }}
          >
            <Text style={webStyles.linkText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={webStyles.linkBtn} onPress={() => goRoot("AboutAppScreen")}>
            <Text style={webStyles.linkText}>About</Text>
          </TouchableOpacity>

          <View style={webStyles.dropdownWrap as any}>
            <TouchableOpacity
              style={webStyles.linkBtn}
              onPress={() => {
                setLanguageOpen(false);
                setReportsOpen((v) => !v);
              }}
            >
              <Text style={webStyles.linkText}>Reports</Text>
              <Text style={webStyles.caret}>▼</Text>
            </TouchableOpacity>
            {reportsOpen ? (
              <View style={webStyles.dropdown as any}>
                <TouchableOpacity
                  style={webStyles.dropdownItem}
                  onPress={() => goReports("PrintScreen", { screen: "Questionnaire" })}
                >
                  <Text style={webStyles.dropdownText}>Print Questionnaire</Text>
                  {!hasPremium ? (
                    <Image source={icons.proSymbol} style={webStyles.proPill} />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={webStyles.dropdownItem}
                  onPress={() => goReports("PrintScreen", { screen: "Report" })}
                >
                  <Text style={webStyles.dropdownText}>Print Report</Text>
                  {!hasPremium ? (
                    <Image source={icons.proSymbol} style={webStyles.proPill} />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={webStyles.dropdownItem}
                  onPress={() => goReports("ReportSettings")}
                >
                  <Text style={webStyles.dropdownText}>Report Settings</Text>
                  {!hasPremium ? (
                    <Image source={icons.proSymbol} style={webStyles.proPill} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <TouchableOpacity style={webStyles.linkBtn} onPress={() => goRoot("Purchase")}>
            <Text style={webStyles.linkText}>Activation Key</Text>
          </TouchableOpacity>
        </View>

        <View style={webStyles.right}>
          <TouchableOpacity style={webStyles.logoutPillBtn} onPress={handleLogout}>
            <Text style={webStyles.logoutPillText}>Logout</Text>
          </TouchableOpacity>
          <View style={webStyles.dropdownWrap as any}>
            <TouchableOpacity
              style={webStyles.langPill}
              onPress={() => {
                setReportsOpen(false);
                setLanguageOpen((v) => !v);
              }}
            >
              <View style={webStyles.avatar}>
                <Text style={webStyles.avatarText}>{initial}</Text>
              </View>
              <Text style={webStyles.langText}>{languageLabel}</Text>
              <Text style={webStyles.caret}>▼</Text>
            </TouchableOpacity>
            {languageOpen ? (
              <View style={[webStyles.dropdown as any, webStyles.languageDropdown]}>
                {languageOptions.map((option) => {
                  const active = option.code === languageCode;
                  return (
                    <TouchableOpacity
                      key={option.code}
                      style={webStyles.dropdownItem}
                      onPress={() => handleSelectLanguage(option.code)}
                    >
                      <Text style={[webStyles.dropdownText, active ? webStyles.dropdownTextActive : null]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {!hasPremium ? (
            <TouchableOpacity style={webStyles.upgradeBtn} onPress={() => goRoot("Purchase")}>
              <Text style={webStyles.upgradeText}>UPGRADE TO</Text>
              <Image source={icons.proSymbol} style={webStyles.upgradeProIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const WebNavigator: React.FC = () => {
  const { isSubscribed } = useSubscription();
  const hasPremium = Boolean(isSubscribed);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const navRef = React.useRef<any>(null);

  const WebPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <View style={webStyles.page}>
        <View style={webStyles.pageInner}>{children}</View>
      </View>
    );
  };
  const WebPageFullBleed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <View style={[webStyles.page, webStyles.pageNoPadding]}>
        <View style={webStyles.pageInnerFluid}>{children}</View>
      </View>
    );
  };

  const wrap =
    <P extends object>(Component: React.ComponentType<P>) =>
    (props: P) =>
      (
        <WebPage>
          <Component {...props} />
        </WebPage>
      );
  const wrapFullBleed =
    <P extends object>(Component: React.ComponentType<P>) =>
    (props: P) =>
      (
        <WebPageFullBleed>
          <Component {...props} />
        </WebPageFullBleed>
      );

  return (
    <>
      <WebStack.Navigator
        id={undefined}
        initialRouteName="Main"
        screenOptions={({ navigation }) => {
          // Capture a navigation instance so UpgradeModal can route to Purchase.
          navRef.current = navigation;
          return {
            header: () => (
              <WebShellHeader
                navigation={navigation}
                hasPremium={hasPremium}
                onRequireUpgrade={() => setShowUpgradeModal(true)}
              />
            ),
            headerShown: true,
            // Ensure the scene has a constrained height so overflow scrolling works on web.
            contentStyle: { flex: 1, minHeight: 0 } as any,
            cardStyle: { backgroundColor: "#F6FBFF", flex: 1 } as any,
          };
        }}
      >
        <WebStack.Screen name="Main" component={wrapFullBleed(HomeScreen as any)} />
        <WebStack.Screen name="success" component={wrap(CheckoutResultScreen as any)} />
        <WebStack.Screen name="cancel" component={wrap(CheckoutResultScreen as any)} />
        <WebStack.Screen name="Purchase" component={wrap(PurchaseScreen as any)} />
        <WebStack.Screen name="HistoryScreen" component={wrap(HistoryScreen as any)} />
        <WebStack.Screen name="AboutAppScreen" component={wrap(AboutAppScreen as any)} />
        <WebStack.Screen name="ReportSettings" component={wrap(ReportSettings as any)} />
        <WebStack.Screen name="PrintScreen" component={wrap(PrintScreen as any)} />
        <WebStack.Screen name="healthAgeTest" component={wrap(HealthAgeTest as any)} />
        <WebStack.Screen name="QuestionsScreen" component={wrap(QuestionsScreen as any)} />
        <WebStack.Screen name="InterestScreen" component={wrap(InterestScreen as any)} />
        <WebStack.Screen name="ReportScreen" component={wrap(ReportScreen as any)} />
        <WebStack.Screen name="GroupDetailsScreen" component={wrap(GroupDetailsScreen as any)} />
        <WebStack.Screen name="FilterScreen" component={wrap(FilterScreen as any)} />
      </WebStack.Navigator>

      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        navigationTo={() => {
          setShowUpgradeModal(false);
          navRef.current?.navigate?.("Purchase");
        }}
      />
    </>
  );
};

const DrawerScreens: React.FC = () => {
  return (
    <Drawer.Navigator
      id={undefined}
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
          headerTitle: () => null,
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
          headerTitle: () => null,
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
          headerTitle: () => null,
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
          headerRight: () => null,
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
          headerTitle: () => null,
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
          headerTitle: () => null,
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
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <Drawer.Screen
        name="QuestionsScreen"
        component={QuestionsScreen}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <Drawer.Screen
        name="InterestScreen"
        component={InterestScreen}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <Drawer.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <Drawer.Screen
        name="ReportSettings"
        component={ReportSettings}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
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
          headerTitle: () => null,

        })}
      />
      <Drawer.Screen
        name="PrintScreen"
        component={PrintScreen}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
      <Drawer.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={({ navigation }) => ({
          header: () => null,
          headerTitleAlign: "center",
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => null,
        })}
      />
    </Drawer.Navigator>
  );
};
const DrawerNavigator: React.FC = () => {
  const { width } = useWindowDimensions();
  const WEB_DESKTOP_MIN_WIDTH = 900;

  // Web desktop gets the top navbar layout. Web narrow (mobile-sized) uses the normal drawer UI.
  if (Platform.OS === "web" && width >= WEB_DESKTOP_MIN_WIDTH) {
    return <WebNavigator />;
  }

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
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

const webStyles = StyleSheet.create({
  navbar: {
    height: 74,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF5",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navInner: {
    width: "100%",
    maxWidth: 1180,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { flexDirection: "row", alignItems: "center" },
  brandLogo: { width: 178, height: 50, resizeMode: "contain" },
  links: { flexDirection: "row", alignItems: "center", gap: 14 },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  linkText: { fontSize: 31 / 2, color: "#121826", fontWeight: "500" },
  caret: { fontSize: 10, color: "#6B7280" },
  right: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoutPillBtn: {
    borderWidth: 1,
    borderColor: "#F3C4C0",
    backgroundColor: "#FFF5F4",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  logoutPillText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "700",
  },
  logoutLinkText: {
    color: "#B42318",
    fontSize: 31 / 2,
    fontWeight: "600",
  },
  langPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE8F4",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "white", fontSize: 12, fontWeight: "700" },
  langText: { color: "#111827", fontSize: 28 / 2, fontWeight: "500" },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E0B44C",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
  },
  upgradeText: { fontSize: 11, color: "#A07400", fontWeight: "700" },
  upgradeProIcon: { width: 48, height: 18, resizeMode: "contain" },
  dropdownWrap: { position: "relative" },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 220,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6EEF6",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 9999,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  dropdownText: { fontSize: 13, color: "#111827", fontWeight: "500" },
  dropdownTextActive: { color: "#0F4FA8", fontWeight: "700" },
  proPill: { width: 48, height: 18, resizeMode: "contain" },
  languageDropdown: {
    width: 190,
    left: "auto",
    right: 0,
    maxHeight: 320,
    overflowY: "auto" as any,
  },
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 0,
    // The web "main content" scroll container (header stays fixed above).
    overflowY: "auto" as any,
    overflowX: "hidden" as any,
    minHeight: 0,
    paddingBottom: 0,
  },
  pageInner: {
    flex: 1,
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    minHeight: 0,
  },
  pageNoPadding: {
    paddingHorizontal: 0,
  },
  pageInnerFluid: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    alignSelf: "stretch",
    minHeight: 0,
  },
} as any);
