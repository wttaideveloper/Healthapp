import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SubscriptionProvider } from "./src/context/subScriptionContext";
import { initDatabase } from "./src/components/utils/database";
// base plan id : health-age-yearly-premium-package
const App: React.FC = () => {
  React.useEffect(() => {
    InitializeDb();
  }, []);

  const InitializeDb = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    try {
      await initDatabase();
      // console.log('Database initialized successfully');
    } catch (error) {
      console.error(`Database initialization failed (attempt ${retryCount + 1}):`, error);

      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying database initialization in ${RETRY_DELAY}ms...`);
        setTimeout(() => {
          InitializeDb(retryCount + 1);
        }, RETRY_DELAY);
      } else {
        console.error('Database initialization failed after all retries');
        // Optional: Show user-friendly error or use fallback
      }
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <NavigationContainer>
          <SubscriptionProvider>

            <AppNavigator />
          </SubscriptionProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
