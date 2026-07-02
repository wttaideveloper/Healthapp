import { Alert, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import Button from "../components/Button";
import * as FileSystem from "expo-file-system";
import { PDFDocument, rgb } from "pdf-lib";
import { Asset } from "expo-asset";
import { icons } from "../components/images";
import Font from "../components/CustomisedFont";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { getSettings } from "../components/utils/reportService";
import i18n from "../components/i18n";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import * as Sharing from "expo-sharing";

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

type SettingsRecord = {
  image?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
};

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

const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < buffer.byteLength; i += 1) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
};

const PrintScreen: React.FC<PrintScreenProps> = ({ navigation, route }) => {
  const [customReport, setCustomReport] = React.useState<{
    imageUri: string;
    phoneNumber: string;
    address: string;
  }>({
    imageUri: "",
    phoneNumber: "",
    address: "",
  });
  const { t } = useTranslation();
  const [downloadModal, setDownloadModal] = React.useState(false);

  const docType: DocType = route.params.screen === "Report" ? "Report" : "Questionnaire";
  const language = normalizeLanguage(i18n?.language);

  const previewAsset =
    docType === "Report" ? reportPreviewA4[language] : questionnairePreviewA4[language];

  const fetchReportSettings = async () => {
    const currentSettings = (await getSettings()) as SettingsRecord | null;
    setCustomReport({
      imageUri: currentSettings?.image ?? "",
      phoneNumber: currentSettings?.phoneNumber ?? "",
      address: currentSettings?.address ?? "",
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchReportSettings();
    }, [])
  );

  const getTemplateAsset = (paperSize: PaperSize): number => {
    const templates = docType === "Report" ? reportTemplates : questionnaireTemplates;
    return templates[paperSize][language] ?? templates[paperSize].en;
  };

  const buildCustomizedPdf = async (paperSize: PaperSize): Promise<string> => {
    const templateModule = getTemplateAsset(paperSize);
    const templateAsset = Asset.fromModule(templateModule);
    await templateAsset.downloadAsync();

    if (!templateAsset.localUri) {
      throw new Error("Failed to load PDF template.");
    }

    const base64Template = await FileSystem.readAsStringAsync(templateAsset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const pdfDoc = await PDFDocument.load(base64Template);
    const firstPage = pdfDoc.getPages()[0];

    if (customReport.imageUri) {
      try {
        const imgBytes = await FileSystem.readAsStringAsync(customReport.imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        let image;
        try {
          image = await pdfDoc.embedPng(imgBytes);
        } catch {
          image = await pdfDoc.embedJpg(imgBytes);
        }

        firstPage.drawImage(image, {
          x: 5,
          y: 0,
          width: 30,
          height: 30,
        });
      } catch (error) {
        console.error("Failed to embed logo:", error);
      }
    }

    const contactLine = [customReport.address, customReport.phoneNumber]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join("  |  ");

    if (contactLine) {
      firstPage.drawText(contactLine, {
        x: 70,
        y: 15,
        size: 10,
        color: rgb(0, 0, 0),
        maxWidth: 430,
        lineHeight: 12,
      });
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const outputFileName =
      `${docType.toLowerCase()}_${paperSize.toLowerCase()}_${language}_${Date.now()}.pdf`;
    const outputPath = `${FileSystem.documentDirectory}${outputFileName}`;

    await FileSystem.writeAsStringAsync(outputPath, arrayBufferToBase64(modifiedPdfBytes), {
      encoding: FileSystem.EncodingType.Base64,
    });

    return outputPath;
  };

  const saveOrSharePdf = async (pdfPath: string) => {
    const fileName = pdfPath.split("/").pop() ?? "healthage.pdf";

    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(pdfPath, {
            mimeType: "application/pdf",
            dialogTitle: t("downloadOptions"),
            UTI: "com.adobe.pdf",
          });
        }
        return;
      }

      const base64Pdf = await FileSystem.readAsStringAsync(pdfPath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const destinationUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        "application/pdf"
      );
      await FileSystem.writeAsStringAsync(destinationUri, base64Pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Alert.alert(t("pdfDownloaded"), fileName);
      return;
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfPath, {
        mimeType: "application/pdf",
        dialogTitle: t("downloadOptions"),
        UTI: "com.adobe.pdf",
      });
      return;
    }

    Alert.alert(t("Error"));
  };

  const handleGenerate = async (paperSize: PaperSize) => {
    try {
      const outputPath = await buildCustomizedPdf(paperSize);
      await saveOrSharePdf(outputPath);
      setDownloadModal(false);
    } catch (error) {
      console.error("PDF generation failed:", error);
      Alert.alert(t("Error"));
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Font
          text={docType === "Report" ? "PrintReport" : "PrintQuestion"}
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={{
            flexDirection: "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Font
            text="Fs_Close"
            style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
          />
          <Image source={icons.close} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={previewAsset}
          style={{
            width: "100%",
            height: 405,
            borderWidth: 2,
            borderColor: "#DFE9F0",
            borderRadius: 12,
          }}
          resizeMode="contain"
        />
      </View>

      <Button
        title="Hs_Download"
        style={{ padding: 10, marginTop: 40 }}
        onPress={() => setDownloadModal(true)}
      />

      <Modal
        isVisible={downloadModal}
        onBackdropPress={() => setDownloadModal(false)}
        onSwipeComplete={() => setDownloadModal(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Font
            text="downloadOptions"
            style={{ color: "#274273", fontSize: 18, fontWeight: 700 }}
          />
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#F4F6F9",
              marginVertical: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => handleGenerate("A4_SIZE")}
            style={styles.option}
          >
            <Font text="a4Size" style={styles.optionText} />
            <Image
              source={icons.Arrow}
              style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleGenerate("US_LETTER")}
            style={styles.option}
          >
            <Font text="usLetter" style={styles.optionText} />
            <Image
              source={icons.Arrow}
              style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PrintScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    backgroundColor: "#f9fafc",
    marginVertical: 5,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 999999,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    color: "#0B9FD4",
    fontWeight: 500,
    fontSize: 16,
  },
});
