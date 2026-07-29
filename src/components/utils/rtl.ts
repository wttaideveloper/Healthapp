import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, I18nManager, Platform } from "react-native";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

/**
 * `transform` is shared by ViewStyle, TextStyle and ImageStyle, so a value of
 * this shape can be applied to any of them. The icon helpers below return it
 * because the directional glyphs are a mix of <Image> and vector icons.
 */
type MirrorStyle = Pick<ImageStyle, "transform">;

/**
 * `left`/`right` are shared by ViewStyle, TextStyle and ImageStyle, so a value of
 * this shape can be applied to any of them. startEnd() returns it because the
 * elements it anchors are a mix of <View>, <Image> and <TouchableOpacity>.
 */
type InsetStyle = Pick<ImageStyle, "left" | "right">;
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

/**
 * Central RTL infrastructure.
 *
 * The app ships 25 translation bundles. Four of them are written right-to-left.
 * None of the four are exposed in the language pickers yet, so every helper here
 * currently resolves to the LTR branch for all 19 visible languages - this module
 * is infrastructure, not a behaviour change.
 */
export const RTL_LANGUAGES = ["ar", "fa", "ur", "he"] as const;

export type Direction = "ltr" | "rtl";

const baseCode = (language?: string | null): string =>
  (language ?? i18n.language ?? "en").toLowerCase().split("-")[0];

/** True when the given language (or the active one) is written right-to-left. */
export const isRTL = (language?: string | null): boolean =>
  (RTL_LANGUAGES as readonly string[]).includes(baseCode(language));

/** "rtl" | "ltr" for the given language (or the active one). */
export const getDirection = (language?: string | null): Direction =>
  isRTL(language) ? "rtl" : "ltr";

/**
 * Apply the writing direction for a language.
 *
 * web    - sets dir/lang on <html>; React Native Web mirrors flexbox and text
 *          alignment from the document direction, so this takes effect immediately.
 * native - I18nManager only mirrors the layout engine after a process restart.
 *          We therefore write the flag and report back whether a restart is needed
 *          instead of restarting unconditionally, so LTR -> LTR switches (every
 *          switch available today) never reload the app.
 *
 * @returns true when a native restart is required for the change to fully apply.
 */
export const applyDirection = (language?: string | null): boolean => {
  const rtl = isRTL(language);

  if (Platform.OS === "web") {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.dir = rtl ? "rtl" : "ltr";
      document.documentElement.lang = baseCode(language);
    }
    return false;
  }

  // Permit RTL only while an RTL language is active, so a stale forced-RTL flag
  // can never leak into an LTR language.
  I18nManager.allowRTL(rtl);

  if (I18nManager.isRTL !== rtl) {
    I18nManager.forceRTL(rtl);
    return true;
  }
  return false;
};

/* ------------------------------------------------------------------ *
 * Style helpers - all no-ops while an LTR language is active.
 * ------------------------------------------------------------------ */

/** Row that reverses under RTL. Use only where the order carries meaning. */
export const row = (language?: string | null): ViewStyle => ({
  flexDirection: isRTL(language) ? "row-reverse" : "row",
});

/** Text alignment that follows the writing direction. */
export const textAlign = (language?: string | null): TextStyle => ({
  textAlign: isRTL(language) ? "right" : "left",
  writingDirection: isRTL(language) ? "rtl" : "ltr",
});

/** Writing direction only, for text whose alignment is already correct. */
export const writingDirection = (language?: string | null): TextStyle => ({
  writingDirection: isRTL(language) ? "rtl" : "ltr",
});

/**
 * Mirror a directional glyph (back/forward chevrons and arrows).
 * Never apply to logos, avatars or symmetric icons.
 */
export const flipIcon = (language?: string | null): MirrorStyle =>
  isRTL(language) ? { transform: [{ scaleX: -1 }] } : {};

/**
 * Style for a "forward" chevron. The shared glyph (assets/images/arrowLeft.png)
 * points backwards, so forward arrows were previously mirrored with a hardcoded
 * `scaleX: -1`. Under RTL "forward" points the other way, so the mirror is
 * dropped rather than doubled.
 */
export const forwardIcon = (language?: string | null): MirrorStyle => ({
  transform: [{ scaleX: isRTL(language) ? 1 : -1 }],
});

/**
 * Map logical start/end offsets onto physical left/right.
 * React Native does not mirror absolute `left`/`right` under forceRTL, so
 * direction-sensitive absolute positioning must go through this.
 */
export const startEnd = (
  offsets: { start?: number | string; end?: number | string },
  language?: string | null
): InsetStyle => {
  const rtl = isRTL(language);
  const out: Record<string, number | string> = {};
  if (offsets.start !== undefined) out[rtl ? "right" : "left"] = offsets.start;
  if (offsets.end !== undefined) out[rtl ? "left" : "right"] = offsets.end;
  return out as InsetStyle;
};

/* ------------------------------------------------------------------ *
 * React binding
 * ------------------------------------------------------------------ */

/**
 * Subscribes to language changes so a component re-renders - and re-evaluates
 * the helpers above - the moment the language switches.
 */
export const useDirection = () => {
  const { i18n: instance } = useTranslation();
  const language = instance.language;
  const rtl = isRTL(language);
  return {
    language,
    isRTL: rtl,
    direction: (rtl ? "rtl" : "ltr") as Direction,
    row: row(language),
    textAlign: textAlign(language),
    writingDirection: writingDirection(language),
    flipIcon: flipIcon(language),
    startEnd: (offsets: { start?: number | string; end?: number | string }) =>
      startEnd(offsets, language),
  };
};

