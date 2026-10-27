// Run with: node --test src/navigation/linking.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { getStateFromPath, getPathFromState } from "@react-navigation/core";
import { APP_BASE_PATH, buildLinkingConfig, isPathUnderBasePath } from "./linking.ts";

test("isPathUnderBasePath recognizes only paths actually served under /app", () => {
  assert.equal(isPathUnderBasePath("/app"), true);
  assert.equal(isPathUnderBasePath("/app/"), true);
  assert.equal(isPathUnderBasePath("/app/Drawer/healthAgeTest"), true);
  assert.equal(isPathUnderBasePath("/"), false);
  assert.equal(isPathUnderBasePath("/Drawer/healthAgeTest"), false);
  assert.equal(isPathUnderBasePath("/application/not-the-base-path"), false);
});

test("production pathname (served under /app) anchors the linking config to /app", () => {
  const config = buildLinkingConfig("/app/Drawer/healthAgeTest").config as any;
  assert.equal(config.path, APP_BASE_PATH);
});

test("local dev pathname (no /app, e.g. localhost:8081) leaves the config unanchored", () => {
  const config = buildLinkingConfig("/Drawer/healthAgeTest").config as any;
  assert.equal(config.path, undefined);
  // First load (nothing has navigated yet) must not be mistaken for /app either.
  assert.equal((buildLinkingConfig("/").config as any).path, undefined);
  assert.equal((buildLinkingConfig("").config as any).path, undefined);
});

// DrawerNavigator.tsx's actual (narrow/mobile) structure: InitialScreen -> an
// outer Stack.Navigator (screens: Drawer, Profile, HistoryScreen, Purchase,
// healthAgeTest, ...) -> the "Drawer" screen renders the real Drawer.Navigator
// (screens: Main, healthAgeTest, QuestionsScreen, ...). Several screen names
// exist at BOTH levels, because navigation.navigate() resolves to whichever is
// closest to the call site - healthAgeTest reached from Home (inside the
// Drawer) nests one level deeper than healthAgeTest reached from a top-level
// stack screen. Both shapes are built here since the fix has to cover both.
const stateHomeFocused = {
  index: 0,
  routes: [
    {
      name: "InitialScreen",
      state: {
        index: 0,
        routes: [
          {
            name: "Drawer",
            state: {
              type: "drawer",
              index: 0,
              routeNames: ["Main", "healthAgeTest"],
              routes: [{ name: "Main" }, { name: "healthAgeTest" }],
            },
          },
        ],
      },
    },
  ],
};

const stateHealthAgeTestViaDrawer = {
  index: 0,
  routes: [
    {
      name: "InitialScreen",
      state: {
        index: 0,
        routes: [
          {
            name: "Drawer",
            state: {
              type: "drawer",
              index: 1,
              routeNames: ["Main", "healthAgeTest"],
              routes: [{ name: "Main" }, { name: "healthAgeTest" }],
            },
          },
        ],
      },
    },
  ],
};

const stateHealthAgeTestViaOuterStack = {
  index: 0,
  routes: [
    {
      name: "InitialScreen",
      state: {
        index: 1,
        routes: [{ name: "Drawer" }, { name: "healthAgeTest" }],
      },
    },
  ],
};

// The real mobile-shell shape for Home: InitialScreen -> outer Stack ("Drawer"
// focused) -> Drawer.Navigator ("Main" focused) -> BottomTabNavigator ("Home"
// focused). Confirmed via a real browser - "Main" is not a leaf screen.
const stateHomeViaMainTabs = {
  index: 0,
  routes: [
    {
      name: "InitialScreen",
      state: {
        index: 0,
        routes: [
          {
            name: "Drawer",
            state: {
              type: "drawer",
              index: 0,
              routeNames: ["Main", "healthAgeTest"],
              routes: [
                {
                  name: "Main",
                  state: {
                    index: 0,
                    routeNames: ["Home", "Purchase", "History", "Account"],
                    routes: [{ name: "Home" }, { name: "Purchase" }, { name: "History" }, { name: "Account" }],
                  },
                },
                { name: "healthAgeTest" },
              ],
            },
          },
        ],
      },
    },
  ],
};

