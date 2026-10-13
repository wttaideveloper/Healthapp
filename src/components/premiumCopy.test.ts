// Run with: node --test src/components/premiumCopy.test.ts
//
// Guards the Premium/Pro marketing copy. It reads source files as text (i18n.ts imports Expo
// modules and cannot be loaded under node), so it checks structure and wording, not rendering.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PRO_FEATURE_KEYS } from "./proFeatures.ts";

const here = dirname(fileURLToPath(import.meta.url));
const read = (relative: string) => readFileSync(join(here, relative), "utf8").replace(/\r\n/g, "\n");

const i18n = read("i18n.ts");

// One block per language: `  xx: {` followed by `    translation: {`.
const blocks: Record<string, string> = {};
{
  const lines = i18n.split("\n");
  const starts: Array<{ lang: string; index: number }> = [];
  const seen = new Set<string>();
  for (let i = 0; i < lines.length - 1; i++) {
    const m = /^  ([a-z]+): \{\s*$/.exec(lines[i]);
    if (m && /translation:\s*\{/.test(lines[i + 1])) {
      if (seen.has(m[1])) break;
      seen.add(m[1]);
      starts.push({ lang: m[1], index: i });
    }
  }
  starts.forEach((s, idx) => {
    blocks[s.lang] = lines.slice(s.index, idx + 1 < starts.length ? starts[idx + 1].index : lines.length).join("\n");
  });
}

const languages = Object.keys(blocks);
const hasKey = (lang: string, key: string) => new RegExp(`^\\s*${key}:`, "m").test(blocks[lang]);
const valueOf = (lang: string, key: string): string => {
  const m = new RegExp(`^\\s*${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m").exec(blocks[lang]);
  assert.ok(m, `${lang}.${key} missing`);
  return m[1];
};

test("all 25 language bundles are found", () => {
  assert.equal(languages.length, 25);
});

const modalSource = read("upgradeModal.tsx");
const modalKeys = [...modalSource.matchAll(/(?:titleKey|descKey): "([A-Za-z]+)"/g)].map((m) => m[1]);

test("the Premium modal lists exactly the six audited benefits", () => {
  assert.deepEqual(
    modalKeys.filter((k) => k.endsWith("Title")),
    [
      "unlimitedAssessmentsTitle",
      "assessmentHistoryTitle",
      "csvExportTitle",
      "printHealthReportsTitle",
      "printableQuestionnaireTitle",
      "personalizedReportBrandingTitle",
    ]
  );
});

test("every key used by the modal, the purchase pages and the menus exists in every language", () => {
  const required = [
    ...modalKeys,
    ...PRO_FEATURE_KEYS,
    "proIncludesTitle",
    "premiumSubtitle",
    "unlockHealthAgePremium",
    "annualSubscriptionSub",
    "autoRenewTerms",
    "upgradeToPremium",
    "menuTooltipQuestionnaire",
    "menuTooltipPrintReport",
    "menuTooltipReportSettings",
    "updateLogoContactDesc",
    "signUpHeroDesc",
    "JoinPro",
    "exportCsv",
    "purchasePending",
    "purchasePendingDesc",
  ];
  const missing: string[] = [];
  for (const lang of languages) {
    for (const key of required) if (!hasKey(lang, key)) missing.push(`${lang}.${key}`);
  }
  assert.deepEqual(missing, []);
});

test("purchase pages (native and web) both render the shared feature list", () => {
  for (const file of ["../screens/PurchaseScreen.tsx", "../screens/PurchaseScreen.web.tsx"]) {
    const source = read(file);
    assert.match(source, /from "\.\.\/components\/proFeatures"/, `${file} must import proFeatures`);
    assert.match(source, /PRO_FEATURE_KEYS\.map/, `${file} must render PRO_FEATURE_KEYS`);
  }
});

test("the web purchase page uses the audited subtitle and no unverified popularity tag", () => {
  const web = read("../screens/PurchaseScreen.web.tsx");
  assert.match(web, /t\("premiumSubtitle"\)/);
  assert.doesNotMatch(web, /unlockClinicalInsights|t\("popular"\)/);
});

test("unsupported claims are gone from every language", () => {
  const removedKeys = [
    "unlockClinicalInsights",
    "detailedBiomarkerAnalysis",
    "pdfReportExports",
    "prioritySupport",
    "organizedReportHistoryTitle",
    "organizedReportHistoryDesc",
  ];
  const leftovers: string[] = [];
  for (const lang of languages) for (const key of removedKeys) if (hasKey(lang, key)) leftovers.push(`${lang}.${key}`);
  assert.deepEqual(leftovers, []);
});

test("English Premium copy makes no unsupported claims", () => {
  const keys = [
    ...modalKeys,
    ...PRO_FEATURE_KEYS,
    "premiumSubtitle",
    "menuTooltipQuestionnaire",
    "menuTooltipPrintReport",
    "menuTooltipReportSettings",
    "updateLogoContactDesc",
    "signUpHeroDesc",
    "JoinPro",
  ];
  const banned = /clinical|biomarker|priority support|cloud|backup|sync(?!ed)|customized health reports|exported reports|exclusive|PDF report export/i;
  for (const key of keys) {
    const text = valueOf("en", key);
    assert.doesNotMatch(text, banned, `en.${key}: "${text}"`);
  }
});

test("local-only storage is not described as cloud or cross-device in English", () => {
  assert.match(valueOf("en", "assessmentHistoryDesc"), /on this device/i);
  assert.match(valueOf("en", "proFeatureReportHistory"), /on this device/i);
});

test("the printable form is described as blank, not as a completed results report", () => {
  assert.match(valueOf("en", "printHealthReportsTitle"), /form/i);
  assert.match(valueOf("en", "printHealthReportsDesc"), /blank/i);
  assert.match(valueOf("en", "menuTooltipPrintReport"), /blank/i);
  assert.match(valueOf("en", "proFeaturePrinting"), /blank/i);
});

test("branding is described as applying to printable forms only", () => {
  for (const key of ["personalizedReportBrandingDesc", "proFeatureReportBranding", "menuTooltipReportSettings", "updateLogoContactDesc"]) {
    assert.match(valueOf("en", key), /printable forms/i, key);
  }
});

test("the price is not part of the translated copy (it comes from the store or the fixed $49/year fallback)", () => {
  const web = read("../screens/PurchaseScreen.web.tsx");
  assert.match(web, /\$49/);
  assert.match(read("../screens/PurchaseScreen.tsx"), /FALLBACK_PLAN_PRICE = "\$49\/year"/);
});
