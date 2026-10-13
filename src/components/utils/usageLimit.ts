import { getTodayReportCountOrNull } from "./reportService";
import {
  computeDailyLimitStatus,
  FREE_DAILY_TASK_LIMIT,
  type DailyLimitStatus,
} from "./usageLimitCore";

export { FREE_DAILY_TASK_LIMIT };
export type { DailyLimitStatus };

export const getDailyLimitStatus = async (
  isSubscribed: boolean
): Promise<DailyLimitStatus> => {
  // Premium users are never blocked, so skip the read (and its failure modes) for them.
  const used = isSubscribed ? 0 : await getTodayReportCountOrNull();
  return computeDailyLimitStatus(isSubscribed, used);
};
