import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Font from "../components/CustomisedFont";
import ProgressBar from "../components/ProgressBar";
import { icons } from "../components/images";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import Button from "../components/Button";
import * as FileSystem from "expo-file-system";
// import * as Print from 'expo-print';
// import RNBlobUtil from 'react-native-blob-util';
// import htmlToDocx from 'html-to-docx';
// import RNFS from "react-native-fs";
// import Share from "react-native-share";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from "expo-linear-gradient";
import { addReport } from "../components/utils/reportService";
import * as Sharing from "expo-sharing";
import { useTranslation } from "react-i18next";
import * as MediaLibrary from 'expo-media-library';
import {
  checkBloodPressureStatus,
  checkGlucoseLevel,
} from "../components/utils/bloodPressure";
import { calculateBMIValues } from "../components/utils/BmiCalculation";

type ReportScreenProps = DrawerScreenProps<DrawerParamList, "ReportScreen">;

const healthTips = [
  {
    id: 1,
    title: "Rs_1_title",
    description: "Rs_1_desc",
  },
  {
    id: 2,
    title: "Rs_2_title",
    description: "Rs_2_desc",
  },
  {
    id: 3,
    title: "Rs_3_title",
    description: "Rs_3_desc",
  },
  {
    id: 4,
    title: "Rs_4_title",
    description: "Rs_4_desc",
  },
  {
    id: 5,
    title: "Rs_5_title",
    description: "Rs_5_desc",
  },
  {
    id: 6,
    title: "Rs_6_title",
    description: "Rs_6_desc",
  },
  {
    id: 7,
    title: "Rs_7_title",
    description: "Rs_7_desc",
  },
  {
    id: 8,
    title: "Rs_8_title",
    description: "Rs_8_desc",
  },
  {
    id: 9,
    title: "Rs_9_title",
    description: "Rs_9_desc",
  },
  {
    id: 10,
    title: "Rs_10_title",
    description: "Rs_10_desc",
  },
  {
    id: 11,
    title: "Rs_11_title",
    description: "Rs_11_desc",
  },
  {
    id: 12,
    title: "Rs_12_title",
    description: "Rs_12_desc",
  },
];
const ReportScreen: React.FC<ReportScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
    React.useEffect(() => {
      const backAction = () => {
        navigation.navigate("Main");
        return true; // Prevent default back action
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  const { answers } = route?.params;
  const { healthAge, potentialAge } = route?.params?.reportData;

  const userName = route?.params?.reportData?.name
    ? route.params.reportData.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "NA";
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
    },
    {
      id: 14,
      title: "maintainBloodPressure",
      description:
        bloodPressureStatus == "low"
          ? "maintainLowBloodPressureDesc"
          : "maintainHighBloodPressureDesc",
    },
  ];
  const recommendations = answers
    .filter((answer) => answer.points < 1)
    .map((answer) => healthTips.find((tip) => tip.id === answer.questionId))
    .filter(Boolean);

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
  const generateRecommendationsHTML = (recommendations ?? [])
    .map(
      (rec) => `
    <div class="recommendation">
      <div class="check-icon-container">
        <div class="check-icon">✔</div>
      </div>
      <div><strong>${t(rec!.title)}</strong><br>${t(rec!.description)}</div>
    </div>
  `
    )
    .join("");

    console.log(route.params.reportData.heightValue,"height value in report screen");
    
  const SharePDF = async () => {
    const htmlContent =  `
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
            @media print {
            body {
                background-color: #f5f7fa;
                display: flex;
                justify-content: center;
                padding: 20px;
                 -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
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
      
    
        </style>
    </head>
    <body>
    
        <div class="container">
          <div class="header"><p class="text-p">${t(
            "Rs_CustomizedReport"
          )}</p><br><strong>${userName}</strong>
              <div class="separator"></div>
              <div class="user-info">
                <div ><p class="text-p">${t(
                  "gender"
                )}: </p><br><strong>${userGender}</strong></div>
                <div><p class="text-p">${t(
                  "age"
                )}: </p><br><strong>${userAge}</strong></div>
                <div><p class="text-p">${t(
                  "height"
                )}: </p><br><strong>${userHeight}</strong></div>
                  <div><p class="text-p">${t(
                    "weight"
                  )}: </p><br><strong>${userWeight}</strong></div>
            </div>
          </div>
  <div class="age-numbers">
                  <div class="age-box">${bloodPressure} <br><p class="text-p">${t(
      "BloodPressure"
    )}</p></div>
                    <div class="age-box">${bloodGlucose} <br><p class="text-p">${t(
      "BloodGlucose"
    )}</p></div>
                    <div class="age-box">${calculateBMIValues(
                      parseInt(route.params.reportData.weightValue),
                      route.params.reportData.selectedWeightUnit,
                      route.params.reportData.heightValue,
                      route.params.reportData.selectedHeightUnit
                    )} <br><p class="text-p">${t(
      "BMI"
    )}</p></div>
                </div>
            <div class="health-age">
              <p>${t("Rs_YourHealthAge")} <strong>${healthAge}</strong> vs ${t(
      "Rs_YourActualAge"
    )} <strong>${userAge}</strong></p>
                <div class="age-numbers">
                  <div class="age-box">${userAge} <br><p class="text-p">${t(
      "Rs_CurrentAge"
    )}</p></div>
                    <div class="age-box">${healthAge} <br><p class="text-p">${t(
      "Rs_HealthAge"
    )}</p></div>
                    <div class="age-box">${potentialAge} <br><p class="text-p">${t(
      "Rs_PotentialAge"
    )}</p></div>
                </div>
            </div>
    
            <p style="margin-top: 15px; font-size: 13px;">
                ${t("Rs_HealthyHabitsParagraph")}</p>
            <div class="recommendations">
                <h3>${t("Rs_Recommendations")}</h3>
               ${generateRecommendationsHTML}
            </div>
                  <div class="last-div"><p class="text-p">This Pdf is Generated by Health Age App</p></div>
        </div>
    </body>
    </html>
        `;

    try {
      // Generate PDF
      const options = {
        html: htmlContent,
        fileName: `${userName}_health_Report`,
        directory: "Documents",
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      console.log("Generated PDF:", pdf.filePath);

      if (!pdf.filePath) {
        throw new Error(t("Error"));
      }

      // Define destination path in the Downloads folder (Public Storage)
      // Save the PDF in a location that Expo Sharing can access
      const newPdfPath =
        FileSystem.documentDirectory + `${userName}_health_Report.pdf`;

      // Read the file as base64
      const base64Pdf = await RNFS.readFile(pdf.filePath, "base64");

      // Write it to FileSystem.documentDirectory
      await FileSystem.writeAsStringAsync(newPdfPath, base64Pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("PDF saved at:", newPdfPath);

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newPdfPath);
      } else {
        alert(t("Error"));
      }
    } catch (error) {
      console.error("Error generating or sharing PDF:", error);
      alert(t("Error"));
    }
  };


  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
  
  };

  // const SharePDFIOS = async () => {
  //   const htmlContent =  `
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Health Report</title>
  //       <style>
  //           * {
  //               margin: 0;
  //               padding: 0;
  //               box-sizing: border-box;
  //               font-family: Arial, sans-serif;
  //           }
  //               @media print {
  //           body {
  //               background-color: #f5f7fa;
  //               display: flex;
  //               justify-content: center;
  //               padding: 20px;
  //                -webkit-print-color-adjust: exact !important;
  //               print-color-adjust: exact !important;
  //           }
  // }
  //           .container {
  //               width: 350px;
  //               background-color: #fff;
  //               border-radius: 15px;
  //               box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  //               padding: 20px;
  //           }
  //           .header {
  //               background: linear-gradient(to right, #0B9FD5, #284374);
  //               color: #fff;
  //               padding: 15px;
  //               border-radius: 10px;
  //               text-align: flex-start;
  //               font-weight: bold;
  //           }
  //           .user-info {
  //               margin-top: 10px;
  //               padding: 10px;
  //               border-radius: 10px;
  //               display: flex;
  //               justify-content: space-between;
  //           }
  //           .user-info div {
  //               text-align: center;
  //               font-size: 14px;
  //           }
  //           .health-age {
  //               margin-top: 15px;
  //               background: #fff8e5;
  //               padding: 15px;
  //               border-radius: 10px;
  //               text-align: center;
  //           }
  //           .age-numbers {
  //               display: flex;
  //               justify-content: space-between;
  //               margin-top: 10px;
  //           }
  //           .age-box {
  //               width: 30%;
  //               padding: 10px;
  //               background-color: #eef2f6;
  //               border-radius: 10px;
  //               text-align: center;
  //               font-size: 16px;
  //               font-weight: bold;
  //           }
  //         .text-p{
  //         font-size: 12px;
  //               font-weight: 300;
  //         }
  //           .age-box:nth-child(2) {
  //               background-color: #dff5e7;
  //           }
  //           .recommendations {
  //               margin-top: 20px;
  //           }
  //           .recommendations h3 {
  //               font-size: 16px;
  //               margin-bottom: 10px;
  //           }
  //           .recommendation {
  //               background-color: #f8f9fa;
  //               padding: 10px;
  //               border-radius: 10px;
  //               margin-bottom: 10px;
  //               display: flex;
  //               align-items: center;
  //               font-size: 14px;
  //           }
  //         .separator {
  //       width: 100%;
  //         margin-top:10px;
  //       border-width: 1px;  
  //       border-color: white;
  //       border-style: solid; 
  //   }
    
  //         .check-icon-container {
  //         width:40px;
  //         }
  //           .check-icon {
  //               width: 20px;
  //               height: 20px;
  //               background-color: #4caf50;
  //               color: white;
  //               border-radius: 50%;
  //               display: flex;
  //               align-items: center;
  //               justify-content: center;
  //               font-size: 14px;
  //               margin-right: 10px;
  //           }
      
    
  //       </style>
  //   </head>
  //   <body>
    
  //       <div class="container">
  //         <div class="header"><p class="text-p">${t(
  //           "Rs_CustomizedReport"
  //         )}</p><br><strong>${userName}</strong>
  //             <div class="separator"></div>
  //             <div class="user-info">
  //               <div ><p class="text-p">${t(
  //                 "gender"
  //               )}: </p><br><strong>${userGender}</strong></div>
  //               <div><p class="text-p">${t(
  //                 "age"
  //               )}: </p><br><strong>${userAge}</strong></div>
  //               <div><p class="text-p">${t(
  //                 "height"
  //               )}: </p><br><strong>${userHeight}</strong></div>
  //                 <div><p class="text-p">${t(
  //                   "weight"
  //                 )}: </p><br><strong>${userWeight}</strong></div>
  //           </div>
  //         </div>
  // <div class="age-numbers">
  //                 <div class="age-box">${bloodPressure} <br><p class="text-p">${t(
  //     "BloodPressure"
  //   )}</p></div>
  //                   <div class="age-box">${bloodGlucose} <br><p class="text-p">${t(
  //     "BloodGlucose"
  //   )}</p></div>
  //                   <div class="age-box">${calculateBMIValues(
  //                     parseInt(route.params.reportData.weightValue),
  //                     route.params.reportData.selectedWeightUnit,
  //                     parseInt(route.params.reportData.heightValue),
  //                     route.params.reportData.selectedHeightUnit
  //                   )} <br><p class="text-p">${t(
  //     "BMI"
  //   )}</p></div>
  //               </div>
  //           <div class="health-age">
  //             <p>${t("Rs_YourHealthAge")} <strong>${healthAge}</strong> vs ${t(
  //     "Rs_YourActualAge"
  //   )} <strong>${userAge}</strong></p>
  //               <div class="age-numbers">
  //                 <div class="age-box">${userAge} <br><p class="text-p">${t(
  //     "Rs_CurrentAge"
  //   )}</p></div>
  //                   <div class="age-box">${healthAge} <br><p class="text-p">${t(
  //     "Rs_HealthAge"
  //   )}</p></div>
  //                   <div class="age-box">${potentialAge} <br><p class="text-p">${t(
  //     "Rs_PotentialAge"
  //   )}</p></div>
  //               </div>
  //           </div>
    
  //           <p style="margin-top: 15px; font-size: 13px;">
  //               ${t("Rs_HealthyHabitsParagraph")}</p>
  //           <div class="recommendations">
  //               <h3>${t("Rs_Recommendations")}</h3>
  //              ${generateRecommendationsHTML}
  //           </div>
  //                 <div class="last-div"><p class="text-p">This Pdf is Generated by Health Age App</p></div>
  //       </div>
  //   </body>
  //   </html>
  //       `;

  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   const { uri } = await Print.printToFileAsync({ html:htmlContent });
  //   console.log('File has been saved to:', uri);
  //   if (await Sharing.isAvailableAsync()) {
  //     // await Sharing.shareAsync(newPdfPath);
  //     await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  //   } else {
  //     alert(t("Error"));
  //   }
  // };

  const selectPrinter = async () => {
  
  };
  // const SharePDFIOS = async () => {
  //   const htmlContent = `
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Health Report</title>
  //          <style>
  //       body {
  //         display: flex;
  //         justify-content: center;
  //         padding: 20px;
  //         font-family: Arial, sans-serif;
  //         background-color: #eef2f6 !important;
  //         margin: 0;
  //       }
  //       .container {
  //         width: 350px;
  //         background-color: white;
  //         border-radius: 15px;
  //         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  //         padding: 20px;
  //       }
  //       .header {
  //         background-color: #0B9FD5;
  //         color: white;
  //         padding: 15px;
  //         border-radius: 10px;
  //         text-align: center;
  //         font-weight: bold;
  //       }
  //       .user-info {
  //         margin-top: 15px;
  //         padding: 10px;
  //         border-radius: 10px;
  //         background-color: #f0f4f8;
  //         display: flex;
  //         justify-content: space-between;
  //       }
  //       .age-numbers {
  //         display: flex;
  //         justify-content: space-between;
  //         margin-top: 15px;
  //       }
  //       .age-box {
  //         width: 30%;
  //         padding: 12px;
  //         background-color: #d9f9e5;
  //         border: 1px solid #ccc;
  //         border-radius: 10px;
  //         font-size: 15px;
  //         font-weight: bold;
  //         color: #333;
  //       }
  //       .health-age {
  //         margin-top: 20px;
  //         background-color: #fff0d9;
  //         padding: 15px;
  //         border-radius: 10px;
  //         text-align: center;
  //       }
  //       .recommendations {
  //         margin-top: 20px;
  //       }
  //       .last-div {
  //         margin-top: 20px;
  //         text-align: center;
  //         font-size: 12px;
  //         color: #777;
  //       }
  //     </style>
  //       </head>
  //       <body>
  //         <div class="container">
  //           <div class="header">
  //             <p>${t("Rs_CustomizedReport")}</p><br><strong>${userName}</strong>
  //             <div class="separator"></div>
  //             <div class="user-info">
  //               <div style="text-align: center; font-size: 13px; color: #333;">
  //                 <p>${t("gender")}: </p><strong>${userGender}</strong>
  //               </div>
  //               <div style="text-align: center; font-size: 13px; color: #333;">
  //                 <p>${t("age")}: </p><strong>${userAge}</strong>
  //               </div>
  //               <div style="text-align: center; font-size: 13px; color: #333;">
  //                 <p>${t("height")}: </p><strong>${userHeight}</strong>
  //               </div>
  //               <div style="text-align: center; font-size: 13px; color: #333;">
  //                 <p>${t("weight")}: </p><strong>${userWeight}</strong>
  //               </div>
  //             </div>
  //           </div>
  
  //           <div class="age-numbers">
  //             <div class="age-box">
  //               ${bloodPressure} <br><p>${t("BloodPressure")}</p>
  //             </div>
  //             <div class="age-box">
  //               ${bloodGlucose} <br><p>${t("BloodGlucose")}</p>
  //             </div>
  //             <div class="age-box">
  //               ${calculateBMIValues(parseInt(route.params.reportData.weightValue), route.params.reportData.selectedWeightUnit, parseInt(route.params.reportData.heightValue), route.params.reportData.selectedHeightUnit)} <br><p>${t("BMI")}</p>
  //             </div>
  //           </div>
  
  //           <div class="health-age">
  //             <p>${t("Rs_YourHealthAge")} <strong>${healthAge}</strong> vs ${t("Rs_YourActualAge")} <strong>${userAge}</strong></p>
  //             <div class="age-numbers">
  //               <div class="age-box">
  //                 ${userAge} <br><p>${t("Rs_CurrentAge")}</p>
  //               </div>
  //               <div class="age-box">
  //                 ${healthAge} <br><p>${t("Rs_HealthAge")}</p>
  //               </div>
  //               <div class="age-box">
  //                 ${potentialAge} <br><p>${t("Rs_PotentialAge")}</p>
  //               </div>
  //             </div>
  //           </div>
  
  //           <p>${t("Rs_HealthyHabitsParagraph")}</p>
  
  //           <div class="recommendations">
  //             <h3>${t("Rs_Recommendations")}</h3>
  //             ${generateRecommendationsHTML}
  //           </div>
  
  //           <div class="last-div">
  //             <p>This PDF is Generated by Health Age app</p>
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //   ` 
  
  //   try {
  //     // Generate PDF
  //     const options = {
  //       html: htmlContent,
  //       fileName: `${userName}_health_Report`,
  //       directory: "Documents",
  //     };
  //     const pdf = await RNHTMLtoPDF.convert(options);
  //     console.log("Generated PDF:", pdf.filePath);
  
  //     if (!pdf.filePath) {
  //       throw new Error(t("Error"));
  //     }
  
  //     // Define destination path in the Downloads folder (Public Storage)
  //     const newPdfPath = FileSystem.documentDirectory + `${userName}_health_Report.pdf`;
  
  //     // Read the file as base64
  //     const base64Pdf = await RNFS.readFile(pdf.filePath, "base64");
  
  //     // Write it to FileSystem.documentDirectory
  //     await FileSystem.writeAsStringAsync(newPdfPath, base64Pdf, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  
  //     console.log("PDF saved at:", newPdfPath);
  
  //     // Share the PDF
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(newPdfPath);
  //     } else {
  //       alert(t("Error"));
  //     }
  //   } catch (error) {
  //     console.error("Error generating or sharing PDF:", error);
  //     alert(t("Error"));
  //   }
  // };
  
  const downloadPDF = async () => {
    const htmlContent = `
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
      
    
        </style>
    </head>
    <body>
    
        <div class="container">
          <div class="header"><p class="text-p">${t(
            "Rs_CustomizedReport"
          )}</p><br><strong>${userName}</strong>
              <div class="separator"></div>
              <div class="user-info">
                <div ><p class="text-p">${t(
                  "gender"
                )}: </p><br><strong>${userGender}</strong></div>
                <div><p class="text-p">${t(
                  "age"
                )}: </p><br><strong>${userAge}</strong></div>
                <div><p class="text-p">${t(
                  "height"
                )}: </p><br><strong>${userHeight}</strong></div>
                  <div><p class="text-p">${t(
                    "weight"
                  )}: </p><br><strong>${userWeight}</strong></div>
            </div>
          </div>

            <div class="health-age">
              <p>${t("Rs_YourHealthAge")} <strong>${healthAge}</strong> vs ${t(
      "Rs_YourActualAge"
    )} <strong>${userAge}</strong></p>
                <div class="age-numbers">
                  <div class="age-box">${userAge} <br><p class="text-p">${t(
      "Rs_CurrentAge"
    )}</p></div>
                    <div class="age-box">${healthAge} <br><p class="text-p">${t(
      "Rs_HealthAge"
    )}</p></div>
                    <div class="age-box">${potentialAge} <br><p class="text-p">${t(
      "Rs_PotentialAge"
    )}</p></div>
                </div>
            </div>
    
            <p style="margin-top: 15px; font-size: 13px;">
                ${t("Rs_HealthyHabitsParagraph")}</p>
            <div class="recommendations">
                <h3>${t("Rs_Recommendations")}</h3>
               ${generateRecommendationsHTML}
            </div>
                  <div class="last-div"><p class="text-p">This Pdf is Generated by Health Age App</p></div>
        </div>
    </body>
    </html>
        `;

        try {
          // ✅ 1. Generate PDF
          const options = {
            html: htmlContent,
            fileName: `${userName}_health_Report`, // no .pdf extension
            directory: "Documents", // or "cache"
          };
      
          const pdf = await RNHTMLtoPDF.convert(options);
          const tempPath = pdf.filePath;
    
          if (!tempPath) throw new Error("PDF generation failed.");
    
          // 2. Move to Expo-accessible location
          const newPath = FileSystem.documentDirectory + "Health_Report.pdf";
          await FileSystem.copyAsync({
            from: tempPath,
            to: newPath,
          });
    
          if (Platform.OS === "android") {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
              Alert.alert("Permission denied", "Storage access required.");
              return;
            }
    
            const asset = await MediaLibrary.createAssetAsync(newPath);
            await MediaLibrary.createAlbumAsync("Download", asset, false);
            Alert.alert("Success", "PDF saved to Downloads folder!");
          } else {
            // iOS - share sheet
            await Sharing.shareAsync(newPath, {
              mimeType: "application/pdf",
              dialogTitle: "Share Health Report",
            });
          }
        }   catch (error) {
          console.error("Error downloading PDF:", error);
          Alert.alert("Error", "Failed to download PDF");
      }
  };

  const saveToDownloads = async (pdfUri: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
      multiple: false,
      mode: 'save', // 👈 This enables "save" mode (Expo 47+)
  });
    console.log(result,"doc picker log");
    
    // if (result.type === 'success') {
        await FileSystem.copyAsync({
            from: pdfUri,
            to: result.assets?.[0].uri,
        });
        Alert.alert("Saved!", "PDF downloaded successfully.");
    // }
};

  React.useEffect(() => {
    const backAction = () => {
      navigation.navigate("Main"); // Ensure back goes to healthAgeTest
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove(); // Cleanup
  }, [navigation]);

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
          text="Rs_Report"
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
              <Font text={userGender} style={styles.boldText}></Font>
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
        <View style={styles.recommendations}>
          <Font text="Rs_Recommendations" style={styles.sectionTitle}></Font>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendation}>
                <View style={styles.checkIcon}>
                  <Text style={styles.checkText}>✔</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Font
                    text={rec?.title}
                    style={{ fontSize: 14, fontWeight: "bold" }}
                  ></Font>
                  <Font text={rec?.description}></Font>
                </View>
              </View>
            ))
          ) : (
            <></>
            // <View style={styles.recommendation}>
            //   <View style={styles.checkIcon}>
            //     <Text style={styles.checkText}>✔</Text>
            //   </View>
            //   <View style={{ paddingHorizontal: 10 }}>
            //     <Font
            //       text="There are no Recommendations for you follow the same healthy lifestyle"
            //       style={{ fontSize: 14, fontWeight: "bold" }}
            //     ></Font>
            //   </View>
            // </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          // position: "static",
          //   bottom: 30,
          //   left:20,
          gap: 10,
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        {/* <Button
            title="Rs_SavePdf"
            onPress={downloadPDF}
            style={{ padding: 10 }}
          ></Button> */}
      
        <Button
          title="Rs_ShareReport"
          // onPress={()=> Platform.OS=="ios" ? SharePDFIOS() : SharePDF()}
          onPress={()=>  SharePDF()}
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
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  recommendation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF3F7",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#4caf50",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
});
