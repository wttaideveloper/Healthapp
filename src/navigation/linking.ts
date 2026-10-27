import type { LinkingOptions } from "@react-navigation/native";
import { getStateFromPath as getStateFromPathDefault } from "@react-navigation/core";
import type { RootStackParamList } from "./AppNavigator";

// Expo's `experiments.baseUrl` (app.json) only controls where the built
// index.html points its own <script>/<link> asset tags - it has no effect
// on React Navigation's own URL handling. React Navigation's web linking
// (@react-navigation/native's useLinking.js, used on web since there is no
// useLinking.web.js override) reads `window.location.pathname` directly for
// incoming URLs and writes `getPathFromState`'s result directly to
// history.push/replace for outgoing ones - `linking.prefixes` is not
// consulted by that hook at all. The officially supported way to anchor
// both directions to a sub-path is `linking.config.path`: getStateFromPath
// strips it (and refuses to match if the incoming path doesn't start with
// it), and getPathFromState prepends it. Source: node_modules/
// @react-navigation/core/lib/module/{getStateFromPath,getPathFromState}.js.
export const APP_BASE_PATH = "app";

/** True when `pathname` was actually served under `/app` (production). */
export const isPathUnderBasePath = (pathname: string): boolean =>
  pathname === `/${APP_BASE_PATH}` || pathname.startsWith(`/${APP_BASE_PATH}/`);

/**
 * Builds the React Navigation `linking` config, anchoring it to `/app` only
 * when `pathname` shows the page was actually loaded from under `/app`
 * (production). Local dev (`http://localhost:8081/...`) never has that
 * prefix, so `config.path` is omitted there and behaviour is unchanged -
 * `getStateFromPath` would otherwise refuse to match ANY path, including
 * the root, once `path` is set and the incoming URL doesn't start with it.
 */
/**
 * Mirrors DrawerNavigator.tsx's actual (narrow/mobile) structure, which the
 * previous linking config did not: `InitialScreen` renders an outer
 * Stack.Navigator whose screens are `Drawer` (wrapping the real
 * Drawer.Navigator), `Profile`, `HistoryScreen`, `Purchase`, and - duplicated
 * from the Drawer's own screens - `healthAgeTest`, `QuestionsScreen`,
 * `InterestScreen`, `ReportScreen`, `GroupDetailsScreen`, `PrintScreen`,
 * `FilterScreen`, `AboutAppScreen`. Several of those screen names exist at
 * BOTH levels (as a Drawer.Screen inside "Drawer", and again as a Stack.Screen
 * as a peer of "Drawer"), because `navigation.navigate()` resolves to
 * whichever one is closest to the call site - the actual resulting path
 * depends on where the navigation happened from, so both levels need an
 * explicit path for every such screen. Before this, only the top-level
 * peers were configured, so anything reached through the nested Drawer level
 * (confirmed for `Main` itself, not just `healthAgeTest`) fell back to
 * React Navigation's auto-generated path, which stitches the unconfigured
 * screen's own name onto its unconfigured parent's name - producing exactly
 * the observed `/Drawer/healthAgeTest`.
 */
// Main/Home is deliberately NOT listed here: React Navigation rejects two
// config nodes that both claim the empty path pattern ("" / the bare root),
// and the flat `Main: ""` entry above already covers it for the desktop
// shell. For the mobile shell, a bare root load has zero path segments left
// to match at all, so it never needs an explicit entry here - it falls
// through to the existing "no segments left -> use each navigator's own
// initialRouteName" cascade (outer Stack has no explicit initialRouteName,
// so its default is its first screen, "Drawer"; Drawer.Navigator's own
// initialRouteName="Main" picks Home from there), exactly as it already did
// before any of this config existed.
const drawerNestedScreens = {
  // Confirmed via a real browser (Playwright): on the mobile shell, "Main"
  // (DrawerNavigator.tsx) isn't a plain screen - it renders BottomTabNavigator
  // (src/navigation/BottomTabNavigator.tsx), a THIRD nesting layer with its own
  // Home/Purchase/History/Account tabs. Unconfigured, this produced the
  // same unparseable-path bug as healthAgeTest (observed as /Main/Home), which
  // in turn crashed browser Back navigation: useLinking.js's popstate handler
  // called navigation.resetRoot(undefined) for the unparseable path, throwing
  // inside React Navigation's reducer ("Cannot read properties of undefined
  // (reading 'routes')"). Main can't be "" here (would collide with the flat
  // `Main: ""` entry above - two config nodes can't share the same fully
  // resolved empty pattern), hence the non-empty "Main" segment.
  Main: {
    path: "Main",
    screens: {
      Home: "",
      Purchase: "purchase",
      History: "history",
      Account: "account",
    },
  },
  healthAgeTest: "Drawer/healthAgeTest",
  QuestionsScreen: "Drawer/QuestionsScreen",
  InterestScreen: "Drawer/InterestScreen",
  ReportScreen: "Drawer/ReportScreen",
  ReportSettings: "Drawer/report-settings",
  AboutAppScreen: "Drawer/about",
  PrintScreen: "Drawer/PrintScreen",
  FilterScreen: "Drawer/FilterScreen",
};

