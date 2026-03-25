import AsyncStorage from "@react-native-async-storage/async-storage";

// Web fallback implementation for reportService.
// The native implementation uses SQLite. On web we use AsyncStorage for persistence and
// return objects shaped like the SQLite rows used by screens (HistoryScreen expects
// `report_data` and `answers` string fields).

const REPORTS_KEY = "web_reports";
const GROUPS_KEY = "web_groups";
const REPORT_GROUPS_KEY = "web_report_groups";
const SETTINGS_KEY = "web_settings";

type StoredReport = {
  id: string;
  user_id: string;
  user_name: string;
  user_email?: string;
  title: string;
  answers: string; // JSON string
  report_data: string; // JSON string
  date: string; // YYYY-MM-DD
  created_at: string; // ISO
};

type StoredGroup = {
  id: string;
  name: string;
  description?: string;
  created_at: string; // ISO
};

type StoredReportGroup = {
  report_id: string;
  group_id: string;
};

const todayKey = (): string => new Date().toISOString().split("T")[0];

const sanitizeJsonString = (value: unknown, fallback: string): string => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return fallback;
  try {
    JSON.parse(trimmed);
    return trimmed;
  } catch {
    return fallback;
  }
};

const safeJsonParse = <T,>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const isMeaningfulReportData = (obj: unknown): boolean => {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as any;
  // Minimum set History/Report screens rely on.
  return (
    o.name != null ||
    o.age != null ||
    o.gender != null ||
    o.height != null ||
    o.weight != null ||
    o.healthAge != null ||
    o.potentialAge != null
  );
};

const isMeaningfulAnswers = (arr: unknown): boolean => {
  if (!Array.isArray(arr)) return false;
  return arr.length > 0;
};

const extractNested = (root: any, keys: string[]): any => {
  let cur: any = root;
  for (const key of keys) {
    if (!cur || typeof cur !== "object") return undefined;
    cur = cur[key];
  }
  return cur;
};

const extractReportDataFromAny = (value: any): any => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return undefined;

  // Direct shapes
  if (value.reportData !== undefined) return value.reportData;
  if (value.report_data !== undefined) return value.report_data;

  // Common wrappers
  const a = extractNested(value, ["payload", "reportData"]);
  if (a !== undefined) return a;
  const b = extractNested(value, ["payload", "report_data"]);
  if (b !== undefined) return b;
  const c = extractNested(value, ["reportData", "reportData"]);
  if (c !== undefined) return c;

  // Sometimes the whole object is the wrapper that contains reportData + other fields.
  if (value.payload !== undefined) return extractReportDataFromAny(value.payload);

  return undefined;
};

const extractAnswersFromAny = (value: any): any => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return undefined;
  if (value.answers !== undefined) return value.answers;
  const a = extractNested(value, ["payload", "answers"]);
  if (a !== undefined) return a;
  if (value.payload !== undefined) return extractAnswersFromAny(value.payload);
  return undefined;
};

