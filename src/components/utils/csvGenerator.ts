// Pure CSV helpers (no React Native / Expo imports) so they can be unit tested with `node --test`.

/**
 * Escape one CSV field per RFC 4180: wrap in double quotes when the value contains a
 * comma, quote, CR/LF or leading/trailing whitespace, and double any embedded quotes.
 *
 * Values that a spreadsheet would execute as a formula (leading = + @ tab or CR, or a
 * leading "-" that is not a plain number) are prefixed with an apostrophe so user-entered
 * text such as a name cannot become a formula when the file is opened in Excel/Sheets.
 */
export const escapeCsvField = (input: unknown): string => {
  let value: string;
  if (input === null || input === undefined) {
    value = "";
  } else if (typeof input === "object") {
    value = JSON.stringify(input);
  } else {
    value = String(input);
  }

  const isPlainNumber = /^-?\d+(\.\d+)?$/.test(value);
  if (/^[=+@\t\r]/.test(value) || (value.startsWith("-") && !isPlainNumber)) {
    value = `'${value}`;
  }

  if (/[",\r\n]/.test(value) || value !== value.trim()) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

/**
 * Build CSV text from row objects. The header row is the union of the keys of every row
 * (first-seen order), so a row with extra fields never loses columns.
 */
export const generateCSV = (data: Record<string, any>[]): string => {
  if (!data.length) return "";

  const headers: string[] = [];
  const seen = new Set<string>();
  for (const row of data) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    }
  }

  const rows = data.map((row) =>
    headers.map((header) => escapeCsvField(row[header])).join(",")
  );

  return [headers.map(escapeCsvField).join(","), ...rows].join("\r\n");
};

export type StoredReportRow = {
  id: string;
  user_name?: string | null;
  user_email?: string | null;
  title?: string | null;
  date?: string | null;
  report_data?: string | null;
};

/**
 * Flatten stored report rows into CSV-ready objects. `report_data` is a JSON string; a
 * row whose JSON is missing or corrupt is still exported (with its identity columns)
 * instead of failing the whole export.
 */
export const buildReportRows = (reports: StoredReportRow[]): Record<string, any>[] =>
  reports.map((report) => {
    let metrics: Record<string, any> = {};
    try {
      const parsed = report.report_data ? JSON.parse(report.report_data) : {};
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        metrics = parsed;
      }
    } catch {
      metrics = {};
    }
    return {
      "Report ID": report.id,
      "User Name": report.user_name ?? "",
      "User Email": report.user_email ?? "",
      "Report Title": report.title ?? "",
      Date: report.date ?? "",
      ...metrics,
    };
  });

/** UTF-8 byte-order mark so Excel opens non-ASCII names correctly. */
export const CSV_BOM = "﻿";

/** Safe `<group>_Reports_<YYYY-MM-DD>.csv` file name. */
export const buildCsvFileName = (groupName: string, date: Date = new Date()): string => {
  const safeName = (groupName || "Group").replace(/[^a-z0-9]/gi, "_") || "Group";
  return `${safeName}_Reports_${date.toISOString().split("T")[0]}.csv`;
};

export class EmptyGroupExportError extends Error {
  constructor() {
    super("No reports found in this group");
    this.name = "EmptyGroupExportError";
  }
}
