import { Alert, Platform } from "react-native";

/**
 * Show a simple message. React Native Web's Alert.alert is a no-op, so on web fall
 * back to window.alert; otherwise user feedback (success or error) would be silent.
 */
export const notify = (title: string, message?: string): void => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && typeof window.alert === "function") {
      window.alert(message ? `${title}\n\n${message}` : title);
    }
    return;
  }
  Alert.alert(title, message);
};
