import React from "react";
import { Platform, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { flipIcon } from "./utils/rtl";
import { BackFallback, goBackOrFallback } from "./utils/navigationBack";

type BackButtonProps = {
  /** Where to go when there is no history (opened directly / page refreshed). */
  fallback?: BackFallback | null;
  /** Override the default behaviour (real history, then fallback). Must not save, delete or purchase. */
  onPress?: () => void;
  /** Icon only (still has an accessible "Back" label). */
  iconOnly?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Shared Back button. Uses the real navigation history; only when there is none does it use
 * `fallback` (default: the "Main" screen). Keyboard focusable and labelled for screen readers.
 */
const BackButton: React.FC<BackButtonProps> = ({
  fallback = { name: "Main" },
  onPress,
  iconOnly = false,
  style,
  testID,
}) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress();
      return;
    }
    goBackOrFallback(navigation, fallback);
  }, [navigation, fallback, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={t("back")}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      testID={testID}
      style={({ pressed, hovered }: any) => [
        styles.button,
        iconOnly ? styles.iconOnly : null,
        hovered ? styles.hovered : null,
        pressed ? styles.pressed : null,
        style,
      ]}
    >
      <Ionicons name="arrow-back" size={18} color="#2D579D" style={flipIcon()} />
      {iconOnly ? null : <Text style={styles.label}>{t("back")}</Text>}
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C9DCEF",
    backgroundColor: "#FFFFFF",
    ...(Platform.OS === "web" ? ({ cursor: "pointer" } as any) : null),
  },
  iconOnly: {
    width: 40,
    paddingHorizontal: 0,
    justifyContent: "center",
  },
  hovered: {
    backgroundColor: "#F1F7FD",
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D579D",
  },
});
