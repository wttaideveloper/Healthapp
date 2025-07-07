import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList, StackParamList } from "../navigation/DrawerNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { deleteReportsFromGroup, getReportsByGroup } from "../components/utils/reportService";
import FilterModal from "../components/filterModal";
import { HealthReport } from "../components/utils/types";
import CheckBox from "../components/checkbox";

const dummyArray = [
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
  {
    name: "John David",
    gender: "Male",
    age: "27",
    height: "174 cm",
    weight: "80.0 kg",
    date: "13/02/2025",
    healthAge: 22,
  },
];

const dummyArray2 = [
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
  { name: "Albany medical camp", date: "13/02/2025", reports: "22" },
];
// type GroupDetailsScreenProps = {navigation: DrawerScreenProps<DrawerParamList, "GroupDetailsScreen">}
type NavigationProps = StackNavigationProp<
  StackParamList,
  "GroupDetailsScreen"
>;

const GroupDetailsScreen: React.FC<NavigationProps> = () => {
  const route = useRoute();
  console.log(route.params.groupId, "g ID");
  const groupId = route.params.groupId;
  const [reportsArray, setReportsArray] = React.useState([]);
  const [filterName, setFilterName] = React.useState("");
  const [filterGender, setFilterGender] = React.useState("");
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  console.log(filterName, filterGender, fromDate, toDate, "FILTERs");
const [isModalVisible, setModalVisible] = React.useState(false);
    const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let filters = {
    name: filterName,
    fromDate: fromDate ? fromDate.toISOString().split("T")[0] : undefined,
    toDate: toDate ? toDate.toISOString().split("T")[0] : undefined,
    gender: filterGender,
  };

  
  const getReportsOfAGroup = async () => {
    const res = await getReportsByGroup(groupId, filters);
    console.log(res, "check getReportsOfAGroup");

    setReportsArray(res);
  };
  // React.useEffect(() => {
  //   getReportsOfAGroup();
  // }, [groupId, filterName, filterGender, fromDate, toDate]);

  useFocusEffect(
    useCallback(() => {
      getReportsOfAGroup();
    }, [groupId, filterName, filterGender, fromDate, toDate])
  );
  useFocusEffect(
    useCallback(() => {
      setIsSelectAll(false);
    }, [])
  );

  const navigation = useNavigation<NavigationProps>();
    // const [reports, setReports] = React.useState<HealthReport[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [isSelectAll, setIsSelectAll] = React.useState(false);
    const [selectedReportIds, setSelectedReportIds] = React.useState<string[]>(
      []
    );
      const [selectedReportId, setSelectedReportId] = React.useState("");
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  const [isDeletePressed, setIsDeletePressed] = React.useState(false);
    const handleSelectAllToggle = (reports: { id: string }[]) => {
    setSelectedReportIds(reports.map((report) => report.id));
  };

    const handleCheckboxToggle = (reportId: string) => {
    setSelectedReportIds((prevSelected) => {
      if (prevSelected.includes(reportId)) {
        return prevSelected.filter((id) => id !== reportId);
      } else {
        return [...prevSelected, reportId];
      }
    });
  };

    const deleteItemByArrayOfId = (ArrayId: any) => {
      deleteReportsFromGroup(groupId,ArrayId);
      const updatedArray = reportsArray.filter((item) => !ArrayId.includes(item.id));
      // const updatedArray = reportsArray.filter((item) => item.id !== id);
      // setReports(updatedArray);
      setReportsArray(updatedArray);
      setSelectedReportIds([]);
      // setIsDeleted(true);
      setIsSelectAll(false);
    };
    const deleteItemById = (id: any) => {
      deleteReportsFromGroup(groupId,[id]);
      const updatedArray = reportsArray.filter((item) => item.id !== id);
      // setReports(updatedArray);
      setReportsArray(updatedArray);
      // setIsDeleted(true);
    };
    const isSelected = (reportId: string) => selectedReportIds.includes(reportId);

        React.useEffect(() => {
          const backAction = () => {
            navigation.goBack()
          //   Alert.alert(t("exitApp"), t("appExitConfirmation"), [
          //     {
          //       text: t("Hs_Cancel"),
          //       onPress: () => null,
          //       style: "cancel",
          //     },
          //     {
          //       text: t("Fs_Close"),
          //       onPress: () => BackHandler.exitApp(),
          //     },
          //   ]);
            return true; // Prevent default behavior (going back)
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove(); // Cleanup
        }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <Image source={icons.Arrow} style={{ width: 10, height: 16 }}></Image>
        <Font
          text="Back"
          style={{ color: "#0C9FD5", fontWeight: 500, fontSize: 16 }}
        ></Font>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            marginVertical: 20,
          }}
        >
          {/* <View
            style={{
              width: "60%",
              borderWidth: 1,
              borderColor: "#dfe9f0",
              backgroundColor: "#f4f6f9",
              borderRadius: 99999,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <LinearGradient
              colors={["#1195CD", "#2B5EA2"]}
              style={{
                padding: 10,
                borderRadius: 99999,
                backgroundColor: "#1195CD",
              }}
            >
              <Image
                source={icons.search}
                style={{ width: 14, height: 14 }}
              ></Image>
            </LinearGradient>
            <TextInput
              value={searchText}
              placeholder={"Search"}
              placeholderTextColor={"#b2b2b2"}
              onChangeText={(val) => setSearchText(val)}
              style={{ padding: 10 }}
            />
          </View> */}
          <TouchableOpacity
            onPress={() => setFilterModalVisible(true)}
            style={{
              width: "30%",
              borderWidth: 1,
              borderColor: "#dfe9f0",
              backgroundColor: "white",
              borderRadius: 99999,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <LinearGradient
              colors={["#1195CD", "#2B5EA2"]}
              style={{
                padding: 10,
                borderRadius: 99999,
                backgroundColor: "#1195CD",
              }}
            >
              <Image
                source={icons.filter}
                style={{ width: 14, height: 14 }}
              ></Image>
            </LinearGradient>

            <View style={{ padding: 10 }}>
              <Font text="Filter" style={{ color: "#262F40" }}></Font>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#F4F6F9",
          marginVertical: 10,
        }}
      ></View>
      {isSelectAll ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsSelectAll(false);
                setSelectedReportIds([]);
              }}
            >
              <Font
                text={`Hs_Cancel`}
                style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
              ></Font>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {handleSelectAllToggle(reportsArray);
              }}
            >
              <Font
                text={`Hs_SelectAll`}
                style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
              ></Font>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Font
            text={`Total ${reportsArray.length} reports`}
            style={{ fontSize: 11, color: "#92979f" }}
          ></Font>
          <TouchableOpacity onPress={() => setIsSelectAll(true)}>
            <Font
              text={`Select`}
              style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
            ></Font>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          {reportsArray.map((val, index) => {
            const reportDetails = JSON.parse(val.report_data);
            const answersArray = JSON.parse(val.answers);
            return (
              <TouchableOpacity
              onPress={() =>
                        isSelectAll ? handleCheckboxToggle(val.id) : null
                      }
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: isSelected(val.id) ? "#284374" : "#F2F5F9",
                        backgroundColor: isSelected(val.id)
                          ? "#dfe9f0"
                          : "white",
                  borderRadius: 20,
                  padding: 10,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Font
                    text={reportDetails.name}
                    style={{
                      color: "#274273",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  ></Font>
                <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Font
                            text={val.date}
                            style={{
                              color: "#92979f",
                              fontWeight: 400,
                              fontSize: 11,
                            }}
                          ></Font>
                          {isSelectAll && (
                            <CheckBox
                              value={isSelected(val.id)}
                              setValue={() => handleCheckboxToggle(val.id)}
                            ></CheckBox>
                          )}
                        </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#EFF4F780",
                    borderRadius: 20,
                    padding: 5,
                    marginVertical: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Font
                      text={reportDetails.gender}
                      style={{
                        color: "#274273",
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    ></Font>
                    <Font
                      text={reportDetails.age}
                      style={{
                        color: "#274273",
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    ></Font>
                    <Font
                      text={reportDetails.height}
                      style={{
                        color: "#274273",
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    ></Font>
                    <Font
                      text={reportDetails.weight}
                      style={{
                        color: "#274273",
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    ></Font>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Font
                      text="Health Age"
                      style={{
                        color: "#274273",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    ></Font>
                    <Font
                      text={` : ${reportDetails.healthAge}`}
                      style={{
                        color: "#274273",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    ></Font>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ReportScreen", {
                        age: reportDetails.age,
                        answers: answersArray,
                        reportData: {
                          name: reportDetails.name,
                          height: reportDetails.height,
                          age: reportDetails.age,
                          gender: reportDetails.gender,
                          weight: reportDetails.weight,
                          bloodGlucose: reportDetails.bloodGlucose,
                          bloodPressure: reportDetails.bloodPressure,
                          fasting: reportDetails.fasting,
                          bloodPressureSys: reportDetails?.bloodPressureSys,
                          bloodPressureDia: reportDetails?.bloodPressureDia,
                          bloodGlucose_mg: reportDetails?.bloodGlucose_mg,
                          bloodGlucose_mmol: reportDetails?.bloodGlucose_mmol,
                          blood_glucose_mmol_points:
                            reportDetails?.blood_glucose_mmol_points,
                          selectedGlucoseUnit:
                            reportDetails?.selectedGlucoseUnit,
                          healthAge: reportDetails.healthAge,
                          potentialAge: reportDetails.potentialAge,
                          selectedHeightUnit: reportDetails.selectedHeightUnit,
                          selectedWeightUnit: reportDetails.selectedWeightUnit,
                          weightValue: reportDetails.weightValue,
                          heightValue: reportDetails.heightValue,
                        },
                      })
                    }
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Font
                      text="View"
                      style={{
                        color: "#0B9FD4",
                        fontWeight: 500,
                        fontSize: 13,
                      }}
                    ></Font>
                    <Image
                      source={icons.Arrow}
                      style={{
                        width: 10,
                        height: 16,
                        transform: [{ scaleX: -1 }],
                      }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <FilterModal
          isModalVisible={filterModalVisible}
          toggleModal={() => setFilterModalVisible(!filterModalVisible)}
          filterName={filterName}
          setFilterName={setFilterName}
          filterGender={filterGender}
          setFilterGender={setFilterGender}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        ></FilterModal>
      </ScrollView>

<Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Font
            text={"Hs_Options"}
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

          
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.deleteModal}
                  style={{ width: 180, height: 120 }}
                ></Image>
                <Font
                  text="Hs_Confirmation"
                  style={{
                    textAlign: "center",
                    color: "#262F40",
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                ></Font>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginVertical: 20,
                }}
              >
                <Button
                  type="cancel"
                  title="Hs_Cancel"
                  style={{ padding: 10 }}
                  onPress={() => {
                    setIsDeletePressed(false);
                    toggleModal();
                  }}
                ></Button>
                <Button
                  type="delete"
                  title="Hs_Delete"
                  style={{ padding: 10 }}
                  onPress={() => {
                    if (isSelectAll) {
                      
                        deleteItemByArrayOfId(selectedReportIds);
                        setIsDeletePressed(false);
                        toggleModal();
                      
                    } else {
                      deleteItemById(selectedReportId);
                      setIsDeletePressed(false);
                      toggleModal();
                    }
                    
                  }}
                ></Button>
              </View>
            
          
        </View>
      </Modal>

        {isSelectAll && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            // backgroundColor:"red",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            marginVertical: 20,
          }}
        >
          <Button
            title="Hs_Cancel"
            style={{ padding: 10 }}
            onPress={() => {
              if (selectedReportIds.length > 0) {
                // setIsGroupModalVisible(true);
                setIsSelectAll(false);
                setSelectedReportIds([]);
              }
              // setIsDeletePressed(false);
              // toggleModal();
            }}
          ></Button>
          <Button
            type="delete"
            title="Hs_Delete"
            style={{ padding: 10 }}
            onPress={() => {
              if (selectedReportIds.length > 0) {
                toggleModal();
                setIsDeletePressed(true);
              }
            
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
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

export default GroupDetailsScreen;
