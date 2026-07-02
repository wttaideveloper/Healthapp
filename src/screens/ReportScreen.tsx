import { DrawerScreenProps } from "@react-navigation/drawer";
import * as FileSystem from "expo-file-system";
import React from "react";
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Button from "../components/Button";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import { DrawerParamList } from "../navigation/DrawerNavigator";
// import * as Print from 'expo-print';
// import RNBlobUtil from 'react-native-blob-util';
// import htmlToDocx from 'html-to-docx';
// import RNFS from "react-native-fs";
// import Share from "react-native-share";
import { LinearGradient } from "expo-linear-gradient";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useTranslation } from "react-i18next";
import { calculateBMIValues } from "../components/utils/BmiCalculation";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import { getApiRoot } from "../components/utils/api";
import { deleteReports } from "../components/utils/reportService";
import { MEDICAL_DISCLAIMER_TEXT, PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "../components/utils/legal";
import { CORE_MEDICAL_SOURCES, REPORT_SOURCE_BY_TOPIC } from "../components/utils/medicalSources";

type ReportScreenProps = DrawerScreenProps<DrawerParamList, "ReportScreen">;

type HealthTip = {
  id: number;
  title: string;
  description: string;
  citations_link: string;
}

const REPORT_PDF_PATH = process.env.EXPO_PUBLIC_REPORT_PDF_PATH ?? "/reports/pdf";

const healthTips = [
  {
    id: 1,
    title: "Rs_1_title",
    description: "Rs_1_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.breakfast
  },
  {
    id: 2,
    title: "Rs_2_title",
    description: "Rs_2_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.snacking
  },
  {
    id: 3,
    title: "Rs_3_title",
    description: "Rs_3_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.fruitsVegetables

  },
  {
    id: 4,
    title: "Rs_4_title",
    description: "Rs_4_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.wholeGrains

  },
  {
    id: 5,
    title: "Rs_5_title",
    description: "Rs_5_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.nuts

  },
  {
    id: 6,
    title: "Rs_6_title",
    description: "Rs_6_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.redMeat

  },
  {
    id: 7,
    title: "Rs_7_title",
    description: "Rs_7_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.exercise

  },
  {
    id: 8,
    title: "Rs_8_title",
    description: "Rs_8_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.weight

  },
  {
    id: 9,
    title: "Rs_9_title",
    description: "Rs_9_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.sleep

  },
  {
    id: 10,
    title: "Rs_10_title",
    description: "Rs_10_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.tobacco

  },
  {
    id: 11,
    title: "Rs_11_title",
    description: "Rs_11_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.alcohol

  },
  {
    id: 12,
    title: "Rs_12_title",
    description: "Rs_12_desc",
    citations_link: REPORT_SOURCE_BY_TOPIC.spirituality
  },
];
const ReportScreen: React.FC<ReportScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { accessToken } = useAuth();
  const goHomeFromReport = React.useCallback(() => {
    // Always close report to Home to avoid returning to Interests and re-submitting.
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main" as never }],
      })
    );
  }, [navigation]);

  const getHtmlToPdf = React.useCallback(() => {
    if (Platform.OS === "web") {
      return null;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require("react-native-html-to-pdf");
      return (mod?.default ?? mod) as {
        convert: (options: any) => Promise<{ filePath?: string | null }>;
      };
    } catch {
      return null;
    }
  }, []);

  const writeAndroidPdfWithPicker = async (sourcePath: string, fileName: string) => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(sourcePath, {
          mimeType: "application/pdf",
          dialogTitle: "Save Health Report",
          UTI: "com.adobe.pdf",
        });
      }
      return;
    }

    const base64Pdf = await FileSystem.readAsStringAsync(sourcePath, {
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
    Alert.alert("Success", "PDF saved successfully.");
  };

  const createReportPdfFile = React.useCallback(async (htmlContent: string, fileName: string) => {
    if (Platform.OS === "web") {
      return null;
    }

    try {
      const printed = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
      return printed.uri;
    } catch (error) {
      console.warn("expo-print PDF generation failed, trying native HTML-to-PDF:", error);
    }

    const htmlToPdf = getHtmlToPdf();
    if (!htmlToPdf) {
      throw new Error("PDF export is not supported on this device.");
    }

    const pdf = await htmlToPdf.convert({
      html: htmlContent,
      fileName: fileName.replace(/\.pdf$/i, ""),
      directory: "Documents",
    });

    if (!pdf.filePath) {
      throw new Error("PDF generation failed.");
    }

    return pdf.filePath;
  }, [getHtmlToPdf]);
  const openExternalUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert(t("Error"), "Unable to open link");
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
      Alert.alert(t("Error"), "Unable to open link");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        goHomeFromReport();
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }, [goHomeFromReport])
  );
  const { answers } = route?.params;
  const reportId = route?.params?.reportId;
  const { healthAge, potentialAge } = route?.params?.reportData;

  const userName = route?.params?.reportData?.name
    ? route.params.reportData.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    : "NA";
  const safePdfName = React.useMemo(
    () => `${userName.replace(/[^a-z0-9_-]+/gi, "_") || "Health"}_health_Report.pdf`,
    [userName]
  );
  // const totalScore = route?.params?.totalScore || "NA";
  const userGender = route?.params?.reportData?.gender;

  const userAge = route?.params?.reportData?.age || "NA";
  const userHeight = route?.params?.reportData?.height || "NA";
  const userWeight = route?.params?.reportData?.weight || "NA";
  const fasting = route?.params?.reportData?.fasting || "NA";
  const bloodGlucose = route?.params?.reportData?.bloodGlucose || "NA";
  const bloodPressure = route?.params?.reportData?.bloodPressure || "NA";

  function checkBloodPressureStatus(
    systolic: number,
    diastolic: number
  ): string {
    if (systolic < 90 || diastolic < 60) {
      return "low"; // Hypotension
    } else if (systolic <= 120 && diastolic <= 80) {
      return "normal"; // Normal blood pressure
    } else {
      return "high"; // Elevated or hypertension
    }
  }
  function checkGlucoseLevel(
    glucoseValue: number,
    unit: "mg/dL" | "mmol/L",
    isFasting: boolean,
    age?: number
  ): string {
    // Convert mmol/L to mg/dL for consistent comparison if needed
    const valueMgDl = unit === "mmol/L" ? glucoseValue * 18 : glucoseValue;

    if (isFasting) {
      // Fasting glucose standards (before meals)
      if (valueMgDl < 70) {
        return "low";
      }

      if (age === undefined) {
        // Default to adult range if age is not provided
        if (valueMgDl > 130) return "high";
      } else if (age < 6) {
        if (valueMgDl > 180) return "high";
      } else if (age >= 6 && age <= 12) {
        if (valueMgDl > 180) return "high";
      } else {
        // age 13 to adult
        if (valueMgDl > 130) return "high";
      }

      return "normal";
    } else {
      // Post-meal glucose standards (1-2 hours after eating)
      if (valueMgDl < 70) {
        return "low";
      }

      if (age === undefined || age >= 13) {
        // Default to adult range if age is not provided or for adults
        if (valueMgDl >= 180) return "high";
      } else {
        // Children under 13 use the same post-meal range as adults
        if (valueMgDl >= 180) return "high";
      }

      return "normal";
    }
  }

  let bloodPressureStatus = checkBloodPressureStatus(
    parseInt(route.params.reportData.bloodPressureSys),
    parseInt(route.params.reportData.bloodPressureDia)
  );
  let bloodGlucoseStatus = checkGlucoseLevel(
    route.params.reportData.selectedGlucoseUnit == "mg/dL"
      ? parseInt(route.params.reportData.bloodGlucose_mg)
      : parseInt(
        route.params.reportData.bloodGlucose_mmol +
        "." +
        route.params.reportData.blood_glucose_mmol_points
      ),
    route.params.reportData.selectedGlucoseUnit == "mg/dL" ? "mg/dL" : "mmol/L",
    route.params.reportData.fasting,
    parseInt(route.params.reportData.age)
  );

  console.log(bloodPressureStatus, "bloodPressureStatus");
  console.log(bloodGlucoseStatus, "bloodGlucoseStatus");

  const bloodRelatedRecommendations = [
    {
      id: 13,
      title: "maintainBloodGlucose",
      description:
        bloodGlucoseStatus == "low"
          ? "maintainLowBloodGlucoseDesc"
          : "maintainHighBloodGlucoseDesc",
      citations_link: REPORT_SOURCE_BY_TOPIC.bloodGlucose

    },
    {
      id: 14,
      title: "maintainBloodPressure",
      description:
        bloodPressureStatus == "low"
          ? "maintainLowBloodPressureDesc"
          : "maintainHighBloodPressureDesc",
      citations_link: REPORT_SOURCE_BY_TOPIC.bloodPressure

    },
  ];
  const recommendations = answers
    .filter((answer) => answer.points < 1)
    .map((answer) => healthTips.find((tip) => tip.id === answer.questionId))
    .filter(Boolean) as HealthTip[];

  // Add blood-related recommendations based on status
  // if (bloodPressureStatus !== "normal" && bloodGlucoseStatus!=="normal") {
  //   recommendations.push(...bloodRelatedRecommendations);
  // } else if (bloodPressureStatus !=="normal") {
  //   recommendations.push(bloodRelatedRecommendations.find(rec => rec.id === 14));
  // } else if (bloodGlucoseStatus !=="normal") {
  //   recommendations.push(bloodRelatedRecommendations.find(rec => rec.id === 13));
  // }
  if (bloodPressureStatus !== "normal" && bloodGlucoseStatus !== "normal") {
    recommendations.unshift(...bloodRelatedRecommendations);
  } else if (bloodPressureStatus !== "normal") {
    const bpRec = bloodRelatedRecommendations.find((rec) => rec.id === 14);
    if (bpRec) recommendations.unshift(bpRec);
  } else if (bloodGlucoseStatus !== "normal") {
    const glucoseRec = bloodRelatedRecommendations.find((rec) => rec.id === 13);
    if (glucoseRec) recommendations.unshift(glucoseRec);
  }

  console.log(recommendations, "final recommendations");

  // Function to download as PDF
  const generateRecommendationsHTML = recommendations
    .map(
      (rec) => `
    <div class="recommendation">
      <div class="check-icon-container">
        <div class="check-icon">✔</div>
      </div>
      <div>
        <strong>${t(rec.title)}</strong><br>${t(rec.description)}
        <br><a href="${rec.citations_link}" style="font-size:12px;color:#0B9FD5;">Source</a>
      </div>
    </div>
  `
    )
    .join("");

  const generateCoreSourcesHTML = CORE_MEDICAL_SOURCES.map(
    (source) => `
      <li>
        <strong>${source.title}</strong><br>
        ${source.description}<br>
        <a href="${source.url}" style="font-size:12px;color:#0B9FD5;">${source.url}</a>
      </li>
    `
  ).join("");

  const reportHtml = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Report</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
            }
            body {
                background-color: #f5f7fa;
                display: flex;
                justify-content: center;
                padding: 20px;
            }
            .container {
                width: 350px;
                background-color: #fff;
                border-radius: 15px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                background: linear-gradient(to right, #0B9FD5, #284374);
                color: #fff;
                padding: 15px;
                border-radius: 10px;
                text-align: flex-start;
                font-weight: bold;
            }
            .user-info {
                margin-top: 10px;
                padding: 10px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
            }
            .user-info div {
                text-align: center;
                font-size: 14px;
            }
            .health-age {
                margin-top: 15px;
                background: #fff8e5;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
            }
            .age-numbers {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
            .age-box {
                width: 30%;
                padding: 10px;
                background-color: #eef2f6;
                border-radius: 10px;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
            .text-p{
              font-size: 12px;
              font-weight: 300;
            }
            .age-box:nth-child(2) {
                background-color: #dff5e7;
            }
            .recommendations {
                margin-top: 20px;
            }
            .recommendations h3 {
                font-size: 16px;
                margin-bottom: 10px;
            }
            .recommendation {
                background-color: #f8f9fa;
                padding: 10px;
                border-radius: 10px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                font-size: 14px;
            }
            .separator {
              width: 100%;
              margin-top:10px;
              border-width: 1px;
              border-color: white;
              border-style: solid;
            }
            .check-icon-container {
              width:40px;
            }
            .check-icon {
                width: 20px;
                height: 20px;
                background-color: #4caf50;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                margin-right: 10px;
            }
            .disclaimer {
              margin-top: 16px;
              font-size: 12px;
              color: #9c1b1b;
              background: #fff0f0;
              border-radius: 8px;
              padding: 10px;
            }
            .sources {
              margin-top: 16px;
              padding: 12px;
              border-radius: 8px;
              background: #f4fafd;
              border: 1px solid #d7ecf5;
              font-size: 12px;
              color: #194959;
            }
            .sources h3 {
              margin: 0 0 8px;
              font-size: 14px;
            }
            .sources li {
              margin-bottom: 8px;
            }
        </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><p class="text-p">${t("Rs_CustomizedReport")}</p><br><strong>${userName}</strong>
          <div class="separator"></div>
          <div class="user-info">
            <div><p class="text-p">${t("gender")}: </p><br><strong>${userGender}</strong></div>
            <div><p class="text-p">${t("age")}: </p><br><strong>${userAge}</strong></div>
            <div><p class="text-p">${t("height")}: </p><br><strong>${userHeight}</strong></div>
            <div><p class="text-p">${t("weight")}: </p><br><strong>${userWeight}</strong></div>
          </div>
        </div>
        <div class="health-age">
          <p>${t("Rs_YourHealthAge")} <strong>${healthAge}</strong> vs ${t("Rs_YourActualAge")} <strong>${userAge}</strong></p>
          <div class="age-numbers">
            <div class="age-box">${userAge} <br><p class="text-p">${t("Rs_CurrentAge")}</p></div>
            <div class="age-box">${healthAge} <br><p class="text-p">${t("Rs_HealthAge")}</p></div>
            <div class="age-box">${potentialAge} <br><p class="text-p">${t("Rs_PotentialAge")}</p></div>
          </div>
        </div>
        <p style="margin-top: 15px; font-size: 13px;">${t("Rs_HealthyHabitsParagraph")}</p>
        <div class="recommendations">
          <h3>${t("Rs_Recommendations")}</h3>
          ${generateRecommendationsHTML}
        </div>
        <div class="disclaimer">${MEDICAL_DISCLAIMER_TEXT}</div>
        <div class="sources">
          <h3>Medical Sources</h3>
          <ul>${generateCoreSourcesHTML}</ul>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(route.params.reportData.heightValue, "height value in report screen");

  const SharePDF = async () => {
    const htmlContent = reportHtml;

    try {
      if (Platform.OS === "web") {
        await shareOrDownloadPdfWeb(htmlContent, safePdfName);
        return;
      }

      const pdfPath = await createReportPdfFile(htmlContent, safePdfName);

      if (pdfPath && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfPath, {
          mimeType: "application/pdf",
          dialogTitle: "Share Health Report",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert(t("Error"), "Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error generating or sharing PDF:", error);
      Alert.alert(t("Error"), "Failed to share PDF");
    }
  };

  const downloadPDF = async () => {
    const htmlContent = reportHtml;

    try {
      if (Platform.OS === "web") {
        await downloadPdfWeb(htmlContent, safePdfName);
        return;
      }

      const pdfPath = await createReportPdfFile(htmlContent, safePdfName);
      if (!pdfPath) {
        throw new Error("PDF generation failed.");
      }

      if (Platform.OS === "android") {
        await writeAndroidPdfWithPicker(pdfPath, safePdfName);
      } else {
        await Sharing.shareAsync(pdfPath, {
          mimeType: "application/pdf",
          dialogTitle: "Share Health Report",
          UTI: "com.adobe.pdf",
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Alert.alert("Error", "Failed to download PDF");
    }
  };

  const renderPdfBlobWeb = async (html: string, fileName: string): Promise<Blob | null> => {
    const API_BASE_URL = getApiRoot();
    if (API_BASE_URL) {
      try {
        const resp = await fetch(`${API_BASE_URL}${REPORT_PDF_PATH}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ html, fileName }),
        });

        if (!resp.ok) {
          throw new Error(`PDF render failed: ${resp.status}`);
        }

        const ab = await resp.arrayBuffer();
        return new Blob([ab], { type: "application/pdf" });
      } catch (error) {
        console.warn("Backend PDF render failed, falling back to print:", error);
      }
    }

    return null;
  };

  const printHtmlWeb = (html: string) => {
    const w = window.open("", "_blank");
    if (!w) {
      Alert.alert("Popup blocked", "Please allow popups to download/print the report.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const downloadPdfWeb = async (html: string, fileName: string) => {
    // Preferred: backend renders HTML to PDF.
    // Fallback: open browser print dialog (user can "Save as PDF").
    const blob = await renderPdfBlobWeb(html, fileName);
    if (!blob) {
      printHtmlWeb(html);
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const shareOrDownloadPdfWeb = async (html: string, fileName: string) => {
    const blob = await renderPdfBlobWeb(html, fileName);
    if (!blob) {
      printHtmlWeb(html);
      return;
    }

    const file = new File([blob], fileName, { type: "application/pdf" });
    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; title?: string }) => Promise<void>;
    };

    if (nav.canShare?.({ files: [file] }) && nav.share) {
      await nav.share({ files: [file], title: "Health Report" });
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Back handler is registered via useFocusEffect above.
  const handleDeleteCurrentReport = React.useCallback(() => {
    if (!reportId) return;
    Alert.alert("Delete report", "Are you sure you want to delete this report?", [
      { text: t("Hs_Cancel"), style: "cancel" },
      {
        text: t("Hs_Delete"),
        style: "destructive",
        onPress: () => {
          deleteReports([reportId]);
          navigation.navigate("HistoryScreen");
        },
      },
    ]);
  }, [navigation, reportId, t]);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Font
          text="Rs_Report"
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        ></Font>
        <View style={styles.headerActions}>
          {reportId ? (
            <TouchableOpacity
              onPress={handleDeleteCurrentReport}
              style={styles.deleteHeaderAction}
            >
              <Image source={icons.delete} style={{ width: 16, height: 16 }} />
              <Text style={styles.deleteHeaderText}>Delete</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={goHomeFromReport}
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
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <LinearGradient
          colors={["#0B9FD5", "#284374"]}
          style={{ padding: 15, borderRadius: 20 }}
        >
          <Font text="Rs_CustomizedReport" style={styles.textP}></Font>
          <Text style={styles.headerText}>{userName}</Text>
          <View style={styles.separator} />
          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <Font text="gender" style={styles.textP}></Font>
              <Font text={userGender as string} style={styles.boldText}></Font>
            </View>
            <View style={styles.userInfoItem}>
              <Font text="age" style={styles.textP}></Font>
              <Font text={userAge} style={styles.boldText}></Font>
            </View>
            <View style={styles.userInfoItem}>
              <Font text="height" style={styles.textP}></Font>
              <Font text={userHeight} style={styles.boldText}></Font>
            </View>
            <View style={styles.userInfoItem}>
              <Font text="weight" style={styles.textP}></Font>
              <Font text={userWeight} style={styles.boldText}></Font>
            </View>
          </View>
        </LinearGradient>
        <View style={[styles.ageNumbers, { ...{ marginTop: 10 } }]}>
          <View
            style={[styles.ageBox, { ...{ backgroundColor: "#C8E0E8" } }]}
          >
            <Font
              text={bloodPressure}
              style={{ fontSize: 20, color: "#194959" }}
            ></Font>
            <Font
              text={"BloodPressure"}
              style={{ fontSize: 12, color: "#194959" }}
            ></Font>
          </View>
          <View style={[styles.ageBox, styles.healthAgeBox]}>
            <Font
              text={bloodGlucose}
              style={{ fontSize: 20, color: "#194959" }}
            ></Font>
            <Font
              text={"BloodGlucose"}
              style={{ fontSize: 12, color: "#194959" }}
            ></Font>
          </View>
          <View style={styles.ageBox}>
            <Font
              text={`${calculateBMIValues(
                parseInt(route.params.reportData.weightValue),
                route.params.reportData.selectedWeightUnit,
                route.params.reportData.heightValue,
                route.params.reportData.selectedHeightUnit
              )}`}
              style={{ fontSize: 20, color: "#194959" }}
            ></Font>
            <Font
              text={"BMI"}
              style={{ fontSize: 12, color: "#194959" }}
            ></Font>
          </View>
        </View>
        <View style={styles.healthAge}>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Font text={"Rs_YourHealthAge"}></Font>
            <Font text={" " + healthAge + " "}></Font>
            <Font text={"VS "}></Font>
            <Font text={"Rs_YourActualAge"}></Font>
            <Font text={" " + userAge}></Font>
          </View>
          <View style={styles.ageNumbers}>
            <View
              style={[styles.ageBox, { ...{ backgroundColor: "#C8E0E8" } }]}
            >
              <Font
                text={userAge}
                style={{ fontSize: 24, color: "#194959" }}
              ></Font>
              <Font
                text={"Rs_CurrentAge"}
                style={{ fontSize: 12, color: "#194959" }}
              ></Font>
            </View>
            <View style={[styles.ageBox, styles.healthAgeBox]}>
              <Font
                text={healthAge}
                style={{ fontSize: 24, color: "#194959" }}
              ></Font>
              <Font
                text={"Rs_HealthAge"}
                style={{ fontSize: 12, color: "#194959" }}
              ></Font>
            </View>
            <View style={styles.ageBox}>
              <Font
                text={potentialAge}
                style={{ fontSize: 24, color: "#194959" }}
              ></Font>
              <Font
                text={"Rs_PotentialAge"}
                style={{ fontSize: 12, color: "#194959" }}
              ></Font>
            </View>
          </View>
        </View>
        <Font
          text="Rs_HealthyHabitsParagraph"
          style={styles.description}
        ></Font>
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>{MEDICAL_DISCLAIMER_TEXT}</Text>
        </View>
        <View style={styles.sourcesCard}>
          <Text style={styles.sourcesTitle}>Medical Sources</Text>
          {CORE_MEDICAL_SOURCES.map((source) => (
            <TouchableOpacity
              key={source.url}
              style={styles.sourceItem}
              onPress={() => openExternalUrl(source.url)}
            >
              <Text style={styles.sourceTitle}>{source.title}</Text>
              <Text style={styles.sourceDescription}>{source.description}</Text>
              <Text style={styles.sourceUrl}>{source.url}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.recommendations}>
          <Font text="Rs_Recommendations" style={styles.sectionTitle}></Font>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationCard}>
                <View style={styles.recommendationTextContainer}>
                  <View style={styles.recommendationHeader}>
                    {/* Group Checkbox and Title to stay on the left */}
                    <View style={styles.titleGroup}>
                      <View style={styles.checkIcon}>
                        <Text style={styles.checkText}>✔</Text>
                      </View>
                      <Font
                        text={rec?.title}
                        style={styles.recommendationTitle}
                      />
                    </View>

                    {/* Info icon pushed to the far right */}
                    <TouchableOpacity
                      onPress={() => openExternalUrl(rec?.citations_link)}
                      style={styles.citationButton}
                      accessibilityLabel="Citation information"
                    >
                      <Text style={styles.citationIcon}>i</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Description wraps below the header */}
                  <Font text={rec?.description} style={styles.recommendationDesc} />
                </View>
              </View>
            ))
          ) : null}
        </View>
        <View style={styles.legalSection}>
          <Text style={styles.disclosureText}>
            Health Age Pro is an auto-renewable subscription. Manage or cancel it from your App Store account settings.
          </Text>
          <View style={styles.linkRow}>
            <TouchableOpacity onPress={() => openExternalUrl(TERMS_OF_USE_URL)}>
              <Text style={styles.legalLink}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}> • </Text>
            <TouchableOpacity onPress={() => openExternalUrl(PRIVACY_POLICY_URL)}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          // position: "static",
          //   bottom: 30,
          //   left:20,
          gap: 10,
          paddingVertical: 10,
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <Button
          title="Rs_SavePdf"
          onPress={downloadPDF}
          style={{ padding: 10 }}
        ></Button>

        <Button
          title="Rs_ShareReport"
          // onPress={()=> Platform.OS=="ios" ? SharePDFIOS() : SharePDF()}
          onPress={() => SharePDF()}
          style={{ padding: 10 }}
        ></Button>
      </View>
    </View>
  );
};

export default ReportScreen;

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
  scrollViewContainer: {},
  question: { fontSize: 20 },
  subQuestion: { fontSize: 12, fontWeight: 400 },
  option: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#ddd",
    alignSelf: "flex-start",
  },
  selectedOption: { backgroundColor: "#87CEEB" },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  nextButtonText: { color: "white", textAlign: "center", fontSize: 18 },
  result: { fontSize: 24, textAlign: "center" },
  header: {},
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfoItem: {
    alignItems: "center",
  },
  textP: {
    fontSize: 12,
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
    color: "#fff",
  },
  healthAge: {
    marginTop: 15,
    backgroundColor: "#fff8e5",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  ageNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  ageBox: {
    width: "30%",
    padding: 10,
    backgroundColor: "#eef2f6",
    borderRadius: 10,
    textAlign: "center",
  },
  healthAgeBox: {
    backgroundColor: "#dff5e7",
  },
  description: {
    backgroundColor: "#EBF1F5",
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
    fontSize: 14,
  },
  recommendations: {
    marginTop: 20,
  },
  disclaimerCard: {
    marginTop: 14,
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FFD6D6",
  },
  disclaimerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#9C1B1B",
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#7A1A1A",
  },
  sourcesCard: {
    marginTop: 14,
    backgroundColor: "#F4FAFD",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D7ECF5",
  },
  sourcesTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#194959",
    marginBottom: 6,
  },
  sourceItem: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#D7ECF5",
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#194959",
  },
  sourceDescription: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: "#3E5964",
  },
  sourceUrl: {
    marginTop: 4,
    color: "#0B85B4",
    fontSize: 11,
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  recommendationCard: {
    backgroundColor: "#EEF3F7",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    width: '100%',
  },
  recommendationTextContainer: {
    width: '100%',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This creates the "eye-thing" space-between effect
    width: '100%',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // This ensures the title takes up available space but doesn't push the icon off-screen
    marginRight: 10,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 10, // Space between checkmark and text
    flexShrink: 1, // Allows title to wrap if it's too long
  },
  citationButton: {
    padding: 4,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#e3f1fa',
    width: 22,
    height: 22,
  },
  citationIcon: {
    fontSize: 14,
    color: '#0B9FD5',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  recommendationDesc: {
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '100%',
    fontSize: 14,
    color: '#333',
    marginTop: 6,
    lineHeight: 20,
  },
  sourceLink: {
    marginTop: 8,
  },
  sourceLinkText: {
    color: "#0B9FD5",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  checkIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#4caf50",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    flexShrink: 0,
  },
  checkText: {
    color: "white",
    fontSize: 14,
  },
  footer: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "300",
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  legalSection: { marginTop: 20, paddingVertical: 20, borderTopWidth: 1, borderTopColor: "#E6ECF2", alignItems: "center" },
  disclosureText: { color: "#7D8699", fontSize: 11, textAlign: "center", marginBottom: 10, lineHeight: 16 },
  linkRow: { flexDirection: "row", alignItems: "center" },
  legalLink: { color: "#0B9FD4", fontSize: 12, textDecorationLine: "underline", fontWeight: "500" },
  linkSeparator: { color: "#7D8699", marginHorizontal: 8 },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteHeaderAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F5C3C3",
    backgroundColor: "#FFF3F3",
  },
  deleteHeaderText: {
    color: "#C62828",
    fontSize: 13,
    fontWeight: "600",
  },

});
