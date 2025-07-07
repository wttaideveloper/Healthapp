import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import { Asset } from "expo-asset";
export const copyExcelFileToDocumentDirectory = async () => {
  try {
    // Get the URI of the Excel file in the assets folder
    const asset = Asset.fromModule(
      require("../../../assets/files/Health_Age_Table.xlsx")
    );
    await asset.downloadAsync(); // Ensure the asset is downloaded

    // Define the destination path in the document directory
    const destinationUri =
      FileSystem.documentDirectory + "Health_Age_Table.xlsx";

    // Check if the file already exists in the document directory
    const fileInfo = await FileSystem.getInfoAsync(destinationUri);
    if (!fileInfo.exists) {
      // Copy the file from assets to the document directory
      await FileSystem.copyAsync({
        from: asset.localUri || asset.uri,
        to: destinationUri,
      });
      console.log("File copied to document directory:", destinationUri);
    } else {
      console.log("File already exists in document directory.");
    }

    return destinationUri;
  } catch (error) {
    console.error("Error copying Excel file:", error);
    return null;
  }
};

export const readExcelFile = async () => {
  try {
    // Copy the file to the document directory (if not already copied)
    const fileUri = await copyExcelFileToDocumentDirectory();
    if (!fileUri) {
      console.log("File could not be copied.");
      return null;
    }

    // Read the file as a base64 string
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Parse the Excel file
    const workbook = XLSX.read(fileContent, { type: "base64" });
    const sheetName = workbook.SheetNames[0]; // Assuming Sheet2 is the second sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null;
  }
};

export const calculateHealthAge = (
  data: any[],
  age: number,
  habitScore: number
): number | null => {
  try {
    console.log(data, "data check");
    console.log(age, "age check");
    console.log(habitScore, "habitScore check");

    const ageRow = data.find((row: any) => Number(row[0]) === age);
    if (!ageRow) {
      console.log("Age not found in the data.");
      return null;
    }

    const headers = data[0].map((col: string) => col.trim()); // Trim spaces from headers
    const habitScoreColumn = headers.indexOf(`Habit Score: ${habitScore}`);

    if (habitScoreColumn === -1) {
      console.log("Habit score not found in the data.");
      return null;
    }

    const healthAgeDelta = ageRow[habitScoreColumn];

    if (typeof healthAgeDelta !== "number") {
      console.log("Invalid health age delta.");
      return null;
    }

    const HealthAge = age + healthAgeDelta;
    console.log(Math.round(HealthAge),"check Health age");
    const roundedHealthAge = Math.round(HealthAge * 10) / 10;

    return roundedHealthAge;
  } catch (error) {
    console.error("Error calculating health age:", error);
    return null;
  }
};

export const calculatePotentialHealthAge = (
  data: any[],
  age: number,
  habitScore: number
): number | null => {
  try {
    const ageRow = data.find((row: any) => Number(row[0]) === age);
    if (!ageRow) {
      console.log("Age not found in the data.");
      return null;
    }

    const headers = data[0].map((col: string) => col.trim()); // Trim spaces from headers
    const habitScoreColumn = headers.indexOf(`Habit Score: ${habitScore}`);

    if (habitScoreColumn === -1) {
      console.log("Habit score not found in the data.");
      return null;
    }

    const healthAgeDelta = ageRow[habitScoreColumn];

    if (typeof healthAgeDelta !== "number") {
      console.log("Invalid health age delta.");
      return null;
    }

    const potentialHealthAge = age + healthAgeDelta;
    const roundedPotentialAge = Math.round(potentialHealthAge * 10) / 10;
    return roundedPotentialAge;
  } catch (error) {
    console.error("Error calculating potential age:", error);
    return null;
  }
};
