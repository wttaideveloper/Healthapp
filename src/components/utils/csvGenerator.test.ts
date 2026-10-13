// Run with: node --test src/components/utils/csvGenerator.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCsvFileName,
  buildReportRows,
  escapeCsvField,
  generateCSV,
} from "./csvGenerator.ts";

test("escapes commas, quotes and line breaks", () => {
  assert.equal(escapeCsvField("a,b"), '"a,b"');
  assert.equal(escapeCsvField('say "hi"'), '"say ""hi"""');
  assert.equal(escapeCsvField("line1\nline2"), '"line1\nline2"');
  assert.equal(escapeCsvField("line1\r\nline2"), '"line1\r\nline2"');
  assert.equal(escapeCsvField(" padded "), '" padded "');
  assert.equal(escapeCsvField("plain"), "plain");
});

test("handles null, undefined, booleans, numbers and objects", () => {
  assert.equal(escapeCsvField(null), "");
  assert.equal(escapeCsvField(undefined), "");
  assert.equal(escapeCsvField(true), "true");
  assert.equal(escapeCsvField(42), "42");
  assert.equal(escapeCsvField(-5.5), "-5.5");
  assert.equal(escapeCsvField({ a: 1 }), '"{""a"":1}"');
});

test("neutralizes spreadsheet formulas but keeps negative numbers", () => {
  assert.equal(escapeCsvField("=1+1"), "'=1+1");
  assert.equal(escapeCsvField("+SUM(A1)"), "'+SUM(A1)");
  assert.equal(escapeCsvField("@cmd"), "'@cmd");
  assert.equal(escapeCsvField("-cmd"), "'-cmd");
  assert.equal(escapeCsvField("-12"), "-12");
});

test("generateCSV returns empty string for no rows", () => {
  assert.equal(generateCSV([]), "");
});

test("generateCSV uses the union of keys across rows", () => {
  const csv = generateCSV([{ a: 1 }, { a: 2, b: "x,y" }]);
  assert.equal(csv, 'a,b\r\n1,\r\n2,"x,y"');
});

test("buildReportRows spreads metrics and survives corrupt JSON", () => {
  const rows = buildReportRows([
    {
      id: "r1",
      user_name: "Ann, Jr.",
      date: "2026-01-02",
      report_data: JSON.stringify({ healthAge: "40", fasting: true }),
    },
    { id: "r2", report_data: "{not json" },
    { id: "r3", report_data: null },
  ]);
  assert.equal(rows.length, 3);
  assert.equal(rows[0]["User Name"], "Ann, Jr.");
  assert.equal(rows[0].healthAge, "40");
  assert.equal(rows[1]["Report ID"], "r2");
  assert.equal(rows[2]["Report ID"], "r3");
  const csv = generateCSV(rows);
  assert.ok(csv.split("\r\n")[0].includes("healthAge"));
  assert.ok(csv.includes('"Ann, Jr."'));
});

test("buildCsvFileName sanitizes the group name", () => {
  assert.equal(
    buildCsvFileName("My group/..", new Date("2026-03-04T10:00:00Z")),
    "My_group____Reports_2026-03-04.csv"
  );
  assert.equal(
    buildCsvFileName("***", new Date("2026-03-04T10:00:00Z")),
    "____Reports_2026-03-04.csv"
  );
});
