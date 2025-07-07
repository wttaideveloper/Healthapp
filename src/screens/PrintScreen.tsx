import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { PDFDocument, rgb } from "pdf-lib";
import { Asset } from "expo-asset";
import { icons } from "../components/images";
import Font from "../components/CustomisedFont";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";
import CustomInput from "../components/CustomInput";
import { useFocusEffect } from "@react-navigation/native";
import { getSettings } from "../components/utils/reportService";
import RNFS from "react-native-fs";
import i18n from "../components/i18n";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

type PrintScreenProps = DrawerScreenProps<DrawerParamList, "PrintScreen">;

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
  const fetchReportSettings = async () => {
    const currentSettings = await getSettings();
    setCustomReport({
      imageUri: currentSettings.image,
      phoneNumber: currentSettings.phoneNumber,
      address: currentSettings.address,
    });
    console.log(currentSettings, "currentSettings");
  };
  useFocusEffect(
    useCallback(() => {
      fetchReportSettings();
    }, [])
  );

  const reportsImageMap = {
    A4_SIZE: {
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
    },
  };

  // Manually map static paths for Questionnaires
  const questionnairesImageMap = {
    A4_SIZE: {
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
    },
  };
  // const report_size = reportSize || "A4_SIZE"; // or "US_LETTER"
  const language = i18n?.language || "en";
  const selectedImageMap =
    route.params.screen == "Report" ? reportsImageMap : questionnairesImageMap;

  const fallbackAsset = selectedImageMap.A4_SIZE.en;
  const asset = selectedImageMap["A4_SIZE"]?.[language] || fallbackAsset;
  console.log(asset, "asset check");

  const copyFileToAppStorage = async (report_size) => {
    const reportsMap = {
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

    // Manually map static paths for Questionnaires
    const questionnairesMap = {
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
    // const report_size = reportSize || "A4_SIZE"; // or "US_LETTER"
    // const language = i18n?.language || "en";
    const selectedMap =
      route.params.screen == "Report" ? reportsMap : questionnairesMap;

    const fallbackAsset = selectedMap.A4_SIZE.en;
    const asset = Asset.fromModule(
      selectedMap[report_size]?.[language] || fallbackAsset
    );
    await asset.downloadAsync();

    const destPath =
      FileSystem.documentDirectory +
      (route.params.screen == "Report"
        ? "BlankReport_ENG.pdf"
        : "BlankQuestionnaire_ENG.pdf");
    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: destPath,
    });

    console.log("PDF copied successfully to:", destPath);
  };

  // const initializePdf = async () => {
  //   await copyFileToAppStorage();
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     initializePdf();
  //   }, [reportSize])
  // );

  // Function to edit and save PDF
  const generatePdf = async (report_size) => {
    await copyFileToAppStorage(report_size);
    try {
      // Load existing PDF
      const pdfFileName =
        route.params.screen == "Report"
          ? "BlankReport_ENG.pdf"
          : "BlankQuestionnaire_ENG.pdf";

      const pdfPath = FileSystem.documentDirectory + pdfFileName;

      const fileInfo = await FileSystem.getInfoAsync(pdfPath);
      if (!fileInfo.exists) {
        console.log(`PDF not found at ${pdfPath}, copying from assets...`);
        await copyFileToAppStorage(report_size); // Re-copy the file
      }

      const pdfBytes = await FileSystem.readAsStringAsync(pdfPath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Add logo if selected
      const { width, height } = firstPage.getSize();
      let logoUri = customReport.imageUri;
      if (logoUri) {
        try {
          const imgBytes = await FileSystem.readAsStringAsync(logoUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Try both PNG and JPG embedding
          let image;
          try {
            image = await pdfDoc.embedPng(imgBytes);
          } catch (e) {
            image = await pdfDoc.embedJpg(imgBytes);
          }

          const imgWidth = 30;
          const imgHeight = 30;
          const padding = 5;
          const bottomY = 20;
          firstPage.drawImage(image, {
            x: padding,
            y: 0,
            width: imgWidth,
            height: imgHeight,
          });
        } catch (imageError) {
          console.error("Error embedding image:", imageError);
        }
      }

      const textWidth = 200; // Approximate width of your text block
      const centerX = (width - textWidth) / 2;

      // Add address (above phone number)
      if (customReport.address) {
        firstPage.drawText(
          "Address: " +
            customReport.address +
            " , Contact: " +
            customReport.phoneNumber,
          {
            x: 10 + 50 + 10,
            y: 50 / 2 - 10, // Vertically align text to image center
            size: 10,
            color: rgb(0, 0, 0),
            maxWidth: 300,
            lineHeight: 12,
            // For multi-line address if needed:
            // You may need to split the address into lines manually
            // or use a more sophisticated text layout approach
          }
        );
      }

      // Add phone number
      // if (customReport.phoneNumber) {
      //   firstPage.drawText(customReport.phoneNumber, {
      //     x: centerX,
      //     y: bottomMargin,
      //     size: 12,
      //     color: rgb(0, 0, 0),
      //     maxWidth: textWidth,
      //   });
      // }
      // Save new PDF - No Buffer needed!
      // const modifiedPdfBytes = await pdfDoc.save();
      // const newPdfPath = FileSystem.documentDirectory + "modified1.pdf";

      // // Directly use the Uint8Array from pdfDoc.save()
      // // const binaryString = Array.from(modifiedPdfBytes)
      // //   .map((byte) => String.fromCharCode(byte))
      // //   .join("");
      // // const base64Pdf = btoa(binaryString);

      // const base64Pdf = arrayBufferToBase64(modifiedPdfBytes);

      // await FileSystem.writeAsStringAsync(newPdfPath, base64Pdf, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });

      // alert("Pdf downloaded");

      const modifiedPdfBytes = await pdfDoc.save();
      const tempPdfPath = FileSystem.documentDirectory + "temp.pdf";

      const base64Pdf = arrayBufferToBase64(modifiedPdfBytes);

      await FileSystem.writeAsStringAsync(tempPdfPath, base64Pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Define download path
      const timestamp = new Date().getTime();
      const pdfName =
        route.params.screen == "Report"
          ? `Health_Report_${timestamp}.pdf`
          : `Questionnaire_${timestamp}.pdf`;

      const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${pdfName}`;

      // Copy to Downloads folder
      await RNFS.copyFile(tempPdfPath, downloadPath);

      // alert(`PDF downloaded to: ${downloadPath}`);
      // Alert.alert(t("pdfDownloaded"),"");
      Alert.alert(t("pdfDownloaded"), "", [
        {
          text: t("Hs_View"),
          onPress: () => {
            Linking.openURL(
                  "content://com.android.externalstorage.documents/root/primary:Download"
                ).catch(
              () => {
                // Fallback: Open file manager (varies by device)
                Linking.openURL(
                  "content://com.android.externalstorage.documents/root/primary:Download"
                ).catch(console.warn);
              }
            );
          },
          style: "cancel",
        },
      ]);
      setDownloadModal(false);
      // Share the PDF
      // if (await Sharing.isAvailableAsync()) {
      //   await Sharing.shareAsync(newPdfPath);
      // }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const arrayBufferToBase64 = (buffer: Uint8Array) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
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
          text={
            route.params.screen == "Report" ? "PrintReport" : "PrintQuestion"
          }
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        ></Font>
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
          ></Font>
          <Image
            source={icons.close}
            style={{
              width: 25,
              height: 25,
            }}
          ></Image>
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
          source={asset}
          style={{
            width: "100%",
            height: 405,
            borderWidth: 2,
            borderColor: "#DFE9F0",
            borderRadius: 12,
          }}
          resizeMode="contain"
        ></Image>
      </View>

      <Button
        title="Hs_Download"
        style={{ padding: 10, marginTop: 40 }}
        onPress={() => setDownloadModal(true)}
        // onPress={() => generatePdf()}
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
            text={"downloadOptions"}
            style={{ color: "#274273", fontSize: 18, fontWeight: 700 }}
          ></Font>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#F4F6F9",
              marginVertical: 10,
            }}
          ></View>
          <TouchableOpacity
            onPress={() => generatePdf("A4_SIZE")}
            style={{
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
            }}
          >
            {/* <Image source={icons.} style={{ width: 18, height: 18 }}></Image> */}
            <Font
              text="a4Size"
              style={{
                color: "#0B9FD4",
                fontWeight: 500,
                fontSize: 16,
              }}
            ></Font>
            <Image
              source={icons.Arrow}
              style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => generatePdf("US_LETTER")}
            style={{
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
            }}
          >
            <Font
              text="usLetter"
              style={{
                color: "#0B9FD4",
                fontWeight: 500,
                fontSize: 16,
              }}
            ></Font>
            <Image
              source={icons.Arrow}
              style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }}
            ></Image>
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
    // justifyContent: "center",
    // alignItems: "center",
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    backgroundColor: "#f9fafc",
    marginVertical: 5,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 999999,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
});