const readReports = async (): Promise<StoredReport[]> => {
  const raw = await AsyncStorage.getItem(REPORTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as any;
    if (!Array.isArray(parsed)) return [];

    let mutated = false;
    const normalized: StoredReport[] = parsed
      .map((item: any): StoredReport | null => {
        // Current shape
        if (
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.date === "string" &&
          typeof item.created_at === "string" &&
          typeof item.report_data === "string" &&
          typeof item.answers === "string"
        ) {
          let nextAnswers = sanitizeJsonString(item.answers, "[]");
          let nextReportData = sanitizeJsonString(item.report_data, "{}");

          // If a record was partially migrated (e.g. has payload but empty report_data/answers),
          // try to reconstruct from payload.
          const parsedData = safeJsonParse<Record<string, unknown>>(nextReportData, {});
          const hasUsefulData = parsedData && Object.keys(parsedData).length > 0;
          if (!hasUsefulData) {
            // Some older code used camelCase `reportData` on the top-level.
            const topLevelReportData = (item as any).reportData;
            if (topLevelReportData !== undefined) {
              const asString =
                typeof topLevelReportData === "string"
                  ? topLevelReportData
                  : JSON.stringify(topLevelReportData);
              nextReportData = sanitizeJsonString(asString, "{}");
            }
          }

          const reParsedData = safeJsonParse<Record<string, unknown>>(nextReportData, {});
          const reHasUsefulData = reParsedData && Object.keys(reParsedData).length > 0;
          if (!reHasUsefulData && (item as any).payload) {
            const rawPayload = (item as any).payload;
            const payload =
              typeof rawPayload === "string" ? safeJsonParse<any>(rawPayload, {}) : rawPayload ?? {};
            const payloadReportData = extractReportDataFromAny(payload);
            const payloadAnswers = extractAnswersFromAny(payload);

            if (payloadReportData !== undefined) {
              const asString =
                typeof payloadReportData === "string"
                  ? payloadReportData
                  : JSON.stringify(payloadReportData);
              nextReportData = sanitizeJsonString(asString, "{}");
            }

            if (payloadAnswers !== undefined) {
              const asString =
                typeof payloadAnswers === "string" ? payloadAnswers : JSON.stringify(payloadAnswers);
              nextAnswers = sanitizeJsonString(asString, "[]");
            }
          }

          // If after all recovery attempts we still don't have any useful data,
          // drop the record (it's from an old stub save and can't be displayed).
          const finalData = safeJsonParse<any>(nextReportData, {});
          const finalAnswers = safeJsonParse<any>(nextAnswers, []);

          // Unwrap: some old saves stored a wrapper { reportData: {...}, answers: [...] }.
          if (!isMeaningfulReportData(finalData) && finalData?.reportData && typeof finalData.reportData === "object") {
            const unwrapped = finalData.reportData;
            const asString = JSON.stringify(unwrapped);
            nextReportData = sanitizeJsonString(asString, "{}");
          }

          const finalData2 = safeJsonParse<any>(nextReportData, {});
          if (!isMeaningfulReportData(finalData2) && !isMeaningfulAnswers(finalAnswers)) {
            mutated = true;
            return null;
          }

          if (nextAnswers !== item.answers || nextReportData !== item.report_data) {
            mutated = true;
            return {
              ...(item as StoredReport),
              answers: nextAnswers,
              report_data: nextReportData,
            };
          }
          return item as StoredReport;
        }

        // Legacy shape from older web fallback: { id, date, payload }
        if (
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.date === "string" &&
          "payload" in item
        ) {
          mutated = true;
          const rawPayload = (item as any).payload;
          const payload =
            typeof rawPayload === "string" ? safeJsonParse<any>(rawPayload, {}) : rawPayload ?? {};
          const reportData = extractReportDataFromAny(payload) ?? payload ?? {};
          const answers = extractAnswersFromAny(payload) ?? [];
          const now = typeof item.created_at === "string" ? item.created_at : new Date().toISOString();

          const reportDataStr = sanitizeJsonString(
            typeof reportData === "string" ? reportData : JSON.stringify(reportData),
            "{}"
          );
          const answersStr = sanitizeJsonString(
            typeof answers === "string" ? answers : JSON.stringify(answers),
            "[]"
          );

          let parsedData = safeJsonParse<any>(reportDataStr, {});
          // Unwrap legacy wrapper shapes.
          let reportDataStrFinal = reportDataStr;
          if (!isMeaningfulReportData(parsedData) && parsedData?.reportData && typeof parsedData.reportData === "object") {
            reportDataStrFinal = sanitizeJsonString(JSON.stringify(parsedData.reportData), "{}");
            parsedData = safeJsonParse<any>(reportDataStrFinal, {});
          }
          const parsedAnswers = safeJsonParse<any>(answersStr, []);
          if (!isMeaningfulReportData(parsedData) && !isMeaningfulAnswers(parsedAnswers)) {
            // Can't recover anything useful.
            return null;
          }

          return {
            id: item.id,
            user_id: String(payload.userId ?? payload.user_id ?? "web"),
            user_name: String(payload.userName ?? payload.user_name ?? payload.name ?? "NA"),
            user_email: typeof payload.userEmail === "string" ? payload.userEmail : payload.user_email,
            title: String(payload.title ?? "Health Report"),
            answers: answersStr,
            report_data: reportDataStrFinal,
            date: item.date,
            created_at: now,
          };
        }

        return null;
      })
      .filter(Boolean) as StoredReport[];

    if (mutated) {
      await writeReports(normalized);
    }

    return normalized;
  } catch {
    return [];
  }
};