test("@react-navigation/core's raw getStateFromPath fails to parse the bare /app root (library edge case, not our bug)", () => {
  // getStateFromPath has a special-cased branch for a bare root ("remaining
  // === '/'"), but options.path's own prefix-stripping consumes the trailing
  // slash along with "app", leaving an empty string rather than "/" - so that
  // branch is never reached once `path` is set, and the raw library function
  // returns undefined for this one input. Confirmed via a real browser
  // (Playwright, headless Chromium) that useLinking.js then calls
  // navigation.resetRoot(undefined) for exactly this result, which throws
  // inside React Navigation's reducer on browser Back to the bare /app root:
  // "TypeError: Cannot read properties of undefined (reading 'routes')".
  // buildLinkingConfig's own getStateFromPath (tested below) works around it.
  const prodConfig = buildLinkingConfig("/app").config;
  assert.equal(getStateFromPath("/app", prodConfig), undefined);
});

test("buildLinkingConfig's own getStateFromPath fixes the bare /app root, preventing the resetRoot(undefined) crash", () => {
  const linking = buildLinkingConfig("/app");
  assert.ok(linking.getStateFromPath, "buildLinkingConfig must provide a custom getStateFromPath");
  const state = linking.getStateFromPath!("/app", linking.config);
  assert.ok(state, "the wrapper must resolve the bare /app root to a real state, not undefined");

  const stateWithSlash = linking.getStateFromPath!("/app/", linking.config);
  assert.ok(stateWithSlash, "the wrapper must also handle the bare root with a trailing slash");

  // Must not mask real non-matches: a genuinely unknown path still fails to parse.
  assert.equal(linking.getStateFromPath!("/app/this-route-does-not-exist-anywhere", linking.config), undefined);
});

test("local dev's getStateFromPath is a pure passthrough (no base path means no bare-root edge case to work around)", () => {
  const linking = buildLinkingConfig("/Drawer/healthAgeTest");
  assert.equal(linking.config.path, undefined);
  // Local dev's bare root ("/") was never broken (no options.path to strip the
  // trailing slash), so the wrapper must behave identically to the raw function.
  assert.deepEqual(
    linking.getStateFromPath!("/", linking.config),
    getStateFromPath("/", linking.config)
  );
});

test("Home reached through Main's BottomTabNavigator (the real mobile shape) stays under /app and round-trips to a real, parseable state", () => {
  // This is the actual bug reproduced in a real browser: unconfigured, this
  // state generated /Main/Home, which failed to parse on browser Back,
  // crashing inside React Navigation's reducer via resetRoot(undefined). The
  // fix's exact generated path isn't load-bearing (getPathFromState prefers a
  // flat name match over the nested Main config in this mixed string/object
  // case - confirmed empirically, not a shape we rely on), but it MUST stay
  // under /app and MUST parse back without crashing, which this verifies
  // using the actual browser-reproduced state shape.
  const prodConfig = buildLinkingConfig("/app/Main").config;
  const path = getPathFromState(stateHomeViaMainTabs as any, prodConfig);
  assert.ok(path?.startsWith("/app"), `path "${path}" must stay under /app`);
  assert.ok(getStateFromPath(path, prodConfig), `"${path}" must parse back to a real state, not crash on refresh/Back`);
});

