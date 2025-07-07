import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {
  getSettings,
  saveSettings,
  updateImage,
} from "../components/utils/reportService";
import { useFocusEffect } from "@react-navigation/native";
type ReportScreenProps = DrawerScreenProps<DrawerParamList, "ReportSettings">;
const ReportSettings: React.FC<ReportScreenProps> = ({ navigation, route }) => {
  const [logoUri, setLogoUri] = React.useState<string | null>(null);
  const [contactDetails, setContactDetails] = React.useState("");
  const [addrDetails, setAddrDetails] = React.useState("");

  // Pick an image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // ✅ Correct way
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
      console.log("Selected Image URI:", result.assets[0].uri);
    }
  };

  // const copyFileToAppStorage = async () => {
  //   const asset = Asset.fromModule(
  //     require("../../assets/files/blankReport.pdf")
  //   ); // Adjust path if needed
  //   await asset.downloadAsync();

  //   const destPath = FileSystem.documentDirectory + "blankReport.pdf";
  //   await FileSystem.copyAsync({
  //     from: asset.localUri!,
  //     to: destPath,
  //   });

  //   console.log("PDF copied successfully to:", destPath);
  // };

  // React.useEffect(() => {
  //   const initializePdf = async () => {
  //     await copyFileToAppStorage();
  //   };
  //   initializePdf();
  // }, []);

  // // Function to edit and save PDF
  // const generatePdf = async () => {
  //   try {
  //     // Load existing PDF
  //     const pdfPath = FileSystem.documentDirectory + "blankReport.pdf";
  //     const pdfBytes = await FileSystem.readAsStringAsync(pdfPath, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     const pdfDoc = await PDFDocument.load(pdfBytes);
  //     const pages = pdfDoc.getPages();
  //     const firstPage = pages[0];

  //     // Add logo if selected
  //     if (logoUri) {
  //       try {
  //         const imgBytes = await FileSystem.readAsStringAsync(logoUri, {
  //           encoding: FileSystem.EncodingType.Base64,
  //         });

  //         // Try both PNG and JPG embedding
  //         let image;
  //         try {
  //           image = await pdfDoc.embedPng(imgBytes);
  //         } catch (e) {
  //           image = await pdfDoc.embedJpg(imgBytes);
  //         }

  //         const { width, height } = firstPage.getSize();
  //         firstPage.drawImage(image, {
  //           x: 20,
  //           y: height - 60,
  //           width: 50,
  //           height: 50,
  //         });
  //       } catch (imageError) {
  //         console.error("Error embedding image:", imageError);
  //       }
  //     }

  //     // Add contact details
  //     firstPage.drawText(contactDetails, {
  //       x: 20,
  //       y: 20,
  //       size: 12,
  //       color: rgb(0, 0, 0),
  //     });

  //     // Save new PDF - No Buffer needed!
  //     const modifiedPdfBytes = await pdfDoc.save();
  //     const newPdfPath = FileSystem.documentDirectory + "modified.pdf";

  //     // Directly use the Uint8Array from pdfDoc.save()
  //     const binaryString = Array.from(modifiedPdfBytes)
  //       .map((byte) => String.fromCharCode(byte))
  //       .join("");
  //     const base64Pdf = btoa(binaryString);

  //     await FileSystem.writeAsStringAsync(newPdfPath, base64Pdf, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     // Share the PDF
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(newPdfPath);
  //     }
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  const saveReportSettings = async () => {
    await saveSettings(contactDetails, addrDetails, logoUri);
    alert("Details Saved!");
    await fetchReportSettings();
    // Get settings
  };

  const fetchReportSettings = async () => {
    const currentSettings = await getSettings();
    setContactDetails(currentSettings.phoneNumber);
    setAddrDetails(currentSettings.address);
    setLogoUri(currentSettings.image || null);
    console.log(currentSettings, "currentSettings");
  };
  useFocusEffect(
    useCallback(() => {
      fetchReportSettings();
    }, [])
  );

  const UpdateTheImage = async () => {
    await updateImage(logoUri);
    // await fetchReportSettings();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Font
                text="Report Settings"
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
                  text="Close"
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
                source={icons.reportSetting}
                style={{
                  width: 321,
                  height: 115,
                  borderWidth: 2,
                  borderColor: "#DFE9F0",
                  borderRadius: 12,
                }}
              ></Image>
            </View>
            {/* <Button title="Pick Logo" onPress={pickImage} /> */}
            <View style={{ flexDirection: "column", gap: 10 }}>
              {!logoUri && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                      gap: 10,
                    }}
                  >
                    <Font
                      style={{ fontSize: 16, fontWeight: 400 }}
                      text={"Upload your logo"}
                    ></Font>
                    <View
                      style={[
                        {
                          borderWidth: 1,
                          borderColor: "#dfe9f0",
                          borderRadius: 99999,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={pickImage}
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          gap: 8,
                          padding: 10,
                        }}
                      >
                        <Image
                          source={icons.upload}
                          style={{ width: 18, height: 18 }}
                        ></Image>
                        <Font
                          style={{
                            color: "#b1b1b1",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          text="Upload"
                        ></Font>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {logoUri && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Image
                        source={{ uri: logoUri }}
                        style={{ width: 100, height: 100, marginTop: 10 }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Button
                      title="Remove Logo"
                      onPress={() => {
                        UpdateTheImage();
                        setLogoUri("");
                      }}
                      style={{ padding: 5 }}
                    ></Button>
                  </View>
                </>
              )}

              <View style={{ marginVertical: 10 }}>
                <Font
                  text="Contact Details"
                  style={{ fontWeight: 700, fontSize: 18, color: "#262F40" }}
                ></Font>
              </View>

              <CustomInput
                title="Address"
                placeHolder="Enter Address"
                value={addrDetails}
                onChangeText={(val) => setAddrDetails(val)}
              ></CustomInput>
              <CustomInput
                title="Phone"
                type="phone-pad"
                placeHolder="Enter Phone Number"
                value={contactDetails}
                onChangeText={(val) => setContactDetails(val)}
              ></CustomInput>
            </View>
            <Button
              title="Save"
              style={{ padding: 10, marginTop: 40 }}
              onPress={saveReportSettings}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReportSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
});
