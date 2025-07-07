import { useTranslation } from "react-i18next";

const { t } = useTranslation();
export function checkBloodPressureStatus(systolic: number, diastolic: number): string {
    // Normal blood pressure ranges

    const isNormal = systolic >= 90 && systolic < 120 && 
                     diastolic >= 60 && diastolic < 80;
  
    if (isNormal) {
      return `${t("normalBp")} (${systolic}/${diastolic})`;
    } else {
      return `${t("MaintainBp")} (${systolic}/${diastolic}). ` +
             `${t("bpRange")}`;
    }
  }

export function checkGlucoseLevel(
    glucoseValue: number,
    unit: "mg/dL" | "mmol/L",
    isFasting: boolean
  ): string {
    const { t } = useTranslation();
    // Convert mmol/L to mg/dL for consistent comparison if needed
    const valueMgDl = unit === "mmol/L" ? glucoseValue * 18 : glucoseValue;
  
    let isNormal = false;
    let normalRange = "";
  
    if (isFasting) {
      // Fasting glucose standards
      isNormal = valueMgDl >= 70 && valueMgDl < 100;
      normalRange = unit === "mg/dL" ? "70-99 mg/dL" : "3.9-5.5 mmol/L";
    } else {
      // Post-meal glucose standards (2 hours after eating)
      isNormal = valueMgDl >= 70 && valueMgDl < 140;
      normalRange = unit === "mg/dL" ? "70-139 mg/dL" : "3.9-7.7 mmol/L";
    }
  
    const formattedValue = unit === "mg/dL" 
      ? `${glucoseValue} mg/dL`
      : `${glucoseValue} mmol/L`;
  
    if (isNormal) {
      return `${t("normalGlucoseLevel")} (${formattedValue})`;
    } else {
      return `${t("maintainGlucoseLevel")} (${formattedValue}). ` +
             `${t("normalRangeGlucose")} ${normalRange} ${t("for")} ${isFasting ? `${t("fasting")}` : `${t("postMeal")}`} ${t("test")}.`;
    }
  }
  