/**
 * Works around a real, browser-reproduced bug in @react-navigation/core's
 * getStateFromPath (confirmed in node_modules/@react-navigation/core/lib/
 * module/getStateFromPath.js): when `options.path` is set, stripping it also
 * consumes the trailing slash the bare-root path needs ("app/" -> ""
 * instead of "/"), so the library's own special-cased "remaining === '/'"
 * branch for the root is never reached, and parsing a bare `/app` (or
 * `/app/`) load returns undefined. useLinking.js then calls
 * `navigation.resetRoot(undefined)` for that result, which throws inside
 * React Navigation's reducer: "TypeError: Cannot read properties of
 * undefined (reading 'routes')". Reproduced in a real Chromium browser via
 * Playwright specifically by navigating to the assessment under /app/ and
 * pressing the browser Back button (which pops the history entry back to
 * the bare /app root) - not caught by unit-testing getStateFromPath alone.
 * The fix: retry as a true bare root (path "/", no `path` option) whenever
 * the default implementation fails to parse exactly the anchored root.
 */
const buildStateFromPathWithRootFix = (
  config: NonNullable<LinkingOptions<RootStackParamList>["config"]>
) => (path: string, options: typeof config) => {
  const state = getStateFromPathDefault(path, options);
  if (state !== undefined) return state;

  const anchor = options?.path ? `/${options.path}` : null;
  const bare = path.split("?")[0];
  if (anchor && (bare === anchor || bare === `${anchor}/`)) {
    return getStateFromPathDefault("/", { ...options, path: undefined });
  }
  return state;
};

export const buildLinkingConfig = (
  pathname: string
): LinkingOptions<RootStackParamList> => {
  const anchored = isPathUnderBasePath(pathname);
  const config = {
    ...(anchored ? { path: APP_BASE_PATH } : {}),
    screens: {
      InitialScreen: {
        path: "",
        screens: {
          // The desktop/wide-web shell (WebNavigator/WebStack.Navigator, used at
          // DESKTOP_SHELL_ENTER_WIDTH widths and up) renders "Main" and every one
          // of the drawerNestedScreens names as FLAT peers, not nested under a
          // "Drawer" screen the way the mobile shell does. Both shells share this
          // one static linking config, so every such name needs an entry at
          // whichever level it actually appears in EACH shell's tree.
          Main: "",
          Drawer: { screens: drawerNestedScreens },
          Profile: "profile",
          Purchase: "purchase",
          HistoryScreen: "history",
          AboutAppScreen: "about",
          ReportSettings: "report-settings",
          healthAgeTest: "healthAgeTest",
          QuestionsScreen: "QuestionsScreen",
          InterestScreen: "InterestScreen",
          ReportScreen: "ReportScreen",
          GroupDetailsScreen: "GroupDetailsScreen",
          PrintScreen: "PrintScreen",
          FilterScreen: "FilterScreen",
          success: "success",
          cancel: "cancel",
        },
      },
      ChangeLanguage: "change-language",
      SignIn: "signin",
      SignUp: "signup",
      ForgotPassword: "forgot-password",
      VerifyEmail: "verify-email",
    },
  };

  return {
    prefixes: [],
    config,
    getStateFromPath: buildStateFromPathWithRootFix(config),
  };
};
