import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SubscriptionProvider } from "./src/context/subScriptionContext";
import { AuthProvider } from "./src/context/authContext";
import { initDatabase } from "./src/components/utils/database";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, Text, View } from "react-native";
import ErrorBoundary from "./src/components/ErrorBoundary";

const App: React.FC = () => {
  const [fatalError, setFatalError] = React.useState<string | null>(null);

  useEffect(() => {
    InitializeDb();
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const onError = (event: ErrorEvent) => {
      const message =
        event.error instanceof Error
          ? event.error.stack ?? event.error.message
          : String(event.message);
      setFatalError(message);
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason instanceof Error
          ? event.reason.stack ?? event.reason.message
          : String(event.reason);
      setFatalError(reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          {fatalError ? (
            <View style={{ flex: 1, padding: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                App crashed on startup (web)
              </Text>
              <Text selectable style={{ fontSize: 12 }}>
                {fatalError}
              </Text>
            </View>
          ) : null}
          <ErrorBoundary>
            <AuthProvider>
              <SubscriptionProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </SubscriptionProvider>
            </AuthProvider>
          </ErrorBoundary>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
