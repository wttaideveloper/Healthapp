import { Platform } from "react-native";

/**
 * True only for the Mac Catalyst runtime (a Mac app built from the iOS/UIKit
 * target). Mac Catalyst reports Platform.OS === "ios" like iPhone/iPad, so it
 * must be detected separately via the native isMacCatalyst constant. Never
 * true on iPhone, iPad, Android, or web.
 */
export const isMacCatalyst = (): boolean =>
  Platform.OS === "ios" && Boolean((Platform as any)?.constants?.isMacCatalyst);
