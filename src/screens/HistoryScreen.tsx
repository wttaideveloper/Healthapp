import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
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
import Modal from "react-native-modal";
import { DeleteMessageModal } from "../components/modal";
import {
  addReportsToGroup,
  createGroup,
  deleteGroups,
  deleteReports,
  exportGroupReportsToCSV,
  getAllGroups,
  getAllReports,
  getTotalReportCount,
} from "../components/utils/reportService";
import { HealthReport } from "../components/utils/types";
import CheckBox from "../components/checkbox";
import CustomInput from "../components/CustomInput";
import FilterModal from "../components/filterModal";
import { useTranslation } from "react-i18next";
import UpgradeModal from "../components/upgradeModal";
import { verifySubscriptionStatus } from "../components/utils/purchase";

// type HistoryScreenProps = {navigation: DrawerScreenProps<DrawerParamList, "HistoryScreen">}
type NavigationProps = StackNavigationProp<StackParamList, "HistoryScreen">;

const HistoryScreen: React.FC<NavigationProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] =
    React.useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = React.useState(false);
  const [isNewGroupPressed, setIsNewGroupPressed] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState("");
  const [searchGroupName, setSearchGroupName] = React.useState("");
  const [isExistingGroupPressed, setIsExistingGroupPressed] =
    React.useState(false);

  // const [arrayDummy, setArrayDummy] = React.useState(dummyArray);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  const [filterName, setFilterName] = React.useState("");
  const [filterGender, setFilterGender] = React.useState("");
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const [reportsLength, setReportsLength] = React.useState<number>(0);
  // console.log(filterGender, "filterGender");

  const getReportsCount = async () => {
    const res = await getTotalReportCount();
    console.log(res, " Total reports count");
    setReportsLength(res);
  };

  let filters = {
    name: filterName,
    fromDate: fromDate ? fromDate.toISOString().split("T")[0] : undefined,
    toDate: toDate ? toDate.toISOString().split("T")[0] : undefined,
    gender: filterGender,
  };

  const safeJsonParse = useCallback(<T,>(value: unknown, fallback: T): T => {
    if (typeof value !== "string") return fallback;
    const trimmed = value.trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null") return fallback;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return fallback;
    }
  }, []);

  // const checkSubscription = async () => {
  //   const { isValid } = await verifySubscriptionStatus();
  //   console.log("Subscription is valid:", isValid);
  //   return true;
  // };

  const fetchReports = async (reset = false) => {
    try {
      if (reset) {
        setPage(0);
        setHasMore(true);
      }
      const offset = reset ? 0 : page * limit;
      const newData = await getAllReports(filters, limit, offset);
      // console.log(newData,"new data");

      if (newData.length < limit) setHasMore(false);

      setReports((prev) => (reset ? newData : [...prev, ...newData]));
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleGroupModal = () => {
    setIsGroupModalVisible(!isGroupModalVisible);
    setIsNewGroupPressed(false);
    setIsExistingGroupPressed(false);
    // setIsExportPressed(false);
  };
  const deleteItemByArrayOfId = (ArrayId: any) => {
    deleteReports(ArrayId);
    const updatedArray = reports.filter((item) => !ArrayId.includes(item.id));
    setReports(updatedArray);
    setSelectedReportIds([]);
    setIsDeleted(true);
    setIsSelectAll(false);
  };
  const deleteGroupByArrayOfId = () => {
    deleteGroups(selectedGroupIdsToDelete);
    const updatedArray = groupsArray.filter(
      (item) => !selectedGroupIdsToDelete.includes(item.id)
    );
    setGroupsArray(updatedArray);
    setSelectedGroupIdsToDelete([]);
    setIsDeleted(true);
    setIsSelectAll(false);
  };
  const [searchText, setSearchText] = React.useState("");
  const [tab, setTab] = React.useState("List");
  const [isSelectAll, setIsSelectAll] = React.useState(false);
  const [isSelectAllGroup, setIsSelectAllGroup] = React.useState(false);
  const [selectedGroupIdsToDelete, setSelectedGroupIdsToDelete] =
    React.useState([]);
  const [groupsArray, setGroupsArray] = React.useState([]);

  const [reports, setReports] = React.useState<HealthReport[]>([]);

  const [selectedReportIds, setSelectedReportIds] = React.useState<string[]>(
    []
  );
  const [selectedGroupIdsToAddReport, setSelectedGroupIdsToAddReport] =
    React.useState("");
  console.log(selectedReportIds, "selectedReportIds");

  const handleCheckboxToggle = (reportId: string) => {
    setSelectedReportIds((prevSelected) => {
      if (prevSelected.includes(reportId)) {
        return prevSelected.filter((id) => id !== reportId);
      } else {
        return [...prevSelected, reportId];
      }
    });
  };

  const handleSelectAllToggle = (reports: { id: string }[]) => {
    setSelectedReportIds(reports.map((report) => report.id));
  };

  const [page, setPage] = React.useState(0);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [hasMoreData, setHasMoreData] = React.useState(true);
  const limit = 10;

  useFocusEffect(
    useCallback(() => {
      fetchReports(true);
      setSelectedReportIds([]);
    }, [route, tab, filterName, filterGender, fromDate, toDate])
  );

  React.useEffect(() => {
    if (page === 0) return;
    fetchReports();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      getReportsCount();
    }, [reports])
  );
  const loadMore = () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  const handleCheckboxToggleForGroups = (groupId: string) => {
    setSelectedGroupIdsToDelete((prevSelected) => {
      if (prevSelected.includes(groupId)) {
        return prevSelected.filter((id) => id !== groupId);
      } else {
        return [...prevSelected, groupId];
      }
    });
  };

  const handleSelectAllToggleForGroups = (groups: { id: string }[]) => {
    setSelectedGroupIdsToDelete(groups.map((group) => group.id));
  };
  console.log(selectedGroupIdsToDelete, "selectedGroupIdsToDelete");

  const isSelected = (reportId: string) => selectedReportIds.includes(reportId);
  const isSelectedGroup = (groupId: string) =>
    selectedGroupIdsToDelete.includes(groupId);
  const isSelectedGroupToAddAReport = (groupId: string) =>
    selectedGroupIdsToAddReport.includes(groupId);

  const createAndAddToGroup = async () => {
    if (newGroupName.trim() === "") {
      return;
    }
    const groupId = await createGroup(newGroupName, "Description");
    selectedReportIds.length > 0
      ? await addReportsToGroup(groupId, selectedReportIds)
      : null;
    GetAllGroupsAvailable();
    setIsGroupModalVisible(false);
    setIsNewGroupPressed(false);
    setNewGroupName("");
    setIsSelectAll(false);
    setSelectedReportIds([]);
    setSelectedGroupIdsToDelete([]);
    Alert.alert("Group created successfully", "", [
      {
        text: t("Fs_Close"),
        onPress: () => null,
        style: "cancel",
      },
    ]);
    // alert("Added to group successfully !");
  };

  const GetAllGroupsAvailable = async () => {
    const res = await getAllGroups();
    console.log(res, "GetAllGroupsAvailable");

    setGroupsArray(res);
  };

  useFocusEffect(
    useCallback(() => {
      GetAllGroupsAvailable();
    }, [tab])
  );

  const handleExport = async (groupId: string, groupName: string) => {
    try {
      const fileUri = await exportGroupReportsToCSV(groupId, groupName);
      Alert.alert(t("success"), `${t("exportedTo")} ${fileUri}`, [
        {
          text: t("Fs_Close"),
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } catch (error) {
      Alert.alert(t("Error"), "", [
        {
          text: t("Fs_Close"),
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  };
  const { t } = useTranslation();

  const navigateToReport = React.useCallback(
    (reportDetails: any, answersArray: any[], reportId: string) => {
      navigation.navigate("ReportScreen", {
        age: reportDetails?.age,
        answers: answersArray,
        reportId,
        reportData: {
          name: reportDetails?.name,
          height: reportDetails?.height,
          age: reportDetails?.age,
          gender: reportDetails?.gender,
          weight: reportDetails?.weight,
          bloodGlucose: reportDetails?.bloodGlucose,
          bloodPressure: reportDetails?.bloodPressure,
          fasting: reportDetails?.fasting,
          bloodPressureSys: reportDetails?.bloodPressureSys,
          bloodPressureDia: reportDetails?.bloodPressureDia,
          bloodGlucose_mg: reportDetails?.bloodGlucose_mg,
          bloodGlucose_mmol: reportDetails?.bloodGlucose_mmol,
          blood_glucose_mmol_points: reportDetails?.blood_glucose_mmol_points,
          selectedGlucoseUnit: reportDetails?.selectedGlucoseUnit,
          healthAge: reportDetails?.healthAge,
          potentialAge: reportDetails?.potentialAge,
          selectedWeightUnit: reportDetails?.selectedWeightUnit,
          selectedHeightUnit: reportDetails?.selectedHeightUnit,
          weightValue: reportDetails?.weightValue,
          heightValue: reportDetails?.heightValue,
        },
      });
    },
    [navigation]
  );

  React.useEffect(() => {
    const backAction = () => {
      setIsGroupModalVisible(false);
      navigation.goBack();
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
              placeholder={t("search")}
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
              <Font text="Hs_Filter" style={{ color: "#262F40" }}></Font>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ width: "100%", borderWidth: 1, borderColor: "#F4F6F9" }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          gap: 10,
          width: "100%",
        }}
      >
        <Button
          title="Hs_List"
          style={{ padding: 5 }}
          disabled={tab == "Group" ? true : false}
          onPress={() => {
            setTab("List");
            if (tab == "Group") {
              setIsSelectAll(false);
            }
          }}
        ></Button>
        <Button
          onPress={() => {
            setTab("Group");
            if (tab == "List") {
              setIsSelectAll(false);
            }
          }}
          disabled={tab == "List" ? true : false}
          title="Hs_Group"
          style={{ padding: 5 }}
        ></Button>
      </View>

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
                setSelectedGroupIdsToDelete([]);
              }}
            >
              <Font
                text={`Hs_Cancel`}
                style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
              ></Font>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                tab == "Group"
                  ? handleSelectAllToggleForGroups(groupsArray)
                  : handleSelectAllToggle(reports);
              }}
            >
              <Font
                text={`Hs_SelectAll`}
                style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
              ></Font>
            </TouchableOpacity>
          </View>
        </>
      ) : tab == "Group" ? (
        groupsArray.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Font
                  text={`total`}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
                <Font
                  text={" " + `${reportsLength}` + " "}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
                <Font
                  text={`reports`}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => setIsSelectAll(true)}>
                  <Font
                    text={`select`}
                    style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
                  ></Font>
                </TouchableOpacity>
                {/* <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#EAECF1",
                  borderRadius: 999999,
                }}
              >
                <Image
                  source={icons.edit}
                  style={{ width: 14, height: 14 }}
                ></Image>
              </View> */}
              </View>
            </View>
          </>
        ) : (
          <></>
        )
      ) : tab == "List" ? (
        reports.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Font
                text={`Total ${reports.length} reports`}
                style={{ fontSize: 11, color: "#92979f" }}
              ></Font> */}
              <View style={{ flexDirection: "row" }}>
                <Font
                  text={`total`}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
                <Font
                  text={" " + `${reportsLength}` + " "}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
                <Font
                  text={`reports`}
                  style={{ fontSize: 11, color: "#92979f" }}
                ></Font>
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => setIsSelectAll(true)}>
                  <Font
                    text={`select`}
                    style={{ fontWeight: 500, fontSize: 16, color: "#0C9FD5" }}
                  ></Font>
                </TouchableOpacity>
                {/* <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#EAECF1",
                  borderRadius: 999999,
                }}
              >
                <Image
                  source={icons.edit}
                  style={{ width: 14, height: 14 }}
                ></Image>
              </View> */}
              </View>
            </View>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 200,
          }}
        >
          {tab == "List" ? (
            reports.length ? (
              <View>
                {reports.map((val, index) => {
                  const reportDetails = safeJsonParse<any>(val.report_data, {});
                  const answersArray = safeJsonParse<any[]>(val.answers, []);
                  console.log(reportDetails, "reportDetails");
                  const displayName =
                    reportDetails?.name ??
                    reportDetails?.Name ??
                    (val as any)?.user_name ??
                    (val as any)?.userName ??
                    "Unknown";
                  const displayGender =
                    reportDetails?.gender ?? reportDetails?.Gender ?? "Unknown";
                  const displayAge = reportDetails?.age ?? reportDetails?.Age ?? "-";
                  const displayHeight =
                    reportDetails?.height ?? reportDetails?.Height ?? "-";
                  const displayWeight =
                    reportDetails?.weight ?? reportDetails?.Weight ?? "-";
                  const displayHealthAge =
                    reportDetails?.healthAge ??
                    reportDetails?.HealthAge ??
                    reportDetails?.health_age ??
                    "-";

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (isSelectAll) {
                          handleCheckboxToggle(val.id);
                          return;
                        }
                        navigateToReport(reportDetails, answersArray, val.id);
                      }}
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
                          text={String(displayName)}
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
                            text={String(displayGender)}
                            style={{
                              color: "#274273",
                              fontWeight: 500,
                              fontSize: 11,
                            }}
                          ></Font>
                          <Font
                            text={String(displayAge)}
                            style={{
                              color: "#274273",
                              fontWeight: 500,
                              fontSize: 11,
                            }}
                          ></Font>
                          <Font
                            text={String(displayHeight)}
                            style={{
                              color: "#274273",
                              fontWeight: 500,
                              fontSize: 11,
                            }}
                          ></Font>
                          <Font
                            text={String(displayWeight)}
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
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Font
                            text="Rs_HealthAge"
                            style={{
                              color: "#274273",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          ></Font>
                          <Font
                            text={` : ${String(displayHealthAge)}`}
                            style={{
                              color: "#274273",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          ></Font>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            navigateToReport(reportDetails, answersArray, val.id);
                          }}
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Font
                            text="Hs_View"
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
                {hasMore && (
                  <TouchableOpacity
                    onPress={loadMore}
                    style={{ padding: 10, alignItems: "center" }}
                  >
                    <Text style={{ color: "#0B9FD4", fontWeight: "bold" }}>
                      {isLoadingMore ? "Loading..." : "Load More"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    source={icons.NothingYet}
                    style={{ width: 225, height: 150 }}
                  ></Image>
                </View>
                <Font
                  text="Hs_Nothing"
                  style={{ fontSize: 18, fontWeight: 600, color: "#262F40" }}
                ></Font>
                <Font
                  text="Hs_NothingDesc"
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#262F40",
                    textAlign: "center",
                  }}
                ></Font>
              </View>
            )
          ) : groupsArray.length ? (
            groupsArray.map((val, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (isSelectAll) {
                    handleCheckboxToggleForGroups(val.id);
                    return;
                  }
                  navigation.navigate("GroupDetailsScreen", {
                    groupName: val.name,
                    groupId: val.id,
                  });
                }}
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: isSelectedGroup(val.id) ? "#284374" : "#F2F5F9",
                  backgroundColor: isSelectedGroup(val.id)
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
                    text={val.name}
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
                      gap: 10,
                    }}
                  >
                    <Font
                      text={val.created_at}
                      style={{
                        color: "#92979f",
                        fontWeight: 400,
                        fontSize: 11,
                      }}
                    ></Font>
                    {isSelectAll && (
                      <CheckBox
                        value={isSelectedGroup(val.id)}
                        setValue={() => handleCheckboxToggleForGroups(val.id)}
                      ></CheckBox>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Font
                      text={`${val.report_count} `}
                      style={{
                        color: "#274273",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    ></Font>
                    <Font
                      text="Hs_Reports"
                      style={{
                        color: "#274273",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    ></Font>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("GroupDetailsScreen", {
                        groupName: val.name,
                        groupId: val.id,
                      });
                    }}
                    // onPress={() => handleExport(val.id, val.name)}
                    // onPress={() =>
                    //   navigation.navigate("GroupDetailsScreen", {
                    //     groupName: val.name,
                    //     groupId: val.id,
                    //   })
                    // }
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Font
                      text="Hs_View"
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
            ))
          ) : (
            <>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: 40,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Font text="Hs_Nothing"></Font>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      {tab == "Group" && !isSelectAll && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            padding: 10,
          }}
        >
          <Button
            title="Hs_Create"
            style={{ padding: 10 }}
            onPress={() => {
              setIsGroupModalVisible(true);
              setIsNewGroupPressed(true);
            }}
          ></Button>
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Font
            text="Hs_Confirmation"
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
                toggleModal();
              }}
            ></Button>
            <Button
              type="delete"
              title="Hs_Delete"
              style={{ padding: 10 }}
              onPress={() => {
                if (tab == "Group") {
                  deleteGroupByArrayOfId();
                } else {
                  deleteItemByArrayOfId(selectedReportIds);
                }
                toggleModal();
              }}
            ></Button>
          </View>
        </View>
      </Modal>

      {/* Group modal  */}
      <Modal
        isVisible={isGroupModalVisible}
        onBackdropPress={toggleGroupModal}
        onSwipeComplete={toggleGroupModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
        >
          <View
            style={[
              styles.modalContent,
              { ...{ height: isExistingGroupPressed ? 600 : "auto" } },
            ]}
          >
          <Font
            text={
              isNewGroupPressed
                ? "Hs_NewGroup"
                : isExistingGroupPressed
                ? "Hs_ExistingGroup"
                : "Hs_Group"
            }
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
          {isNewGroupPressed ? (
            <>
              <CustomInput
                title="Hs_GroupName"
                placeHolder="Enter group name"
                value={newGroupName}
                onChangeText={(val) => setNewGroupName(val)}
              ></CustomInput>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginVertical: 20,
                }}
              >
                <Button
                  onPress={() => {
                    setIsGroupModalVisible(false);
                    setIsNewGroupPressed(false);
                    setNewGroupName("");
                  }}
                  type="cancel"
                  title="Hs_Cancel"
                  style={{ padding: 10 }}
                ></Button>
                <Button
                  // disabled={!newGroupName}
                  title="Hs_Create"
                  style={{ padding: 10 }}
                  onPress={() => createAndAddToGroup()}
                ></Button>
              </View>
            </>
          ) : isExistingGroupPressed ? (
            <>
              <View
                style={{
                  width: "100%",
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
                  value={searchGroupName}
                  placeholder={t("Hs_Search")}
                  placeholderTextColor={"#b2b2b2"}
                  onChangeText={(val) => setSearchGroupName(val)}
                  style={{ padding: 10 }}
                />
              </View>

              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                {groupsArray.map((val, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGroupIdsToAddReport(val.id);
                    }}
                    key={index}
                    style={{
                      width: "100%",
                      // flex:1,
                      borderWidth: 1,
                      backgroundColor: isSelectedGroupToAddAReport(val.id)
                        ? "#dfe9f0"
                        : "white",
                      borderColor: isSelectedGroupToAddAReport(val.id)
                        ? "#274273"
                        : "#F2F5F9",
                      borderRadius: 20,
                      padding: 10,
                      marginVertical: 10,
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
                        text={val.name}
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
                          gap: 10,
                        }}
                      >
                        <Font
                          text={val.created_at}
                          style={{
                            color: "#92979f",
                            fontWeight: 400,
                            fontSize: 11,
                          }}
                        ></Font>
                        <CheckBox
                          value={isSelectedGroupToAddAReport(val.id)}
                          setValue={() =>
                            setSelectedGroupIdsToAddReport(val.id)
                          }
                        ></CheckBox>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 20,
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Font
                          text={`${val.report_count} `}
                          style={{
                            color: "#274273",
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        ></Font>
                        <Font
                          text="Reports"
                          style={{
                            color: "#274273",
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        ></Font>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginVertical: 20,
                }}
              >
                <Button
                  onPress={() => {
                    setIsNewGroupPressed(false);
                    setNewGroupName("");
                    setIsExistingGroupPressed(false);
                    // setIsGroupModalVisible(false)
                  }}
                  type="cancel"
                  title="Hs_Cancel"
                  style={{ padding: 10 }}
                ></Button>
                <Button
                  title="Save"
                  style={{ padding: 10 }}
                  onPress={() => {
                    addReportsToGroup(
                      selectedGroupIdsToAddReport,
                      selectedReportIds
                    );
                    Alert.alert(t("addedToGroup"), "", [
                      {
                        text: t("Fs_Close"),
                        onPress: () => null,
                        style: "cancel",
                      },
                    ]);
                    // alert("Added to the group");
                    setSelectedReportIds([]);
                    setIsGroupModalVisible(false);
                    setNewGroupName("");
                    setIsExistingGroupPressed(false);
                  }}
                ></Button>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setIsNewGroupPressed(true)}
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
                  text="Hs_NewGroup"
                  style={{
                    color: "#0B9FD4",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                ></Font>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsExistingGroupPressed(true)}
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
                  text="Hs_ExistingGroup"
                  style={{ color: "#274273", fontWeight: 500, fontSize: 16 }}
                ></Font>
              </TouchableOpacity>
            </>
          )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <DeleteMessageModal
        visible={isDeleted}
        onClose={() => setIsDeleted(false)}
      ></DeleteMessageModal>
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
            // title="Hs_Group"
            title={tab == "Group" ? "Hs_Cancel" : "Hs_Group"}
            style={{ padding: 10 }}
            onPress={() => {
              if (tab == "Group") {
                setIsSelectAll(false);
                setSelectedReportIds([]);
                setSelectedGroupIdsToDelete([]);
              } else {
                if (selectedReportIds.length > 0) {
                  setIsGroupModalVisible(true);
                }
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
              }
              if (selectedGroupIdsToDelete.length > 0) {
                toggleModal();
              }
            }}
          ></Button>
        </View>
      )}
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
      {/* { isUpgradeModalVisible && <UpgradeModal
        visible={true}
        onClose={() => {
          setIsUpgradeModalVisible(false);
          navigation.goBack();
        }}
        navigationTo={() => {setIsUpgradeModalVisible(false); navigation.navigate("Purchase")}}
      ></UpgradeModal>} */}
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

export default HistoryScreen;
