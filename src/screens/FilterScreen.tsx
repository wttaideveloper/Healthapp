import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
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

type FilterScreenProps = DrawerScreenProps<DrawerParamList, "FilterScreen">;

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, route }) => {
  const [filterOption, setFilterOptions] = React.useState({
    name: "",
    fromDate: "",
    toDate: "",
    gender: "",
  });

  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = React.useState(false);
  const [showToPicker, setShowToPicker] = React.useState(false);

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
          text="Filter by"
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        ></Font>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
          text="Name"
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
            value={filterOption.name}
            onChangeText={(val) =>
              setFilterOptions((prev) => ({ ...prev, name: val }))
            }
            placeholder="Enter name"
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
          text="Date"
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
              overflow:"hidden"
            }}
          >
            <Image
              source={icons.calendar}
              style={{ width: 15, height: 16 }}
            ></Image>
            <Font
              text={fromDate ? fromDate.toDateString() : "From"}
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
              overflow:"hidden"
            }}
          >
            <Image
              source={icons.calendar}
              style={{ width: 15, height: 16 }}
            ></Image>
            <Font
              text={toDate ? toDate.toDateString() : "To"}
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
          text="Gender"
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
            value={filterOption.gender == "male"}
            setValue={() =>
              setFilterOptions((prev) => ({ ...prev, gender: "male" }))
            }
          ></CheckBox>
          <Font text="Male" style={{ color: "#262F40", fontSize: 12 }}></Font>
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
            value={filterOption.gender == "female"}
            setValue={() =>
              setFilterOptions((prev) => ({ ...prev, gender: "female" }))
            }
          ></CheckBox>
          <Font text="Female" style={{ color: "#262F40", fontSize: 12 }}></Font>
        </View>
      </View>
      <TouchableOpacity
      
        onPress={() => {
          setFilterOptions({
            name: "",
            gender: "",
            fromDate: "",
            toDate: "",
          });
        }}
        style={{
          flexDirection: "row",
          gap: 4,
          justifyContent: "flex-end",
          alignItems: "center",
          marginVertical:10,
        }}
      >
        <Font
          text="Clear all"
          style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
        ></Font>
      </TouchableOpacity>
      {/* </View> */}
      <Button title="Show results" style={{ padding: 10 }} />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
});
