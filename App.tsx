import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SubscriptionProvider } from "./src/context/subScriptionContext";
import { AuthProvider } from "./src/context/authContext";
import { initDatabase } from "./src/components/utils/database";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, Text, View, ActivityIndicator } from "react-native";
import ErrorBoundary from "./src/components/ErrorBoundary";
import WebPreloader from "./src/components/WebPreloader";

const App: React.FC = () => {
  const [fatalError, setFatalError] = React.useState<string | null>(null);
  const [isBootReady, setIsBootReady] = React.useState(false);
  const [isNavReady, setIsNavReady] = React.useState(false);
  const [showWebPreloader, setShowWebPreloader] = React.useState(Platform.OS === "web");
  const bootStartRef = React.useRef<number>(Date.now());

  const linking = React.useMemo(
    () => ({
      prefixes: [],
      config: {
        screens: {
          InitialScreen: {
            path: "",
            screens: {
              Main: "",
              Purchase: "purchase",
              HistoryScreen: "history",
              AboutAppScreen: "about",
              ReportSettings: "report-settings",
              success: "success",
              cancel: "cancel",
            },
          },
          ChangeLanguage: "change-language",
          SignIn: "signin",
          SignUp: "signup",
          VerifyEmail: "verify-email",
        },
      },
    }),
    []
  );

  const documentTitle = React.useMemo(
    () => ({
      enabled: true,
      formatter: (_options: any, route: any) => {
        const routeName = typeof route?.name === "string" ? route.name.trim() : "";
        if (!routeName || routeName.toLowerCase() === "undefined") {
          return "Health Age";
        }
        return `Health Age | ${routeName}`;
      },
    }),
    []
  );

  useEffect(() => {
    InitializeDb();
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web" || !showWebPreloader) {
      return;
    }

    if (!isBootReady || !isNavReady) {
      return;
    }

    const minimumVisibleMs = 900;
    const elapsed = Date.now() - bootStartRef.current;
    const waitMs = Math.max(0, minimumVisibleMs - elapsed);

    const timer = setTimeout(() => {
      setShowWebPreloader(false);
    }, waitMs);

    return () => clearTimeout(timer);
  }, [isBootReady, isNavReady, showWebPreloader]);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const normalizeTitle = () => {
      const current = (document.title ?? "").trim().toLowerCase();
      if (!current || current === "undefined" || current === "null") {
        document.title = "Health Age";
      }
    };
    normalizeTitle();
    const timer = setInterval(normalizeTitle, 800);

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
      clearInterval(timer);
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
      setIsBootReady(true);
    } catch (error) {
      console.error(`Database initialization failed (attempt ${retryCount + 1}):`, error);

      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying database initialization in ${RETRY_DELAY}ms...`);
        setTimeout(() => {
          InitializeDb(retryCount + 1);
        }, RETRY_DELAY);
      } else {
        console.error('Database initialization failed after all retries');
        setIsBootReady(true);
      }
    }
  };

  if (!isBootReady) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
            <ActivityIndicator size="large" color="#0B9FD4" />
            <Text style={{ marginTop: 10, color: "#475569" }}>Loading...</Text>
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

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
                <NavigationContainer
                  linking={linking}
                  documentTitle={documentTitle}
                  onReady={() => setIsNavReady(true)}
                >
                  <AppNavigator />
                </NavigationContainer>
              </SubscriptionProvider>
            </AuthProvider>
          </ErrorBoundary>
          <WebPreloader visible={showWebPreloader} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
