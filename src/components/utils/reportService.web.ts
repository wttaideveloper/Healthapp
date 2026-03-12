import AsyncStorage from "@react-native-async-storage/async-storage";

// Web fallback implementation for reportService.
// The native implementation uses SQLite. On web we use AsyncStorage for minimal persistence.

const REPORTS_KEY = "web_reports";
const SETTINGS_KEY = "web_settings";

type StoredReport = {
  id: string;
  date: string; // YYYY-MM-DD
  payload: unknown;
};

const todayKey = (): string => new Date().toISOString().split("T")[0];

const readReports = async (): Promise<StoredReport[]> => {
  const raw = await AsyncStorage.getItem(REPORTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredReport[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeReports = async (reports: StoredReport[]): Promise<void> => {
  await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const addReport = async (): Promise<string> => {
  const id = `report_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const reports = await readReports();
  reports.push({ id, date: todayKey(), payload: {} });
  await writeReports(reports);
  return id;
};

export const getTodayReportCount = async (): Promise<number> => {
  const reports = await readReports();
  const today = todayKey();
  return reports.filter((r) => r.date === today).length;
};

export const getAllReports = async () => {
  // Keep History screen bootable; return empty or minimal data.
  return [];
};

export const deleteReports = async (): Promise<void> => {
  return;
};

export const createGroup = async (): Promise<string> => {
  return `group_${Date.now()}`;
};

export const addReportsToGroup = async (): Promise<void> => {
  return;
};

export const getReportsByGroup = async () => {
  return [];
};

export const deleteReportsFromGroup = async (): Promise<void> => {
  return;
};

export const getReportCountByGroup = async (): Promise<number> => {
  return 0;
};

export const getAllGroups = async () => {
  return [];
};

export const deleteGroups = async (): Promise<void> => {
  return;
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

export const exportGroupReportsToCSV = async (): Promise<string> => {
  throw new Error("CSV export is not supported on web yet.");
};

export const getTotalReportCount = async () => {
  const reports = await readReports();
  return reports.length;
};

