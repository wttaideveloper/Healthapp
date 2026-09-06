import { useWindowDimensions } from "react-native";

/**
 * Existing wide-layout width threshold used across screens.
 * Keep this number stable — screens and the web chrome already depend on it.
 */
export const WIDE_LAYOUT_MIN_WIDTH = 760;

/**
 * Short viewports (iPhone landscape, squat browser windows) must keep the
 * compact mobile layout even when width crosses 760.
 */
export const WIDE_LAYOUT_MIN_HEIGHT = 560;

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isWideLayout =
    width >= WIDE_LAYOUT_MIN_WIDTH && height >= WIDE_LAYOUT_MIN_HEIGHT;

  return { width, height, isWideLayout };
}
