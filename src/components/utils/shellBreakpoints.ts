// Pure breakpoint rules for choosing between the desktop shell (top navbar) and the mobile
// shell (drawer + tabs). No React / React Native imports so it can be unit tested.

/** Width at which the desktop shell is entered. Kept equal to the previous fixed breakpoint. */
export const DESKTOP_SHELL_ENTER_WIDTH = 900;
/** Once in the desktop shell, stay in it until the window is narrower than this. */
export const DESKTOP_SHELL_EXIT_WIDTH = 860;

/**
 * Hysteresis so a window edge that jitters around the breakpoint (dragging a Mac window,
 * rotating a tablet) does not flip shells repeatedly. Every flip swaps the whole navigator,
 * which remounts the screens and loses in-progress state, so flips are kept to the minimum.
 */
export function nextDesktopShell(wasDesktop: boolean, width: number): boolean {
  return wasDesktop ? width >= DESKTOP_SHELL_EXIT_WIDTH : width >= DESKTOP_SHELL_ENTER_WIDTH;
}
