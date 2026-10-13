// Pure free-tier limit rules (no React Native / database imports) so they can be
// unit tested with `node --test`.

export const FREE_DAILY_TASK_LIMIT = 3;

export type DailyLimitStatus = {
  used: number;
  limit: number;
  remaining: number;
  allowed: boolean;
  /** True when today's count could not be read; free users are denied (fail closed). */
  countUnavailable: boolean;
};

/**
 * @param usedToday number of assessments saved today, or `null` if the count could
 *                  not be read (database not ready, storage error, ...).
 */
export const computeDailyLimitStatus = (
  isSubscribed: boolean,
  usedToday: number | null
): DailyLimitStatus => {
  if (isSubscribed) {
    return {
      used: usedToday ?? 0,
      limit: Number.POSITIVE_INFINITY,
      remaining: Number.POSITIVE_INFINITY,
      allowed: true,
      countUnavailable: false,
    };
  }

  if (usedToday === null) {
    // Never grant free assessments when we cannot tell how many were already used.
    return {
      used: FREE_DAILY_TASK_LIMIT,
      limit: FREE_DAILY_TASK_LIMIT,
      remaining: 0,
      allowed: false,
      countUnavailable: true,
    };
  }

  const remaining = Math.max(FREE_DAILY_TASK_LIMIT - usedToday, 0);
  return {
    used: usedToday,
    limit: FREE_DAILY_TASK_LIMIT,
    remaining,
    allowed: usedToday < FREE_DAILY_TASK_LIMIT,
    countUnavailable: false,
  };
};
