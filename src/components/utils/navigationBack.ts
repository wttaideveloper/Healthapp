// Pure back-navigation rules (no React / React Navigation imports) so they can be unit tested
// with `node --test`.

export type BackFallback = { name: string; params?: Record<string, unknown> };

/** The subset of a React Navigation `navigation` object that back navigation needs. */
export type NavigationLike = {
  canGoBack: () => boolean;
  goBack: () => void;
  navigate: (name: string, params?: any) => void;
  replace?: (name: string, params?: any) => void;
};

export type BackOutcome = "went-back" | "went-to-fallback" | "did-nothing";

/**
 * Go back through the real navigation history. When there is none (the screen was opened
 * directly, the web page was refreshed, or it is the first route of a navigator) go to the
 * fallback instead. Never navigates "home" when real history exists.
 *
 * `replace` is preferred for the fallback when available so the fallback does not leave the
 * dead-end screen behind it in history (which would make Back loop).
 */
export function goBackOrFallback(navigation: NavigationLike, fallback?: BackFallback | null): BackOutcome {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return "went-back";
  }
  if (fallback) {
    navigation.navigate(fallback.name, fallback.params);
    return "went-to-fallback";
  }
  return "did-nothing";
}

/**
 * Routes of the desktop web shell that show a shared Back button above the page. Screens that
 * already render their own Back/Close control are deliberately excluded to avoid duplicates:
 * the assessment wizard (healthAgeTest, QuestionsScreen, InterestScreen), HistoryScreen,
 * GroupDetailsScreen, PrintScreen and ReportScreen (both have a Close control that
 * now returns to the previous screen), and the checkout result pages (they have a Continue action).
 */
export const WEB_SHELL_BACK_ROUTES: readonly string[] = ["Purchase", "AboutAppScreen", "ReportSettings", "FilterScreen"];

export const shouldShowShellBack = (routeName: string | undefined | null): boolean =>
  Boolean(routeName) && WEB_SHELL_BACK_ROUTES.includes(routeName as string);

type RouteEntry = { key: string; name: string };
export type NavigationStateLike = {
  routes: RouteEntry[];
  index?: number;
  /** Drawer / tab navigators with backBehavior="history" keep visited routes here. */
  history?: Array<{ type?: string; key?: string }>;
};

/**
 * Name of the screen the user came from, for stack-like state (routes + index) and for
 * drawer/tab history. Null when there is none (first screen, or opened directly).
 */
export function previousRouteName(state: NavigationStateLike | null | undefined): string | null {
  if (!state || !Array.isArray(state.routes) || state.routes.length === 0) return null;

  if (Array.isArray(state.history)) {
    const visited = state.history.filter((entry) => entry?.type === "route" && entry.key);
    if (visited.length >= 2) {
      const previousKey = visited[visited.length - 2].key;
      return state.routes.find((route) => route.key === previousKey)?.name ?? null;
    }
    return null;
  }

  const index = typeof state.index === "number" ? state.index : state.routes.length - 1;
  return index > 0 ? (state.routes[index - 1]?.name ?? null) : null;
}

/** Report screens opened from these screens return to them; anything else returns Home. */
export const REPORT_RETURN_ROUTES: readonly string[] = ["HistoryScreen", "GroupDetailsScreen"];
