import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SubscriptionProvider } from "./src/context/subScriptionContext";
import { AuthProvider } from "./src/context/authContext";
import { initDatabase } from "./src/components/utils/database";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";

const App: React.FC = () => {
  useEffect(() => {
    InitializeDb();
    initializeRevenueCat();
  }, []);

  const InitializeDb = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    try {
      await initDatabase();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error(`Database initialization failed (attempt ${retryCount + 1}):`, error);

      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying database initialization in ${RETRY_DELAY}ms...`);
        setTimeout(() => {
          InitializeDb(retryCount + 1);
        }, RETRY_DELAY);
      } else {
        console.error('Database initialization failed after all retries');
      }
    }
  };

  const initializeRevenueCat = async () => {
    try {
      // Set log level for debugging
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

      const iosApiKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY;
      const androidApiKey = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY;

      const apiKey = Platform.OS === 'ios'
        ? iosApiKey
        : androidApiKey;

      if (!apiKey) {
        console.warn(`RevenueCat API key is missing for ${Platform.OS}. Skipping Purchases.configure.`);
        return;
      }

      if (!__DEV__ && apiKey.startsWith("test_")) {
        console.warn("RevenueCat is using a test API key in non-dev build.");
      }

      await Purchases.configure({ apiKey });

      console.log('✅ RevenueCat configured successfully');

      // Check initial subscription status
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('Initial customer info:', customerInfo.entitlements.active);
      console.log('Does customer have active subscription?', Object.keys(customerInfo.entitlements.active).length > 0);
    } catch (error) {
      console.error('❌ Error configuring RevenueCat:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <AuthProvider>
          <SubscriptionProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SubscriptionProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
