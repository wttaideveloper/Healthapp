// Run with: node --test src/components/utils/navigationBack.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  goBackOrFallback,
  previousRouteName,
  REPORT_RETURN_ROUTES,
  shouldShowShellBack,
  WEB_SHELL_BACK_ROUTES,
  type NavigationLike,
} from "./navigationBack.ts";
import { DESKTOP_SHELL_ENTER_WIDTH, DESKTOP_SHELL_EXIT_WIDTH, nextDesktopShell } from "./shellBreakpoints.ts";

const fakeNav = (canGoBack: boolean) => {
  const calls: string[] = [];
  const nav: NavigationLike = {
    canGoBack: () => canGoBack,
    goBack: () => calls.push("goBack"),
    navigate: (name, params) => calls.push(`navigate:${name}${params ? ":" + JSON.stringify(params) : ""}`),
  };
  return { nav, calls };
};

test("uses real history when there is some, never the fallback", () => {
  const { nav, calls } = fakeNav(true);
  assert.equal(goBackOrFallback(nav, { name: "Main" }), "went-back");
  assert.deepEqual(calls, ["goBack"]);
});

test("uses the fallback when there is no history (opened directly / refreshed)", () => {
  const { nav, calls } = fakeNav(false);
  assert.equal(goBackOrFallback(nav, { name: "InitialScreen" }), "went-to-fallback");
  assert.deepEqual(calls, ["navigate:InitialScreen"]);
});

test("passes fallback params through", () => {
  const { nav, calls } = fakeNav(false);
  goBackOrFallback(nav, { name: "PrintScreen", params: { screen: "Report" } });
  assert.deepEqual(calls, ['navigate:PrintScreen:{"screen":"Report"}']);
});

test("does nothing, rather than guessing a destination, when there is neither history nor fallback", () => {
  const { nav, calls } = fakeNav(false);
  assert.equal(goBackOrFallback(nav, null), "did-nothing");
  assert.equal(goBackOrFallback(nav), "did-nothing");
  assert.deepEqual(calls, []);
});

test("previousRouteName for a stack: report opened from history returns history", () => {
  const state = {
    index: 2,
    routes: [
      { key: "a", name: "Main" },
      { key: "b", name: "HistoryScreen" },
      { key: "c", name: "ReportScreen" },
    ],
  };
  assert.equal(previousRouteName(state), "HistoryScreen");
});

test("previousRouteName for a drawer with history uses visit order, not route order", () => {
  const state = {
    routes: [
      { key: "main", name: "Main" },
      { key: "hist", name: "HistoryScreen" },
      { key: "group", name: "GroupDetailsScreen" },
      { key: "report", name: "ReportScreen" },
    ],
    history: [
      { type: "route", key: "main" },
      { type: "route", key: "group" },
      { type: "drawer" },
      { type: "route", key: "report" },
    ],
  };
  assert.equal(previousRouteName(state), "GroupDetailsScreen");
});

test("previousRouteName is null for the first screen or empty state", () => {
  assert.equal(previousRouteName({ index: 0, routes: [{ key: "a", name: "Main" }] }), null);
  assert.equal(previousRouteName({ routes: [{ key: "a", name: "Main" }], history: [{ type: "route", key: "a" }] }), null);
  assert.equal(previousRouteName(null), null);
  assert.equal(previousRouteName({ routes: [] }), null);
});

test("a report opened from the assessment flow is not in the return-to list (it closes to Home)", () => {
  assert.ok(REPORT_RETURN_ROUTES.includes("HistoryScreen"));
  assert.ok(REPORT_RETURN_ROUTES.includes("GroupDetailsScreen"));
  assert.ok(!REPORT_RETURN_ROUTES.includes("InterestScreen"));
});

test("the web shell Back button is only shown on screens without their own Back/Close", () => {
  for (const route of WEB_SHELL_BACK_ROUTES) assert.equal(shouldShowShellBack(route), true, route);
  for (const route of [
    "Main", "HistoryScreen", "GroupDetailsScreen", "healthAgeTest", "QuestionsScreen", "InterestScreen",
    "ReportScreen", "PrintScreen", "success", "cancel",
  ]) {
    assert.equal(shouldShowShellBack(route), false, route);
  }
  assert.equal(shouldShowShellBack(undefined), false);
});

test("desktop shell breakpoint has hysteresis", () => {
  assert.equal(nextDesktopShell(false, DESKTOP_SHELL_ENTER_WIDTH - 1), false);
  assert.equal(nextDesktopShell(false, DESKTOP_SHELL_ENTER_WIDTH), true);
  // already desktop: stays desktop between the exit and enter widths
  assert.equal(nextDesktopShell(true, DESKTOP_SHELL_ENTER_WIDTH - 1), true);
  assert.equal(nextDesktopShell(true, DESKTOP_SHELL_EXIT_WIDTH), true);
  assert.equal(nextDesktopShell(true, DESKTOP_SHELL_EXIT_WIDTH - 1), false);
  // and a mobile shell does not flip to desktop inside the band
  assert.equal(nextDesktopShell(false, DESKTOP_SHELL_EXIT_WIDTH + 10), false);
});
