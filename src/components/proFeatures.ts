// Single source of truth for the Premium feature list shown on the purchase screens
// (native PurchaseScreen.tsx and web PurchaseScreen.web.tsx). Each key maps to a
// confirmed Premium-gated feature - do not add entries that are not backed by real,
// gated functionality (App Review Guideline 3.1.2 requires accurate disclosure).
export const PRO_FEATURE_KEYS = [
  "proFeatureUnlimitedAssessments",
  "proFeatureReportHistory",
  "proFeatureCsvExport",
  "proFeaturePrinting",
  "proFeatureReportBranding",
] as const;