/* ------------------------------------------------------------------ *
 * Language switching + restart orchestration
 *
 * React Native cannot re-mirror a running app: I18nManager.forceRTL() only
 * takes effect on the next process start. Rather than hot-patching layouts
 * (which is what leaves half-open drawers and stale geometry behind), a
 * direction change is treated as an explicit, user-confirmed restart.
 * ------------------------------------------------------------------ */

export const LANGUAGE_STORAGE_KEY = "language";
export const DIRECTION_STORAGE_KEY = "layout_direction";

/** Persisted so the boot path can detect a direction mismatch before first paint. */
export const persistDirection = async (language?: string | null): Promise<void> => {
  try {
    await AsyncStorage.setItem(DIRECTION_STORAGE_KEY, getDirection(language));
  } catch {
    // Non-fatal: direction is re-derived from the stored language at boot.
  }
};

export const getPersistedDirection = async (): Promise<Direction | null> => {
  try {
    const value = await AsyncStorage.getItem(DIRECTION_STORAGE_KEY);
    return value === "rtl" || value === "ltr" ? value : null;
  } catch {
    return null;
  }
};

/**
 * Restart the app using whatever mechanism this project actually supports.
 * Returns false when no mechanism is available, so the caller can fall back to
 * asking the user to relaunch manually instead of silently doing nothing.
 */
export const restartApp = async (): Promise<boolean> => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.location) {
      window.location.reload();
      return true;
    }
    return false;
  }

  // expo-updates is the production-grade reload. Optional: resolved at runtime so
  // the app still builds when the package is not installed.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Updates = require("expo-updates");
    if (Updates?.reloadAsync) {
      await Updates.reloadAsync();
      return true;
    }
  } catch {
    // not installed - fall through
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RNRestart = require("react-native-restart");
    const restart = RNRestart?.default?.Restart ?? RNRestart?.Restart;
    if (restart) {
      restart();
      return true;
    }
  } catch {
    // not installed - fall through
  }

  try {
    // Development builds only; a no-op in release.
    const { DevSettings } = require("react-native");
    if (__DEV__ && DevSettings?.reload) {
      DevSettings.reload();
      return true;
    }
  } catch {
    // fall through
  }

  return false;
};

export type LanguageChangeResult = {
  /** true when the writing direction flipped (LTR <-> RTL). */
  directionChanged: boolean;
  /** true when the app was actually restarted. */
  restarted: boolean;
};

/**
 * Single entry point for changing language, used by every picker so the four
 * cases behave identically everywhere:
 *
 *   LTR -> LTR  and  RTL -> RTL : translations swap instantly, no restart.
 *   LTR -> RTL  and  RTL -> LTR : language + direction persisted, flag applied,
 *                                 then `onRequireRestart` decides when to reload.
 *
 * The language and direction are written to storage *before* any restart, so the
 * app comes back up in the new direction with no intermediate broken state.
 */
export const changeAppLanguage = async (
  language: string,
  options?: { onRequireRestart?: () => void | Promise<void> }
): Promise<LanguageChangeResult> => {
  const previouslyRTL = isRTL(i18n.language);
  const nextRTL = isRTL(language);
  const directionChanged = previouslyRTL !== nextRTL;

  // Persist first: a restart must never lose the user's choice.
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Non-fatal - the in-memory change below still applies for this session.
  }
  await persistDirection(language);

  await i18n.changeLanguage(language);
  applyDirection(language);

  if (!directionChanged) {
    // Cases 1 and 2: same direction, nothing to rebuild.
    return { directionChanged: false, restarted: false };
  }

  // Cases 3 and 4: the native layout engine only mirrors on next launch.
  if (options?.onRequireRestart) {
    await options.onRequireRestart();
  }
  return { directionChanged: true, restarted: false };
};

/**
 * The function every language picker should call.
 *
 * Same-direction switches apply instantly. A direction flip persists everything
 * first, then asks the user to restart — the dialog is shown in the language they
 * just chose, because i18n has already switched by that point.
 */
export const switchLanguage = async (language: string): Promise<LanguageChangeResult> => {
  const result = await changeAppLanguage(language);
  if (!result.directionChanged) {
    return result;
  }

  return new Promise<LanguageChangeResult>((resolve) => {
    Alert.alert(
      i18n.t("restartRequiredTitle"),
      i18n.t("restartRequiredMessage"),
      [
        {
          text: i18n.t("restartNow"),
          onPress: async () => {
            const restarted = await restartApp();
            if (!restarted) {
              // No reload mechanism in this build - tell the user plainly rather
              // than leaving them in a half-mirrored UI with no explanation.
              Alert.alert(
                i18n.t("restartRequiredTitle"),
                i18n.t("restartManuallyMessage")
              );
            }
            resolve({ directionChanged: true, restarted });
          },
        },
      ],
      { cancelable: false }
    );
  });
};

export default {
  RTL_LANGUAGES,
  isRTL,
  getDirection,
  applyDirection,
  row,
  textAlign,
  writingDirection,
  flipIcon,
  startEnd,
  restartApp,
  changeAppLanguage,
  persistDirection,
  getPersistedDirection,
};
