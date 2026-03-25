import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import Button from "../components/Button";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import i18n from "../components/i18n";

type PrintScreenProps = DrawerScreenProps<DrawerParamList, "PrintScreen">;
type PaperSize = "A4_SIZE" | "US_LETTER";
type DocType = "Report" | "Questionnaire";
type LanguageCode =
  | "da"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "hi"
  | "ja"
  | "ko"
  | "mg"
  | "pt"
  | "ru"
  | "ta"
  | "vi"
  | "zh";

const SUPPORTED_LANGUAGES: LanguageCode[] = [
  "da",
  "de",
  "en",
  "es",
  "fr",
  "hi",
  "ja",
  "ko",
  "mg",
  "pt",
  "ru",
  "ta",
  "vi",
  "zh",
];

const normalizeLanguage = (value: string | undefined): LanguageCode => {
  const base = (value ?? "en").toLowerCase().split("-")[0] as LanguageCode;
  return SUPPORTED_LANGUAGES.includes(base) ? base : "en";
};

const reportPreviewA4: Record<LanguageCode, number> = {
  da: require("../../assets/files/Reports/A4_SIZE/Report_da.png"),
  de: require("../../assets/files/Reports/A4_SIZE/Report_de.png"),
  en: require("../../assets/files/Reports/A4_SIZE/Report_en.png"),
  es: require("../../assets/files/Reports/A4_SIZE/Report_es.png"),
  fr: require("../../assets/files/Reports/A4_SIZE/Report_fr.png"),
  hi: require("../../assets/files/Reports/A4_SIZE/Report_hi.png"),
  ja: require("../../assets/files/Reports/A4_SIZE/Report_ja.png"),
  ko: require("../../assets/files/Reports/A4_SIZE/Report_ko.png"),
  mg: require("../../assets/files/Reports/A4_SIZE/Report_mg.png"),
  pt: require("../../assets/files/Reports/A4_SIZE/Report_pt.png"),
  ru: require("../../assets/files/Reports/A4_SIZE/Report_ru.png"),
  ta: require("../../assets/files/Reports/A4_SIZE/Report_ta.png"),
  vi: require("../../assets/files/Reports/A4_SIZE/Report_vi.png"),
  zh: require("../../assets/files/Reports/A4_SIZE/Report_zh.png"),
};

const questionnairePreviewA4: Record<LanguageCode, number> = {
  da: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_da.png"),
  de: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_de.png"),
  en: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_en.png"),
  es: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_es.png"),
  fr: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_fr.png"),
  hi: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_hi.png"),
  ja: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_ja.png"),
  ko: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_ko.png"),
  mg: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_mg.png"),
  pt: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_pt.png"),
  ru: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_ru.png"),
  ta: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_ta.png"),
  vi: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_vi.png"),
  zh: require("../../assets/files/Questionnaires/A4_SIZE/Questionnaire_zh.png"),
};

const reportTemplates: Record<PaperSize, Record<LanguageCode, number>> = {
  A4_SIZE: {
    da: require("../../assets/files/Reports/A4_SIZE/da.pdf"),
    de: require("../../assets/files/Reports/A4_SIZE/de.pdf"),
    en: require("../../assets/files/Reports/A4_SIZE/en.pdf"),
    es: require("../../assets/files/Reports/A4_SIZE/es.pdf"),
    fr: require("../../assets/files/Reports/A4_SIZE/fr.pdf"),
    hi: require("../../assets/files/Reports/A4_SIZE/hi.pdf"),
    ja: require("../../assets/files/Reports/A4_SIZE/ja.pdf"),
    ko: require("../../assets/files/Reports/A4_SIZE/ko.pdf"),
    mg: require("../../assets/files/Reports/A4_SIZE/mg.pdf"),
    pt: require("../../assets/files/Reports/A4_SIZE/pt.pdf"),
    ru: require("../../assets/files/Reports/A4_SIZE/ru.pdf"),
    ta: require("../../assets/files/Reports/A4_SIZE/ta.pdf"),
    vi: require("../../assets/files/Reports/A4_SIZE/vi.pdf"),
    zh: require("../../assets/files/Reports/A4_SIZE/zh.pdf"),
  },
  US_LETTER: {
    da: require("../../assets/files/Reports/US_LETTER/da.pdf"),
    de: require("../../assets/files/Reports/US_LETTER/de.pdf"),
    en: require("../../assets/files/Reports/US_LETTER/en.pdf"),
    es: require("../../assets/files/Reports/US_LETTER/es.pdf"),
    fr: require("../../assets/files/Reports/US_LETTER/fr.pdf"),
    hi: require("../../assets/files/Reports/US_LETTER/hi.pdf"),
    ja: require("../../assets/files/Reports/US_LETTER/ja.pdf"),
    ko: require("../../assets/files/Reports/US_LETTER/ko.pdf"),
    mg: require("../../assets/files/Reports/US_LETTER/mg.pdf"),
    pt: require("../../assets/files/Reports/US_LETTER/pt.pdf"),
    ru: require("../../assets/files/Reports/US_LETTER/ru.pdf"),
    ta: require("../../assets/files/Reports/US_LETTER/ta.pdf"),
    vi: require("../../assets/files/Reports/US_LETTER/vi.pdf"),
    zh: require("../../assets/files/Reports/US_LETTER/zh.pdf"),
  },
};

