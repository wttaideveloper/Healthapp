import { I18nManager, Platform } from "react-native";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

/**
 * `transform` is shared by ViewStyle, TextStyle and ImageStyle, so a value of
 * this shape can be applied to any of them. The icon helpers below return it
 * because the directional glyphs are a mix of <Image> and vector icons.
 */
type MirrorStyle = Pick<ImageStyle, "transform">;
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
): ViewStyle => {
  const rtl = isRTL(language);
  const out: Record<string, number | string> = {};
  if (offsets.start !== undefined) out[rtl ? "right" : "left"] = offsets.start;
  if (offsets.end !== undefined) out[rtl ? "left" : "right"] = offsets.end;
  return out as ViewStyle;
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
};
