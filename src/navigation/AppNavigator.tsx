import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeLanguage from "../screens/ChangesLanguage";
import IntroScreen1 from "../screens/IntroScreen1";
import IntroScreen2 from "../screens/IntroScreen2";
import IntroScreen3 from "../screens/IntroScreen3";
import LanguageScreen from "../screens/LanguageScreen";
import DrawerNavigator from "./DrawerNavigator";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import { useAuth } from "../context/authContext";

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerifyEmail: { email?: string } | undefined;
  InitialScreen: undefined;
  ChangeLanguage: undefined;
};

const Stack = createStackNavigator<RootStackParamList, "RootStack">();
const ONBOARDING_COMPLETED_KEY = "onboarding_completed";
const LANGUAGE_KEY = "language";

type StartupState = {
  loaded: boolean;
  hasLanguage: boolean;
  onboardingCompleted: boolean;
};

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isHydrated } = useAuth();
  const [startupState, setStartupState] = React.useState<StartupState>({
    loaded: false,
    hasLanguage: false,
    onboardingCompleted: false,
  });

  React.useEffect(() => {
    const resolveInitialRoute = async () => {
      try {
        const [language, onboardingCompleted] = await Promise.all([
          AsyncStorage.getItem(LANGUAGE_KEY),
          AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY),
        ]);

        setStartupState({
          loaded: true,
          hasLanguage: Boolean(language),
          onboardingCompleted: onboardingCompleted === "true",
        });
      } catch (error) {
        console.error("Failed to resolve initial route:", error);
        setStartupState({
          loaded: true,
          hasLanguage: false,
          onboardingCompleted: false,
        });
      }
    };

    resolveInitialRoute();
  }, [isAuthenticated]);

  if (!startupState.loaded || !isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10, color: "#475569" }}>Loading...</Text>
      </View>
    );
  }

  const phase = !startupState.hasLanguage
    ? "language"
    : !startupState.onboardingCompleted
      ? "onboarding"
      : !isAuthenticated
        ? "auth"
        : "app";

  const initialRouteName: keyof RootStackParamList =
    phase === "language"
      ? "Language"
      : phase === "onboarding"
        ? "Intro1"
        : phase === "auth"
          ? "SignIn"
          : "InitialScreen";

  return (
    <Stack.Navigator
      id="RootStack"
      key={phase}
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      {phase === "language" ? (
        <>
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Intro1" component={IntroScreen1} />
          <Stack.Screen name="Intro2" component={IntroScreen2} />
          <Stack.Screen name="Intro3" component={IntroScreen3} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        </>
      ) : null}

      {phase === "onboarding" ? (
        <>
          <Stack.Screen name="Intro1" component={IntroScreen1} />
          <Stack.Screen name="Intro2" component={IntroScreen2} />
          <Stack.Screen name="Intro3" component={IntroScreen3} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        </>
      ) : null}

      {phase === "auth" ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        </>
      ) : null}

      {phase === "app" ? (
        <>
          <Stack.Screen name="InitialScreen" component={DrawerNavigator} />
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default AppNavigator;