const questionnaireTemplates: Record<PaperSize, Record<LanguageCode, number>> = {
  A4_SIZE: {
    da: require("../../assets/files/Questionnaires/A4_SIZE/da.pdf"),
    de: require("../../assets/files/Questionnaires/A4_SIZE/de.pdf"),
    en: require("../../assets/files/Questionnaires/A4_SIZE/en.pdf"),
    es: require("../../assets/files/Questionnaires/A4_SIZE/es.pdf"),
    fr: require("../../assets/files/Questionnaires/A4_SIZE/fr.pdf"),
    hi: require("../../assets/files/Questionnaires/A4_SIZE/hi.pdf"),
    ja: require("../../assets/files/Questionnaires/A4_SIZE/ja.pdf"),
    ko: require("../../assets/files/Questionnaires/A4_SIZE/ko.pdf"),
    mg: require("../../assets/files/Questionnaires/A4_SIZE/mg.pdf"),
    pt: require("../../assets/files/Questionnaires/A4_SIZE/pt.pdf"),
    ru: require("../../assets/files/Questionnaires/A4_SIZE/ru.pdf"),
    ta: require("../../assets/files/Questionnaires/A4_SIZE/ta.pdf"),
    vi: require("../../assets/files/Questionnaires/A4_SIZE/vi.pdf"),
    zh: require("../../assets/files/Questionnaires/A4_SIZE/zh.pdf"),
  },
  US_LETTER: {
    da: require("../../assets/files/Questionnaires/US_LETTER/da.pdf"),
    de: require("../../assets/files/Questionnaires/US_LETTER/de.pdf"),
    en: require("../../assets/files/Questionnaires/US_LETTER/en.pdf"),
    es: require("../../assets/files/Questionnaires/US_LETTER/es.pdf"),
    fr: require("../../assets/files/Questionnaires/US_LETTER/fr.pdf"),
    hi: require("../../assets/files/Questionnaires/US_LETTER/hi.pdf"),
    ja: require("../../assets/files/Questionnaires/US_LETTER/ja.pdf"),
    ko: require("../../assets/files/Questionnaires/US_LETTER/ko.pdf"),
    mg: require("../../assets/files/Questionnaires/US_LETTER/mg.pdf"),
    pt: require("../../assets/files/Questionnaires/US_LETTER/pt.pdf"),
    ru: require("../../assets/files/Questionnaires/US_LETTER/ru.pdf"),
    ta: require("../../assets/files/Questionnaires/US_LETTER/ta.pdf"),
    vi: require("../../assets/files/Questionnaires/US_LETTER/vi.pdf"),
    zh: require("../../assets/files/Questionnaires/US_LETTER/zh.pdf"),
  },
};

const downloadAssetPdf = async (moduleId: number, fileName: string) => {
  const asset = Asset.fromModule(moduleId);
  await asset.downloadAsync();
  const res = await fetch(asset.uri);
  if (!res.ok) {
    throw new Error(`Failed to fetch PDF asset: ${res.status}`);
  }
  const ab = await res.arrayBuffer();
  const blob = new Blob([ab], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const PrintScreenWeb: React.FC<PrintScreenProps> = ({ navigation, route }) => {
  const docType: DocType = route.params.screen === "Report" ? "Report" : "Questionnaire";
  const language = normalizeLanguage(i18n?.language);

  const previewAsset =
    docType === "Report" ? reportPreviewA4[language] : questionnairePreviewA4[language];

  const getTemplateAsset = (paperSize: PaperSize): number => {
    const templates = docType === "Report" ? reportTemplates : questionnaireTemplates;
    return templates[paperSize][language] ?? templates[paperSize].en;
  };

  const handleDownload = async (paperSize: PaperSize) => {
    try {
      const template = getTemplateAsset(paperSize);
      const fileName = `${docType.toLowerCase()}_${paperSize.toLowerCase()}_${language}.pdf`;
      await downloadAssetPdf(template, fileName);
      Alert.alert("Downloaded", fileName);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Download failed";
      Alert.alert("Error", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Font
          text={docType === "Report" ? "PrintReport" : "PrintQuestion"}
          style={styles.headerTitle}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.closeBtn}>
          <Font text="Fs_Close" style={styles.closeText} />
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.previewWrap}>
        <Image source={previewAsset} style={styles.preview} resizeMode="contain" />
      </View>

      <Button title="Hs_Download" style={styles.primaryBtn} onPress={() => handleDownload("A4_SIZE")} />
      <Button
        title="Download US Letter"
        style={styles.secondaryBtn}
        onPress={() => handleDownload("US_LETTER")}
      />

      <Text style={styles.note}>
        Web downloads use the built-in PDF templates (no logo/address customization on web yet).
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 20, paddingTop: 10 },
  header: { marginVertical: 20, flexDirection: "row", justifyContent: "space-between" },
  headerTitle: { fontWeight: 700, fontSize: 20, color: "#262F40" },
  closeBtn: { flexDirection: "row", gap: 4, justifyContent: "center", alignItems: "center" },
  closeText: { fontWeight: 500, fontSize: 16, color: "#0C9FD5" },
  closeIcon: { width: 25, height: 25 },
  previewWrap: { flexDirection: "row", width: "100%", justifyContent: "center" },
  preview: {
    width: "100%",
    height: 405,
    borderWidth: 2,
    borderColor: "#DFE9F0",
    borderRadius: 12,
  },
  primaryBtn: { padding: 10, marginTop: 30 },
  secondaryBtn: { padding: 10, marginTop: 12 },
  note: { marginTop: 14, color: "#7D8699", fontSize: 12, lineHeight: 16, textAlign: "center" },
});

export default PrintScreenWeb;

