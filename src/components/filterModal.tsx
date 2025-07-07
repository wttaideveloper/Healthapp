import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction } from "react";
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
import CheckBox from "../components/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

type FilterModalProps = {
  isModalVisible: boolean;
  toggleModal: () => void;
  filterName: string;
  setFilterName: React.Dispatch<SetStateAction<string>>;

  filterGender: string;
  setFilterGender: React.Dispatch<SetStateAction<string>>;

  fromDate: string;
  setFromDate: React.Dispatch<SetStateAction<string>>;

  toDate: string;
  setToDate: React.Dispatch<SetStateAction<string>>;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  toggleModal,
  filterName,
  setFilterName,

  filterGender,
  setFilterGender,

  fromDate,
  setFromDate,

  toDate,
  setToDate,
}) => {
  const [showFromPicker, setShowFromPicker] = React.useState(false);
  const [showToPicker, setShowToPicker] = React.useState(false);
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Font
              text="Fs_Filter"
              style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
            ></Font>
            <TouchableOpacity
              onPress={() => toggleModal()}
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
          {/* <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}> */}
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              backgroundColor: "#F4F6F9",
              padding: 16,
              borderRadius: 24,
              marginVertical: 10,
            }}
          >
            <Font
              text="Is_Name"
              style={{ color: "#8d929d", fontSize: 12, fontWeight: 500 }}
            ></Font>
            <View
              style={{
                backgroundColor: "#E2E7F0",
                borderRadius: 40,
                borderWidth: 1,
                borderColor: "#DFE9F0",
                padding: 10,
              }}
            >
              <TextInput
                value={filterName}
                onChangeText={(val) =>
                  setFilterName( val)
                }
                placeholder={t("enterName")}
                placeholderTextColor={"#8d929d"}
              ></TextInput>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              backgroundColor: "#F4F6F9",
              padding: 16,
              borderRadius: 24,
              marginVertical: 10,
            }}
          >
            <Font
              text="Fs_Date"
              style={{ color: "#8d929d", fontSize: 12, fontWeight: 500 }}
            ></Font>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowFromPicker(true)}
                style={{
                  backgroundColor: "#E2E7F0",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: "#DFE9F0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={icons.calendar}
                  style={{ width: 15, height: 16 }}
                ></Image>
                <Font
                  text={fromDate ? fromDate.toDateString() : "Fs_From"}
                  style={{ color: "#8d929d", fontSize: 14 }}
                ></Font>
              </TouchableOpacity>

              {showFromPicker && (
                <DateTimePicker
                  value={fromDate || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"}
                  onChange={(_, date) => {
                    setShowFromPicker(false);
                    if (date) {
                      setFromDate(date);
                      if (toDate && date > toDate) {
                        setToDate(null); // Reset "To Date" if it's before "From Date"
                      }
                    }
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  if (!fromDate) {
                    alert("Select From Date First");
                    return;
                  }
                  setShowToPicker(true);
                }}
                style={{
                  backgroundColor: "#E2E7F0",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: "#DFE9F0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={icons.calendar}
                  style={{ width: 15, height: 16 }}
                ></Image>
                <Font
                  text={toDate ? toDate.toDateString() : "Fs_To"}
                  style={{ color: "#8d929d", fontSize: 14 }}
                ></Font>
              </TouchableOpacity>
              {showToPicker && (
                <DateTimePicker
                  value={toDate || (fromDate ? fromDate : new Date())}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"}
                  minimumDate={fromDate || new Date()} // Prevents selecting a date before "From Date"
                  onChange={(_, date) => {
                    setShowToPicker(false);
                    if (date) setToDate(date);
                  }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              backgroundColor: "#F4F6F9",
              padding: 16,
              borderRadius: 24,
              marginVertical: 10,
            }}
          >
            <Font
              text="gender"
              style={{ color: "#8d929d", fontSize: 12, fontWeight: 500 }}
            ></Font>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 5,
              }}
            >
              <CheckBox
                value={filterGender == "male"}
                setValue={() =>
                  setFilterGender("male")
                }
              ></CheckBox>
              <Font
                text="male"
                style={{ color: "#262F40", fontSize: 12 }}
              ></Font>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 5,
              }}
            >
              <CheckBox
                value={filterGender== "female"}
                setValue={() =>
                    setFilterGender("female")
                }
              ></CheckBox>
              <Font
                text="female"
                style={{ color: "#262F40", fontSize: 12 }}
              ></Font>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
             setFilterName("");
             setFilterGender("");
             setFromDate("");
             setToDate("");
            }}
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "flex-end",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Font
              text="Fs_ClearAll"
              style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
            ></Font>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        <Button title="Fs_ShowResults" style={{ padding: 10 }} onPress={toggleModal}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
    // paddingHorizontal: 20,
    paddingVertical: 10,
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    // flexDirection:"row",

    // borderTopLeftRadius: 32,
    // borderTopRightRadius: 32,
    // alignItems: "center",
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

export default FilterModal;
