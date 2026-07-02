import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from 'react';
import Font from "../components/CustomisedFont";
import ProgressBar from "../components/ProgressBar";
import { icons } from "../components/images";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import Button from "../components/Button";
import {
  calculateHealthAge,
  calculatePotentialHealthAge,
  readExcelFile,
} from "../components/utils/readExcel";
// import RNBlobUtil from 'react-native-blob-util';
// import htmlToDocx from 'html-to-docx';
// import RNFS from "react-native-fs";
// import Share from "react-native-share";
import RNFS from "react-native-fs";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from "../components/checkbox";
import CustomInput from "../components/CustomInput";
import { addReport } from "../components/utils/reportService";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../context/subScriptionContext";
import { isValidEmail, isValidName } from "../components/utils/validation";
import { useAuth } from "../context/authContext";
import {
  FREE_DAILY_TASK_LIMIT,
  getDailyLimitStatus,
} from "../components/utils/usageLimit";


type InterestScreenProps = DrawerScreenProps<DrawerParamList, "InterestScreen">;

const InterestTopics = [
  {
    id: 1,
    icon: icons.weightManagement,
    description: "Is_WeightManagement",
  },
  {
    id: 2,
    icon: icons.fitness,
    description: "Is_FitAndExercise",
  },
  {
    id: 3,
    icon: icons.noSmoking,
    description: "Is_StopSmoking",
  },
  {
    id: 4,
    icon: icons.healthyCooking,
    description: "Is_HealthyCooking",
  },
  {
    id: 5,
    icon: icons.stressReduction,
    description: "Is_StressReduction",
  },
  {
    id: 6,
    icon: icons.heartDiseasePrevent,
    description: "Is_PreventHeartDisease",
  },
  {
    id: 7,
    icon: icons.depressionRecovery,
    description: "Is_DepressionRecovery",
  },
  {
    id: 8,
    icon: icons.diabetes,
    description: "Is_ReversingDiabetes",
  },
  {
    id: 9,
    icon: icons.naturalRemedies,
    description: "Is_NaturalRemedies",
  },
  {
    id: 10,
    icon: icons.spiritual,
    description: "Is_SpiritualHealth",
  },
  {
    id: 11,
    icon: icons.ImproveMental,
    description: "Is_ImprovingMentalPerformance",
  },
  {
    id: 12,
    icon: icons.other,
    description: "Is_Other",
  },
];
const InterestScreen: React.FC<InterestScreenProps> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWebDesktop = width >= 760;
  const { isSubscribed } = useSubscription();
  const { user } = useAuth();
  const [otherText, setOtherText] = React.useState("");
  const [interestError, setInterestError] = React.useState<string | null>(null);

  const [interestList, setInterestList] = React.useState<
    { Id: number; interestTopic: string }[]
  >([]); // Store selected interest IDs

  const toggleInterest = (id: number, interestTopic: string) => {
    setInterestError(null);
    setInterestList(
      (prevList) =>
        prevList.some((item) => item.Id === id)
          ? prevList.filter((item) => item.Id !== id) // Remove if already selected
          : [...prevList, { Id: id, interestTopic }] // Add if not selected
    );
  };

  const [questionsText, setQuestionsText] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [value, setValue] = React.useState({
    Name: "",
    Email: "",
    Phone: "",
    Zip: "",
    Address: "",
  });
  const [formError, setFormError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fallbackName =
      route?.params?.reportData?.name?.trim?.() ||
      user?.name?.trim?.() ||
      "";
    const fallbackEmail = user?.email?.trim?.() || "";

    setValue((prev) => ({
      ...prev,
      Name: prev.Name || fallbackName,
      Email: prev.Email || fallbackEmail,
    }));
  }, [route?.params?.reportData?.name, user?.email, user?.name]);
  
  // React.useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate("healthAgeTest"); // Ensure back goes to healthAgeTest
  //     return true; // Prevent default behavior
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove(); // Cleanup
  // }, [navigation]);




  const [healthAge, setHealthAge] = React.useState<any>();
  const [potentialAge, setPotentialAge] = React.useState<any>();
  const totalScore = Array.isArray(route.params.answers)
    ? route.params.answers.reduce((sum, answer) => sum + (answer.points || 0), 0)
    : 0; // Default to 0 if answers is undefined or not an array
  console.log(totalScore, "total Score");

  console.log(route?.params?.reportData.height,"height");
  console.log(route?.params?.reportData.weight,"weight");
  
  const saveReport = async (healthAge: any,potentialAge:any) => {
    try {
      const reportId = await addReport(
        "user", // Provide a valid user ID
        route?.params?.reportData?.name,
        "Email",
        "Report",
        route.params?.answers,
        {
          name: route?.params?.reportData.name ?? "Unknown",
          height: route?.params?.reportData.height ?? "0",
          age: route?.params?.reportData.age ?? "0",
          gender: route?.params?.reportData.gender ?? "Unknown",
          weight: route?.params?.reportData.weight ?? "0",
          bloodGlucose: route?.params?.reportData.bloodGlucose ?? "0",
          bloodPressure: route?.params?.reportData.bloodPressure ?? "0",
          fasting: route?.params?.reportData.fasting ?? false, // Assuming boolean
          bloodPressureSys:route?.params?.reportData?.bloodPressureSys,
          bloodPressureDia:route?.params?.reportData?.bloodPressureDia,
          bloodGlucose_mg:route?.params?.reportData?.bloodGlucose_mg,
          bloodGlucose_mmol:route?.params?.reportData?.bloodGlucose_mmol,
          blood_glucose_mmol_points : route?.params?.reportData?.blood_glucose_mmol_points,
          selectedGlucoseUnit:route?.params?.reportData?.selectedGlucoseUnit,
          healthAge: healthAge,
          potentialAge: potentialAge,
          selectedWeightUnit: route?.params?.reportData?.selectedWeightUnit,
          selectedHeightUnit:route?.params?.reportData?.selectedHeightUnit,
          heightValue:route.params.reportData.heightValue,
          weightValue:route.params.reportData.weightValue,
        }
      );
      console.log("Report added with ID:", reportId);
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  const handleCalculate = async () => {
    const limitStatus = await getDailyLimitStatus(Boolean(isSubscribed));
    if (!limitStatus.allowed) {
      Alert.alert(
        `${t("dailyLimit")} : ${limitStatus.used}/${FREE_DAILY_TASK_LIMIT}`,
        t("JoinPro"),
        [
          { text: t("Hs_Cancel"), style: "cancel" },
          {
            text: t("purchase"),
            onPress: () => navigation.navigate("Purchase"),
          },
        ]
      );
      return;
    }

    const data = await readExcelFile();
    if (data) {
      const calculatedHealthAge = calculateHealthAge(
        data,
        parseInt(route?.params?.reportData?.age),
        totalScore == 0.5 ? 0 : totalScore
      );
      const calculatePotentialAge = calculatePotentialHealthAge(
        data,
        parseInt(route?.params?.reportData?.age),
        12
      );
      console.log(calculatedHealthAge, "health age");
      console.log(calculatePotentialAge, "potential age");
      saveReport(calculatedHealthAge,calculatePotentialAge);
      setHealthAge(calculatedHealthAge);
      setPotentialAge(calculatePotentialAge);
      setValue({
        Name: "",
        Email: "",
        Phone: "",
        Zip: "",
        Address: "",
      })
      setStep(1);
      setInterestList([]);
      navigation.navigate("ReportScreen", {
        age: route?.params?.reportData?.age,
        answers: route.params?.answers,
        reportData: {
          name: route?.params?.reportData.name,
          height: route?.params?.reportData.height,
          age: route?.params?.reportData.age,
          gender: route?.params?.reportData.gender,
          weight: route?.params?.reportData.weight,
          bloodGlucose: route?.params?.reportData.bloodGlucose,
          bloodPressure: route?.params?.reportData.bloodPressure,
          fasting: route?.params?.reportData.fasting,
          bloodPressureSys:route?.params?.reportData?.bloodPressureSys,
          bloodPressureDia:route?.params?.reportData?.bloodPressureDia,
          bloodGlucose_mg:route?.params?.reportData?.bloodGlucose_mg,
          bloodGlucose_mmol:route?.params?.reportData?.bloodGlucose_mmol,
          blood_glucose_mmol_points : route?.params?.reportData?.blood_glucose_mmol_points,
          selectedGlucoseUnit:route?.params?.reportData?.selectedGlucoseUnit,
          healthAge:calculatedHealthAge,
          potentialAge:calculatePotentialAge,
          selectedHeightUnit: route?.params?.reportData?.selectedHeightUnit,
          selectedWeightUnit: route?.params?.reportData?.selectedWeightUnit,
          heightValue:route.params.reportData.heightValue,
          weightValue:route.params.reportData.weightValue,
        },
      });
    
    }
  };



  const handleNext = () => {
    if (step == 1) {
      if (interestList.length == 0) {
        setInterestError("Please select at least one interest.");
        return;
      }
      setInterestError(null);
      setFormError(null);
      setStep(2);
    } else {
      const name = value.Name.trim();
      const email = value.Email.trim().toLowerCase();
      if (!name || !email) {
        setFormError("Name and email are required.");
        return;
      }
      if (!isValidName(name)) {
        setFormError("Name must start with a letter and cannot be numbers only.");
        return;
      }
      if (!isValidEmail(email)) {
        setFormError("Please enter a valid email address.");
        return;
      }
      setFormError(null);
      handleCalculate();
    
    }
  };

    const goBackToPreviousScreen = React.useCallback(() => {
        if (step > 1) {
          setStep(1);
          return;
        }

        navigation.navigate("QuestionsScreen", {
          name: route?.params?.reportData?.name,
          height: route?.params?.reportData?.height,
          age: route?.params?.reportData?.age,
          gender: route?.params?.reportData?.gender,
          weight: route?.params?.reportData?.weight,
          bloodGlucose: route?.params?.reportData?.bloodGlucose,
          bloodPressure: route?.params?.reportData?.bloodPressure,
          fasting: route?.params?.reportData?.fasting,
          bloodPressureSys: route?.params?.reportData?.bloodPressureSys,
          bloodPressureDia: route?.params?.reportData?.bloodPressureDia,
          bloodGlucose_mg: route?.params?.reportData?.bloodGlucose_mg,
          bloodGlucose_mmol: route?.params?.reportData?.bloodGlucose_mmol,
          selectedGlucoseUnit: route?.params?.reportData?.selectedGlucoseUnit,
          blood_glucose_mmol_points: route?.params?.reportData?.blood_glucose_mmol_points,
          selectedWeightUnit: route?.params?.reportData?.selectedWeightUnit,
          selectedHeightUnit: route?.params?.reportData?.selectedHeightUnit,
          heightValue: route?.params?.reportData?.heightValue,
          weightValue: route?.params?.reportData?.weightValue,
        } as any);
      }, [navigation, route?.params?.reportData, step]);
    
      React.useEffect(() => {
        const backAction = () => {
          goBackToPreviousScreen();
          return true; // Prevent default back action
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [goBackToPreviousScreen]);
  const handleBack = () => {
    goBackToPreviousScreen();
  };

  console.log(interestList, "interestList");
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <View style={[styles.container, isWebDesktop ? styles.desktopContainer : null]}>
      <View style={{ marginVertical: 20 }}>
        <Font
          text="Is_Interests"
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        ></Font>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      >
        {step == 1 ? (
          <>
            <Font
              text="Is_TellYourInterest"
              style={{ color: "#262F40", fontSize: 14 }}
            ></Font>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                marginTop: 20,
              }}
            >
              {InterestTopics.map((val, index) => (
                <TouchableOpacity
                onPress={()=> toggleInterest(val.id, val.description)}
                key={val.id}
                  style={{
                    width: 155,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#F2F5F9",
                    paddingVertical: 10,
                    borderRadius: 20,
                    gap: 4,
                  }}
                >
                  <Image
                    source={val.icon}
                    style={{ width: 40, height: 40 }}
                    resizeMode="center"
                  ></Image>
                  <Font
                    text={val.description}
                    style={{
                      fontSize: 13,
                      color: "#262F40",
                      textAlign: "center",
                    }}
                  ></Font>
                  <View style={{ position: "absolute", top: 10, right: 10 }}>
                    <CheckBox
                      value={interestList.some((item) => item.Id === val.id)}
                      setValue={() => toggleInterest(val.id, val.description)}
                    ></CheckBox>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={{ gap: 10 }}>
            <CustomInput
              title="Is_Name"
              placeHolder={t("enterName")}
              value={value.Name}
              onChangeText={(val) => {
                setValue((prev) => ({ ...prev, Name: val }));
                if (formError) setFormError(null);
              }}
            ></CustomInput>
            <CustomInput
              title="Is_Email"
              placeHolder={"Enter Email"}
              value={value.Email}
              onChangeText={(val) => {
                setValue((prev) => ({ ...prev, Email: val }));
                if (formError) setFormError(null);
              }}
            ></CustomInput>
            <CustomInput
              title="Is_Address"
              placeHolder={"Enter Address"}
              value={value.Address}
              onChangeText={(val) =>
                setValue((prev) => ({ ...prev, Address: val }))
              }
            ></CustomInput>
            <CustomInput
            type="phone-pad"
              title="Is_Phone"
              placeHolder={"Enter Phone"}
              value={value.Phone}
              onChangeText={(val) =>
                setValue((prev) => ({ ...prev, Phone: val }))
              }
            ></CustomInput>
            <CustomInput
              title="Is_Zip"
              placeHolder={"Enter Zip"}
              value={value.Zip}
              onChangeText={(val) =>
                setValue((prev) => ({ ...prev, Zip: val }))
              }
            ></CustomInput>
          </View>
        )}
      </ScrollView>
      {step == 2 && formError ? (
        <Text style={styles.formErrorText}>{formError}</Text>
      ) : null}
      {step == 1 && interestError ? (
        <Text style={styles.formErrorText}>{interestError}</Text>
      ) : null}
      {step == 1 && interestList.some((item) => item.Id === 12) && (
        <CustomInput
          placeHolder="Other"
          style={{ marginBottom: 10 }}
          value={otherText}
          onChangeText={(val) => setOtherText(val)}
        ></CustomInput>
      )}

      <View
        style={styles.navRow}
      >
        <TouchableOpacity
          onPress={() => {
            handleBack();
          }}
          style={styles.navBtn}
        >
          <Image source={icons.Arrow} style={{ width: 10, height: 16  }}></Image>
          <Font
            style={styles.navText}
            text="back"
          ></Font>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNext();
          }}
          style={styles.navBtn}
        >
          <Font
            style={styles.navText}
            text={step == 2 ? "Is_ShowReport" : "next"}
          ></Font>
          <Image
            source={icons.Arrow}
            style={{width: 10, height: 16 , transform: [{ scaleX: -1 }] }}
          ></Image>
        </TouchableOpacity>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  desktopContainer: {
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  scrollViewContainer: { paddingBottom: 30 },
  navRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingBottom: 8,
  },
  navBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    minWidth: 112,
    height: 40,
    borderWidth: 1,
    borderColor: "#0C9FD5",
    borderRadius: 999,
    paddingHorizontal: 16,
  },
  navText: {
    fontWeight: "500",
    color: "#0C9FD5",
    fontSize: 15,
  },
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
  formErrorText: {
    color: "#B42318",
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
  },
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
