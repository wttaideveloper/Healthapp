import { getTodayReportCount } from "./reportService";

export const FREE_DAILY_TASK_LIMIT = 3;

export type DailyLimitStatus = {
  used: number;
  limit: number;
  remaining: number;
  allowed: boolean;
};

export const getDailyLimitStatus = async (
  isSubscribed: boolean
): Promise<DailyLimitStatus> => {
  const used = await getTodayReportCount();

  if (isSubscribed) {
    return {
      used,
      limit: Number.POSITIVE_INFINITY,
      remaining: Number.POSITIVE_INFINITY,
      allowed: true,
    };
  }

  const remaining = Math.max(FREE_DAILY_TASK_LIMIT - used, 0);

  return {
    used,
    limit: FREE_DAILY_TASK_LIMIT,
    remaining,
    allowed: used < FREE_DAILY_TASK_LIMIT,
  };
};