test("the other BottomTabNavigator tabs (Purchase, History, Account) also stay under /app and parse back without crashing", () => {
  const makeTabState = (tabName: string) => ({
    index: 0,
    routes: [
      {
        name: "InitialScreen",
        state: {
          index: 0,
          routes: [
            {
              name: "Drawer",
              state: {
                type: "drawer",
                index: 0,
                routeNames: ["Main"],
                routes: [
                  {
                    name: "Main",
                    state: {
                      index: 0,
                      routeNames: ["Home", "Purchase", "History", "Account"],
                      routes: [{ name: tabName }],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  });

  const prodConfig = buildLinkingConfig("/app/Main").config;
  for (const tab of ["Purchase", "History", "Account"]) {
    const path = getPathFromState(makeTabState(tab) as any, prodConfig);
    assert.ok(path?.startsWith("/app"), `${tab} tab path "${path}" must stay under /app`);
    assert.ok(getStateFromPath(path, prodConfig), `${tab} tab path "${path}" must parse back to a real state`);
  }
});

test("explicitly re-focusing Main from within the Drawer now round-trips to a real, parseable Home state (fixed as a side effect of configuring Main's own tabs)", () => {
  // Before Main's BottomTabNavigator tabs were configured, this state (Main
  // as a bare leaf route, no tab sub-state) generated the unparseable
  // /app/Main, which fell back to the app's default route on refresh/Back -
  // harmless in practice (the default route already IS Home) but not a true
  // round-trip. Configuring Main's own nested screens (for the Home/Purchase/
  // History/Account tabs) fixed this too: it now parses back to a real state
  // that resolves to Home via Main's own initialRouteName, not just a
  // same-result coincidence from a failed parse.
  const prodConfig = buildLinkingConfig("/app/Main").config;
  const path = getPathFromState(stateHomeFocused as any, prodConfig);
  assert.equal(path, "/app/Main");
  assert.ok(getStateFromPath(path, prodConfig), "must now parse back to a real state");
});

test("navigating to healthAgeTest through the Drawer keeps the /app prefix on the generated URL (the actual bug)", () => {
  const prodConfig = buildLinkingConfig("/app/Drawer/healthAgeTest").config;
  const path = getPathFromState(stateHealthAgeTestViaDrawer as any, prodConfig);
  assert.equal(path, "/app/Drawer/healthAgeTest");
});

test("navigating to healthAgeTest through the outer stack also keeps the /app prefix", () => {
  const prodConfig = buildLinkingConfig("/app/healthAgeTest").config;
  const path = getPathFromState(stateHealthAgeTestViaOuterStack as any, prodConfig);
  assert.equal(path, "/app/healthAgeTest");
});

test("parsing a direct nested URL under /app/ resolves to the healthAgeTest screen, not a fallback home route", () => {
  const prodConfig = buildLinkingConfig("/app/Drawer/healthAgeTest").config;
  const state = getStateFromPath("/app/Drawer/healthAgeTest", prodConfig);
  assert.ok(state, "a direct load of /app/Drawer/healthAgeTest must resolve to a navigation state");

  let current: any = state;
  let focusedName: string | undefined;
  while (current) {
    const route = current.routes[current.index ?? current.routes.length - 1];
    focusedName = route.name;
    current = route.state;
  }
  assert.equal(focusedName, "healthAgeTest");
});

test("refresh and browser back/forward reuse the same getStateFromPath/getPathFromState pair, so the fix applies uniformly", () => {
  // useLinking.js (@react-navigation/native) funnels the initial load, every popstate
  // (back/forward), and every push/replace on navigate through linking.config alone - there is
  // no separate code path for "refresh" vs "navigate". Round-tripping more than one route is
  // sufficient evidence that refresh/back/forward behave the same way, without needing a live
  // browser to re-trigger each event type individually.
  const prodConfig = buildLinkingConfig("/app/signin").config;

  const signInState = getStateFromPath("/app/signin", prodConfig);
  assert.ok(signInState);
  assert.equal(getPathFromState(signInState, prodConfig), "/app/signin");

  const purchaseState = getStateFromPath("/app/purchase", prodConfig);
  assert.ok(purchaseState);
  assert.equal(getPathFromState(purchaseState, prodConfig), "/app/purchase");

  const historyState = getStateFromPath("/app/history", prodConfig);
  assert.ok(historyState);
  assert.equal(getPathFromState(historyState, prodConfig), "/app/history");
});

test("local dev keeps generating bare (no /app) URLs for the same routes", () => {
  const devConfig = buildLinkingConfig("/Drawer/healthAgeTest").config;

  const path = getPathFromState(stateHealthAgeTestViaDrawer as any, devConfig);
  assert.equal(path, "/Drawer/healthAgeTest");
  assert.ok(!path.startsWith("/app"), "local dev URLs must never gain an /app prefix");

  const parsedBack = getStateFromPath("/Drawer/healthAgeTest", devConfig);
  assert.ok(parsedBack, "local dev must still resolve this route without the /app prefix");

  const signInState = getStateFromPath("/signin", devConfig);
  assert.ok(signInState);
  assert.equal(getPathFromState(signInState, devConfig), "/signin");
});

test("previously-working top-level routes (purchase, history) are unaffected by the Drawer-nesting fix", () => {
  const prodConfig = buildLinkingConfig("/app/purchase").config;
  assert.ok(getStateFromPath("/app/purchase", prodConfig));
  assert.ok(getStateFromPath("/app/history", prodConfig));
});
