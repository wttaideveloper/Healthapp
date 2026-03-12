import * as XLSX from "xlsx";
import { Asset } from "expo-asset";

// Web-safe reader: expo-file-system methods used in native are unavailable on web.
// We fetch the asset data via its URI and parse with xlsx.

export const readExcelFile = async () => {
  try {
    const asset = Asset.fromModule(
      require("../../../assets/files/Health_Age_Table.xlsx")
    );
    await asset.downloadAsync();

    const res = await fetch(asset.uri);
    if (!res.ok) {
      throw new Error(`Failed to fetch excel asset: ${res.status}`);
    }

    const ab = await res.arrayBuffer();
    const workbook = XLSX.read(ab, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file (web):", error);
    return null;
  }
};

export const calculateHealthAge = (
  data: any[],
  age: number,
  habitScore: number
): number | null => {
  try {
    const ageRow = data.find((row: any) => Number(row[0]) === age);
    if (!ageRow) return null;

    const headers = data[0].map((col: string) => col.trim());
    const habitScoreColumn = headers.indexOf(`Habit Score: ${habitScore}`);
    if (habitScoreColumn === -1) return null;

    const healthAgeDelta = ageRow[habitScoreColumn];
    if (typeof healthAgeDelta !== "number") return null;

    const HealthAge = age + healthAgeDelta;
    return Math.round(HealthAge * 10) / 10;
  } catch (error) {
    console.error("Error calculating health age (web):", error);
    return null;
  }
};

export const calculatePotentialHealthAge = (
  data: any[],
  age: number,
  habitScore: number
): number | null => {
  try {
    const ageRow = data.find((row: any) => Number(row[0]) === age);
    if (!ageRow) return null;

    const headers = data[0].map((col: string) => col.trim());
    const habitScoreColumn = headers.indexOf(`Habit Score: ${habitScore}`);
    if (habitScoreColumn === -1) return null;

    const healthAgeDelta = ageRow[habitScoreColumn];
    if (typeof healthAgeDelta !== "number") return null;

    const potentialHealthAge = age + healthAgeDelta;
    return Math.round(potentialHealthAge * 10) / 10;
  } catch (error) {
    console.error("Error calculating potential age (web):", error);
    return null;
  }
};