const writeReports = async (reports: StoredReport[]): Promise<void> => {
  await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

const readGroups = async (): Promise<StoredGroup[]> => {
  const raw = await AsyncStorage.getItem(GROUPS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredGroup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeGroups = async (groups: StoredGroup[]): Promise<void> => {
  await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

const readReportGroups = async (): Promise<StoredReportGroup[]> => {
  const raw = await AsyncStorage.getItem(REPORT_GROUPS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredReportGroup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeReportGroups = async (rows: StoredReportGroup[]): Promise<void> => {
  await AsyncStorage.setItem(REPORT_GROUPS_KEY, JSON.stringify(rows));
};

export const addReport = async (
  userId: string,
  userName: string,
  userEmail: string,
  title: string,
  answers: { questionId: number; text: string; points: number }[],
  reportData: unknown,
  groupIds?: string[]
): Promise<string> => {
  const id = `report_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  const reports = await readReports();

  reports.push({
    id,
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
    title,
    answers: JSON.stringify(answers ?? []),
    report_data: JSON.stringify(reportData ?? {}),
    date: todayKey(),
    created_at: now,
  });

  await writeReports(reports);

  if (groupIds && groupIds.length > 0) {
    const rows = await readReportGroups();
    for (const groupId of groupIds) {
      rows.push({ report_id: id, group_id: groupId });
    }
    await writeReportGroups(rows);
  }

  return id;
};

export const getTodayReportCount = async (): Promise<number> => {
  const reports = await readReports();
  const today = todayKey();
  return reports.filter((r) => r.date === today).length;
};

export const getAllReports = async (
  filters: { name?: string; fromDate?: string; toDate?: string; gender?: string } = {},
  limit: number = 10,
  offset: number = 0
) => {
  const reports = await readReports();

  const filtered = reports.filter((r) => {
    if (filters.name) {
      const q = filters.name.toLowerCase();
      if (!String(r.user_name ?? "").toLowerCase().includes(q)) return false;
    }

    if (filters.fromDate) {
      if (r.date < filters.fromDate) return false;
    }

    if (filters.toDate) {
      if (r.date > filters.toDate) return false;
    }

    if (filters.gender) {
      try {
        const parsed = JSON.parse(r.report_data) as any;
        if (String(parsed?.gender ?? "") !== String(filters.gender)) return false;
      } catch {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0));
  return filtered.slice(offset, offset + limit);
};

export const deleteReports = async (reportIds: string[]): Promise<void> => {
  if (!Array.isArray(reportIds) || reportIds.length === 0) return;
  const reports = await readReports();
  const kept = reports.filter((r) => !reportIds.includes(r.id));
  await writeReports(kept);

  // Remove report-group mappings too.
  const rows = await readReportGroups();
  const keptRows = rows.filter((row) => !reportIds.includes(row.report_id));
  await writeReportGroups(keptRows);
};

export const createGroup = async (name: string, description?: string): Promise<string> => {
  const id = `group_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const groups = await readGroups();
  groups.push({
    id,
    name,
    description: description ?? "",
    created_at: new Date().toISOString(),
  });
  await writeGroups(groups);
  return id;
};

export const addReportsToGroup = async (groupId: string, reportIds: string[]): Promise<void> => {
  if (!groupId || !Array.isArray(reportIds) || reportIds.length === 0) return;
  const rows = await readReportGroups();
  for (const reportId of reportIds) {
    const exists = rows.some((r) => r.group_id === groupId && r.report_id === reportId);
    if (!exists) rows.push({ group_id: groupId, report_id: reportId });
  }
  await writeReportGroups(rows);
};

export const getReportsByGroup = async (
  groupId: string,
  filters: { name?: string; fromDate?: string; toDate?: string; gender?: string } = {}
) => {
  const rows = await readReportGroups();
  const ids = new Set(rows.filter((r) => r.group_id === groupId).map((r) => r.report_id));
  const all = await getAllReports(filters, Number.MAX_SAFE_INTEGER, 0);
  return all.filter((r: StoredReport) => ids.has(r.id));
};

export const deleteReportsFromGroup = async (groupId: string, reportIds: string[]): Promise<void> => {
  if (!groupId || !Array.isArray(reportIds) || reportIds.length === 0) return;
  const rows = await readReportGroups();
  const kept = rows.filter((r) => !(r.group_id === groupId && reportIds.includes(r.report_id)));
  await writeReportGroups(kept);
};

export const getReportCountByGroup = async (groupId: string): Promise<number> => {
  const rows = await readReportGroups();
  return rows.filter((r) => r.group_id === groupId).length;
};

export const getAllGroups = async () => {
  const groups = await readGroups();
  const rows = await readReportGroups();

  const byGroup = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.group_id] = (acc[row.group_id] ?? 0) + 1;
    return acc;
  }, {});

  return groups
    .slice()
    .sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0))
    .map((g) => ({
      ...g,
      report_count: byGroup[g.id] ?? 0,
      created_at: g.created_at.split("T")[0],
    }));
};

export const deleteGroups = async (groupIds: string[]): Promise<void> => {
  if (!Array.isArray(groupIds) || groupIds.length === 0) return;
  const groups = await readGroups();
  const kept = groups.filter((g) => !groupIds.includes(g.id));
  await writeGroups(kept);

  const rows = await readReportGroups();
  const keptRows = rows.filter((r) => !groupIds.includes(r.group_id));
  await writeReportGroups(keptRows);
};

export const saveSettings = async (
  image?: string | null,
  phoneNumber?: string | null,
  address?: string | null
) => {
  const payload = { image: image ?? null, phoneNumber: phoneNumber ?? null, address: address ?? null };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
  return payload;
};

export const getSettings = async () => {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { image?: string | null; phoneNumber?: string | null; address?: string | null };
  } catch {
    return null;
  }
};

export const updateImage = async (image: string) => saveSettings(image, null, null);
export const updatePhoneNumber = async (phoneNumber: string) => saveSettings(null, phoneNumber, null);
export const updateAddress = async (address: string) => saveSettings(null, null, address);

export const exportGroupReportsToCSV = async (
  _groupId: string,
  _groupName: string
): Promise<string> => {
  throw new Error("CSV export is not supported on web yet.");
};

export const getTotalReportCount = async () => {
  const reports = await readReports();
  return reports.length;
};
