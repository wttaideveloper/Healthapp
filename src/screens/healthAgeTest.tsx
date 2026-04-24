import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Slider from "../components/slider";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import CustomInput from "../components/CustomInput";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import CheckBox from "../components/checkbox";
import Switch from "../components/Switch";
import {
  calculateHealthAge,
  readExcelFile,
} from "../components/utils/readExcel";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";

type HealthAgeTestProps = DrawerScreenProps<DrawerParamList, "healthAgeTest">;

const HealthAgeTest: React.FC<HealthAgeTestProps> = ({ navigation, route }) => {
  const MIN_AGE = 16;
  const MAX_AGE = 80;
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWebDesktop = width >= 760;
  const fullPickerWidth = isWebDesktop ? 560 : Dimensions.get("window").width;
  const confirmExit = () => {
    Alert.alert(
      t("leavePage"),
      t("leavePageConfirmation"),
      [
        { text: t("Hs_Cancel"), style: "cancel" },
        {
          text: t("home"),
          onPress: () => navigation.navigate("Main"), // Or replace('Main')
        },
      ],
      { cancelable: true }
    );
  };

  React.useEffect(() => {
    const backAction = () => {
      confirmExit();
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [age, setAge] = React.useState("21");
  const [habitScore, setHabitScore] = React.useState("8");
  const [healthAge, setHealthAge] = React.useState<number | null>(null);

  const [step, setStep] = React.useState(1);
  const [value, setValue] = React.useState({
    name: "",
    age: "",
    gender: "",
    height_Ft: "",
    height_In: "",
    height_Cm: "",
    weight_Kg: "",
    weight_Lb: "",
    weight_Lb_points: "",
    weight_Kg_points: "",
    waist_Circumference_In: "32",
    waist_Circumference_In_points: "",
    waist_Circumference_Cm: "",
    waist_Circumference_Cm_points: "",
    blood_pressure_sys: "",
    blood_pressure_dia: "",
    blood_glucose_mg: "",
    blood_glucose_mmol: "",
    blood_glucose_mmol_points: "",
  });
  const [popup, setPopup] = React.useState(true);
  const [stepError, setStepError] = React.useState<string | null>(null);
  const [selectedAge, setSelectedAge] = React.useState("");
  const [selectedHeightUnit, setSelectedHeightUnit] = React.useState("ft in");
  const [selectedWeightUnit, setSelectedWeightUnit] = React.useState("Lb");
  const [selectedWaistUnit, setSelectedWaistUnit] = React.useState("In");
  const [selectedGlucoseUnit, setSelectedGlucoseUnit] = React.useState("mg/dL");
  const [switchValue, setSwitchValue] = React.useState("fasting");
  const [pickerRefreshKey, setPickerRefreshKey] = React.useState(0);
  const restoredFromQuestionsRef = React.useRef(false);

  const refreshPickersFromInput = () => {
    setPickerRefreshKey((prev) => prev + 1);
  };
  const refreshPickerIfValid = (nextValue: string, options: string[]) => {
    if (options.includes(nextValue)) {
      refreshPickersFromInput();
    }
  };

  React.useEffect(() => {
    const resumePayload = route.params;
    if (
      restoredFromQuestionsRef.current ||
      !resumePayload?.resumeFromQuestions ||
      !resumePayload?.prefill
    ) {
      return;
    }

    const prefill = resumePayload.prefill;
    const isImperialHeight = prefill.selectedHeightUnit === "ft in";
    const isImperialWeight = prefill.selectedWeightUnit === "Lb";
    const [heightFt = "", heightIn = ""] = isImperialHeight
      ? (prefill.heightValue || "").split(".")
      : ["", ""];

    setValue((prev) => ({
      ...prev,
      name: prefill.name ?? prev.name,
      age: prefill.age ?? prev.age,
      gender: prefill.gender ?? prev.gender,
      height_Ft: isImperialHeight ? heightFt : "",
      height_In: isImperialHeight ? heightIn : "",
      height_Cm: !isImperialHeight ? prefill.heightValue ?? "" : "",
      weight_Lb: isImperialWeight ? prefill.weightValue ?? "" : "",
      weight_Kg: !isImperialWeight ? prefill.weightValue ?? "" : "",
      blood_pressure_sys: prefill.bloodPressureSys ?? prev.blood_pressure_sys,
      blood_pressure_dia: prefill.bloodPressureDia ?? prev.blood_pressure_dia,
      blood_glucose_mg: prefill.bloodGlucose_mg ?? prev.blood_glucose_mg,
      blood_glucose_mmol:
        prefill.bloodGlucose_mmol ?? prev.blood_glucose_mmol,
      blood_glucose_mmol_points:
        prefill.blood_glucose_mmol_points ?? prev.blood_glucose_mmol_points,
    }));

    setSelectedAge(prefill.age ?? "");
    if (prefill.selectedHeightUnit) setSelectedHeightUnit(prefill.selectedHeightUnit);
    if (prefill.selectedWeightUnit) setSelectedWeightUnit(prefill.selectedWeightUnit);
    if (prefill.selectedGlucoseUnit) setSelectedGlucoseUnit(prefill.selectedGlucoseUnit);
    setSwitchValue(prefill.fasting === false ? "nonFasting" : "fasting");
    setPopup(false);
    setStepError(null);
    setStep(resumePayload.resumeStep ?? 8);
    restoredFromQuestionsRef.current = true;
    navigation.setParams({
      resumeFromQuestions: false,
      resumeStep: undefined,
      prefill: undefined,
    });
  }, [route.params]);
  // const [selected, setSelectedWaistUnit] = React.useState("In");

  const ageOptions = Array.from({ length: 65 }, (_, i) => (i + 16).toString());
  const heightOptions = Array.from({ length: 8 }, (_, i) => i.toString());
  const heightOptionsInCm = Array.from({ length: 110 }, (_, i) =>
    (i + 120).toString()
  );
  const heightOptionsInInches = Array.from({ length: 12 }, (_, i) =>
    i.toString()
  );
  const weightOptionsInLb = Array.from({ length: 230 }, (_, i) =>
    (i + 90).toString()
  );
  // const weightOptionsInLbPoints = Array.from({ length: 11 }, (_, i) =>
  //   i.toString()
  // );
  const weightOptionsInKg = Array.from({ length: 150 }, (_, i) =>
    (i + 40).toString()
  );
  // const weightOptionsInKgbPoints = Array.from({ length: 11 }, (_, i) =>
  //   i.toString()
  // );
  const waistOptionsIn = Array.from({ length: 60 }, (_, i) => i.toString());
  const waistOptionsInPoints = Array.from({ length: 11 }, (_, i) =>
    i.toString()
  );
  const waistOptionsCm = Array.from({ length: 300 }, (_, i) => i.toString());
  const waistOptionsCmPoints = Array.from({ length: 11 }, (_, i) =>
    i.toString()
  );
  const bloodPressureOptionsSystolic = Array.from({ length: 90 }, (_, i) =>
    (i + 70).toString()
  );
  const bloodPressureOptionsDiastolic = Array.from({ length: 90 }, (_, i) =>
    (i + 50).toString()
  );
  const bloodGlucoseMgOptions = Array.from({ length: 150 }, (_, i) =>
    (i + 50).toString()
  );
  const bloodGlucoseMmolOptions = Array.from({ length: 150 }, (_, i) =>
    (i + 50).toString()
  );
  const bloodGlucoseMmolPointsOptions = Array.from({ length: 10 }, (_, i) =>
    i.toString()
  );
  const questions =
    step == 1
      ? "whatIsYourName"
      : step == 2
        ? "whatIsYourAge"
        : step == 3
          ? "whatIsYourGender"
          : step == 4
            ? "whatIsYourHeight"
            : step == 5
              ? "whatIsYourWeight"
              : step == 6
                ? "whatIsYourWaistCircumference"
                : step == 7
                  ? "whatIsYourBloodPressure"
                  : "whatIsYourBloodGlucose";

  const validateAgeValue = (rawAge: string): string | null => {
    const trimmed = rawAge.trim();
    if (!trimmed) return "Age is required.";
    if (!/^\d{1,2}$/.test(trimmed)) return `Age must be between ${MIN_AGE} and ${MAX_AGE}.`;
    const numericAge = Number(trimmed);
    if (Number.isNaN(numericAge) || numericAge < MIN_AGE || numericAge > MAX_AGE) {
      return `Age must be between ${MIN_AGE} and ${MAX_AGE}.`;
    }
    return null;
  };

  const validateStep = (targetStep: number): string | null => {
    if (targetStep === 1) {
      if (!value.name.trim()) return "Name is required.";
      return null;
    }

    if (targetStep === 2) {
      return validateAgeValue(value.age);
    }

    if (targetStep === 3) {
      if (!value.gender.trim()) return "Gender is required.";
      return null;
    }

    if (targetStep === 4) {
      if (selectedHeightUnit === "cm") {
        if (!value.height_Cm.trim()) return "Height is required.";
      } else {
        if (!value.height_Ft.trim() || !value.height_In.trim()) {
          return "Height (ft/in) is required.";
        }
      }
      return null;
    }

    if (targetStep === 5) {
      if (selectedWeightUnit === "Lb") {
        if (!value.weight_Lb.trim()) return "Weight is required.";
      } else {
        if (!value.weight_Kg.trim()) return "Weight is required.";
      }
      return null;
    }

    if (targetStep === 6) {
      if (selectedWaistUnit === "In") {
        if (!value.waist_Circumference_In.trim()) return "Waist circumference is required.";
      } else {
        if (!value.waist_Circumference_Cm.trim()) return "Waist circumference is required.";
      }
      return null;
    }

    if (targetStep === 7) {
      if (!value.blood_pressure_sys.trim() || !value.blood_pressure_dia.trim()) {
        return "Blood pressure values are required.";
      }
      return null;
    }

    if (targetStep === 8) {
      if (selectedGlucoseUnit === "mg/dL") {
        if (!value.blood_glucose_mg.trim()) return "Blood glucose is required.";
      } else {
        if (!value.blood_glucose_mmol.trim() || !value.blood_glucose_mmol_points.trim()) {
          return "Blood glucose is required.";
        }
      }
      return null;
    }

    return null;
  };

  const showValidationError = (message: string) => {
    setStepError(message);
    Alert.alert("Validation", message, [{ text: t("Fs_Close") }]);
  };

  const renderItem = () => {
    if (step == 1) {
      return (
        <>
          <CustomInput
            title="whatIsYourName"
            placeHolder={t("enterName")}
            value={value.name}
            onChangeText={(val) => {
              setValue((prev) => ({ ...prev, name: val }));
              if (stepError) setStepError(null);
            }}
          ></CustomInput>
        </>
      );
    } else if (step == 2) {
      return (
        <>
          <CustomInput
            title="whatIsYourAge"
            placeHolder={t("age")}
            value={value.age}
            type={"numeric"}
            onChangeText={(val) => {
              const normalized = val.replace(/[^0-9]/g, "").slice(0, 2);
              setValue((prev) => ({ ...prev, age: normalized }));
              setSelectedAge(normalized);
              if (ageOptions.includes(normalized)) {
                refreshPickersFromInput();
              }
              if (stepError) setStepError(null);
            }}
          ></CustomInput>
          <WheelPickerExpo
            key={`age-picker-${pickerRefreshKey}`}
            width={"100%"} // Use device width
            height={300}
            initialSelectedIndex={
              value.age && ageOptions.includes(value.age)
                ? ageOptions.indexOf(value.age)
                : ageOptions.indexOf("25")
            }
            items={ageOptions.map((age) => ({ label: age, value: age }))}
            onChange={({ item }) => {
              setSelectedAge(item.label);
              setValue((prev) => ({ ...prev, age: item.label }));
              if (stepError) setStepError(null);
            }}
            renderItem={(props) => {
              return (
                <View
                  style={{
                    backgroundColor:
                      props.label == value.age ? "#f4f6f9" : "#ffffff",
                    width: "100%",
                    borderRadius: 99999,
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: props.fontSize,
                        color: "#284374",
                        textAlign: props.textAlign,
                      },
                    ]}
                  >
                    {props.label}
                  </Text>
                </View>
              );
            }}
          />
        </>
      );
    } else if (step == 3) {
      return (
        <>
          {/* <CustomInput
            title={questions}
            placeHolder="Enter Name"
            value={value}
            onChangeText={(val) => setValue(val)}
          ></CustomInput> */}
          <Font
            style={{ fontSize: 18, fontWeight: "400", marginBottom: 60 }}
            text={questions}
          ></Font>
          <View
            style={{
              // backgroundColor:"red",

              height: 300,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setValue((prev) => ({ ...prev, gender: "male" }));
                if (stepError) setStepError(null);
              }}
              style={{
                borderWidth: 1,
                borderColor: value.gender == "male" ? "#284374" : "#F2F5F9",
                borderRadius: 14,
                width: 154,
                height: 136,
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Image
                source={icons.male}
                style={{ width: 48, height: 48 }}
              ></Image>
              <Font text="male" style={{ fontWeight: "500" }}></Font>
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                <CheckBox
                  value={value.gender == "male" ? true : false}
                ></CheckBox>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setValue((prev) => ({ ...prev, gender: "female" }));
                if (stepError) setStepError(null);
              }}
              style={{
                borderWidth: 1,
                borderColor: value.gender == "female" ? "#284374" : "#F2F5F9",
                borderRadius: 14,
                width: 154,
                height: 136,
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Image
                source={icons.female}
                style={{ width: 48, height: 48 }}
              ></Image>
              <Font text="female" style={{ fontWeight: "500" }}></Font>
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                <CheckBox
                  value={value.gender == "female" ? true : false}
                ></CheckBox>
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (step == 4) {
      return (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
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
                  text={questions}
                ></Font>
                {selectedHeightUnit == "cm" ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#dfe9f0",
                      borderRadius: 99999,
                    }}
                  >
                    <TextInput
                      value={value.height_Cm}
                      keyboardType="numeric"
                      placeholder={"cm"}
                      placeholderTextColor={"#b2b2b2"}
                      onChangeText={(val) => {
                        setValue((prev) => ({ ...prev, height_Cm: val }));
                        refreshPickerIfValid(val, heightOptionsInCm);
                      }}
                      style={[{ padding: 10 }]}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.height_Ft !== "" ? value.height_Ft : ""}
                        placeholder={"Ft"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        maxLength={1}
                        onChangeText={(val) => {
                          if (/^\d?$/.test(val)) {
                            setValue((prev) => ({ ...prev, height_Ft: val }));
                            refreshPickerIfValid(val, heightOptions);
                          }
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.height_In !== "" ? value.height_In : ""}
                        placeholder={"In"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        maxLength={2} // Allow up to two digits
                        onChangeText={(val) => {
                          if (/^\d{0,2}$/.test(val)) {
                            setValue((prev) => ({ ...prev, height_In: val }));
                            refreshPickerIfValid(val, heightOptionsInInches);
                          }
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedHeightUnit == "cm" ? (
              <>
                <WheelPickerExpo
                  // Key must not depend on value, otherwise the picker remounts on every change (web resets to 0).
                  key={`heightCm-picker-${selectedHeightUnit}-${pickerRefreshKey}`}
                  width={fullPickerWidth}
                  height={300}
                  initialSelectedIndex={(() => {
                    const idx =
                      value.height_Cm && heightOptionsInCm.includes(value.height_Cm)
                        ? heightOptionsInCm.indexOf(value.height_Cm)
                        : heightOptionsInCm.indexOf("170");
                    return idx >= 0 ? idx : 0;
                  })()}
                  // initialSelectedIndex={heightOptionsInCm.indexOf("170")}
                  items={heightOptionsInCm.map((age) => ({
                    label: age,
                    value: age,
                  }))}
                  onChange={({ item }) =>
                    setValue((prev) => ({ ...prev, height_Cm: item.label }))
                  }
                  renderItem={(props) => {
                    return (
                      <View
                        style={{
                          backgroundColor:
                            props.label == value.height_Cm
                              ? "#f4f6f9"
                              : "#ffffff",
                          width: "100%",
                          borderRadius: 99999,
                        }}
                      >
                        <Font
                          text={props.label}
                          style={{
                            fontSize: props.fontSize,
                            color: "#284374",
                            textAlign: props.textAlign,
                          }}
                        ></Font>
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <>
                <WheelPickerExpo
                  // Key must not depend on value, otherwise the picker remounts on every change (web resets to 0).
                  key={`heightFt-picker-${selectedHeightUnit}-${pickerRefreshKey}`}
                  // width={Dimensions.get("window").width} // Use device width
                  // height={300}
                  // initialSelectedIndex={
                  //   selectedWeightUnit == "Lb"
                  //     ? weightOptionsInLb.indexOf("120")
                  //     : weightOptionsInKg.indexOf("54")
                  // }
                  initialSelectedIndex={(() => {
                    const idx =
                      value.height_Ft && heightOptions.includes(value.height_Ft)
                        ? heightOptions.indexOf(value.height_Ft)
                        : heightOptions.indexOf("5");
                    return idx >= 0 ? idx : 0;
                  })()}
                  width={"50%"}
                  height={300}
                  // initialSelectedIndex={5} // Default to age 18 (index 17)
                  items={heightOptions.map((age) => ({
                    label: age,
                    value: age,
                  }))}
                  onChange={({ item }) =>
                    setValue((prev) => ({ ...prev, height_Ft: item.label }))
                  }
                  renderItem={(props) => {
                    return (
                      <View
                        style={{
                          backgroundColor:
                            props.label == value.height_Ft
                              ? "#f4f6f9"
                              : "#ffffff",
                          width: "100%",
                          borderRadius: 99999,
                        }}
                      >
                        <Font
                          text={props.label + "' "}
                          style={{
                            fontSize: props.fontSize,
                            color: "#284374",
                            textAlign: props.textAlign,
                          }}
                        ></Font>
                      </View>
                    );
                  }}
                />
                <WheelPickerExpo
                  // Key must not depend on value, otherwise the picker remounts on every change (web resets to 0).
                  key={`heightIn-picker-${selectedHeightUnit}-${pickerRefreshKey}`}
                  width={"50%"}
                  height={300}
                  // initialSelectedIndex={6} // Default to age 18 (index 17)
                  initialSelectedIndex={(() => {
                    const idx =
                      value.height_In && heightOptionsInInches.includes(value.height_In)
                        ? heightOptionsInInches.indexOf(value.height_In)
                        : heightOptionsInInches.indexOf("5");
                    return idx >= 0 ? idx : 0;
                  })()}
                  items={heightOptionsInInches.map((age) => ({
                    label: age,
                    value: age,
                  }))}
                  onChange={({ item }) =>
                    setValue((prev) => ({ ...prev, height_In: item.label }))
                  }
                  renderItem={(props) => {
                    return (
                      <View
                        style={{
                          backgroundColor:
                            props.label == value.height_In
                              ? "#f4f6f9"
                              : "#ffffff",
                          width: "100%",
                          borderRadius: 99999,
                        }}
                      >
                        <Font
                          text={props.label + `"`}
                          fontFamily="poppins"
                          style={{
                            fontSize: props.fontSize,
                            color: "#284374",
                            textAlign: props.textAlign,
                          }}
                        ></Font>
                      </View>
                    );
                  }}
                />
              </>
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Switch
              title1="ft in"
              title2="cm"
              style={{ width: "40%" }}
              setValue={(unit: string) => {
                setSelectedHeightUnit(unit);
                setValue((prev) => {
                  if (unit === "cm") {
                    return {
                      ...prev,
                      height_Cm: prev.height_Cm || "170",
                      height_Ft: "",
                      height_In: "",
                    };
                  }
                  return {
                    ...prev,
                    height_Ft: prev.height_Ft || "5",
                    height_In: prev.height_In || "5",
                    height_Cm: "",
                  };
                });
              }}
              value={selectedHeightUnit}
            ></Switch>
          </View>
        </>
      );
    } else if (step == 5) {
      return (
        <>
          {/* weight  */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
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
                  text={questions}
                ></Font>
                {selectedWeightUnit == "Lb" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.weight_Lb}
                        placeholder={"lb"}
                        keyboardType="numeric"
                        placeholderTextColor={"#b2b2b2"}
                        onChangeText={(val) => {
                          setValue((prev) => ({ ...prev, weight_Lb: val }));
                          refreshPickerIfValid(val, weightOptionsInLb);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                    {/* <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.weight_Lb_points}
                        placeholder={"lb point"}
                        placeholderTextColor={"#b2b2b2"}
                        onChangeText={(val) =>
                          setValue((prev) => ({
                            ...prev,
                            weight_Lb_points: val,
                          }))
                        } // Now correctly typed
                        style={[{ padding: 10 }]}
                      />
                    </View> */}
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.weight_Kg}
                        placeholder={"kg"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        // maxLength={1}
                        onChangeText={(val) => {
                          setValue((prev) => ({ ...prev, weight_Kg: val }));
                          refreshPickerIfValid(val, weightOptionsInKg);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                    {/* <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.weight_Kg_points}
                        placeholder={"g"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        maxLength={1} // Restricts input to a single digit
                        onChangeText={(val) => {
                          // Allows only a single digit (0-9)
                          setValue((prev) => ({
                            ...prev,
                            weight_Kg_points: val,
                          }));
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View> */}
                  </View>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {/* {console.log(
                "Height options:",
                weightOptionsInLb,
                weightOptionsInKg
              )}
              {console.log(
                "Index of weight in lb and kg:",
                weightOptionsInLb.indexOf("120"),
                weightOptionsInKg.indexOf("54")
              )} */}
              <WheelPickerExpo
                key={`weight-picker-${selectedWeightUnit}-${pickerRefreshKey}`}
                width={fullPickerWidth}
                height={300}
                // initialSelectedIndex={
                //   selectedWeightUnit == "Lb"
                //     ? weightOptionsInLb.indexOf("120")
                //     : weightOptionsInKg.indexOf("54")
                // }
                initialSelectedIndex={
                  selectedWeightUnit == "Lb"
                    ? value.weight_Lb &&
                      weightOptionsInLb.includes(value.weight_Lb)
                      ? weightOptionsInLb.indexOf(value.weight_Lb)
                      : weightOptionsInLb.indexOf("120")
                    : value.weight_Kg &&
                      weightOptionsInKg.includes(value.weight_Kg)
                      ? weightOptionsInKg.indexOf(value.weight_Kg)
                      : weightOptionsInKg.indexOf("54")
                }
                items={
                  selectedWeightUnit == "Lb"
                    ? weightOptionsInLb.map((age) => ({
                      label: age,
                      value: age,
                    }))
                    : weightOptionsInKg.map((age) => ({
                      label: age,
                      value: age,
                    }))
                }
                onChange={({ item }) =>
                  selectedWeightUnit == "Lb"
                    ? setValue((prev) => ({ ...prev, weight_Lb: item.label }))
                    : setValue((prev) => ({ ...prev, weight_Kg: item.label }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label ==
                            (selectedWeightUnit == "Lb"
                              ? value.weight_Lb
                              : value.weight_Kg)
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              />

              {/* <WheelPickerExpo
                width={"50%"}
                height={300}
                // initialSelectedIndex={4} // Default to age 18 (index 17)
                items={
                  selectedWeightUnit == "Lb"
                    ? weightOptionsInLbPoints.map((age) => ({
                        label: age,
                        value: age,
                      }))
                    : weightOptionsInKgbPoints.map((age) => ({
                        label: age,
                        value: age,
                      }))
                }
                onChange={({ item }) =>
                  selectedWeightUnit == "Lb"
                    ? setValue((prev) => ({
                        ...prev,
                        weight_Lb_points: item.label,
                      }))
                    : setValue((prev) => ({
                        ...prev,
                        weight_Kg_points: item.label,
                      }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label ==
                          (selectedWeightUnit == "Lb"
                            ? value.weight_Lb_points
                            : value.weight_Kg_points)
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        fontFamily="poppins"
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              /> */}
            </>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Switch
              title1="Lb"
              title2="Kg"
              style={{ width: "40%" }}
              setValue={setSelectedWeightUnit}
              value={selectedWeightUnit}
            ></Switch>
          </View>
        </>
      );
    } else if (step == 6) {
      return (
        <>
          {/* waist circumference  */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
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
                  text={questions}
                ></Font>
                {selectedWaistUnit == "In" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.waist_Circumference_In}
                        placeholder={"In"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                          setValue((prev) => ({
                            ...prev,
                            waist_Circumference_In: val,
                          }));
                          refreshPickerIfValid(val, waistOptionsIn);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.waist_Circumference_Cm}
                        placeholder={"cm"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        // maxLength={1}
                        onChangeText={(val) => {
                          setValue((prev) => ({
                            ...prev,
                            waist_Circumference_Cm: val,
                          }));
                          refreshPickerIfValid(val, waistOptionsCm);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                    {/* <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.waist_Circumference_Cm_points}
                        placeholder={"point"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        maxLength={1} // Restricts input to a single digit
                        onChangeText={(val) => {
                          // Allows only a single digit (0-9)
                          setValue((prev) => ({
                            ...prev,
                            waist_Circumference_Cm_points: val,
                          }));
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View> */}
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* <CustomInput
            title={questions}
            placeHolder="Waist"
            value={
              selectedWaistUnit == "In"
                ? value.waist_Circumference_In +
                  (value.waist_Circumference_In ? ` . ` : "") +
                  value.waist_Circumference_In_points
                : value.waist_Circumference_Cm +
                  (value.waist_Circumference_Cm ? ` . ` : "") +
                  value.waist_Circumference_Cm_points
            }
            // onChangeText={(val) => setValue((prev) => ({ ...prev, name: val }))}
          ></CustomInput> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              <WheelPickerExpo
                key={`waist-picker-${selectedWaistUnit}-${pickerRefreshKey}`}
                width={fullPickerWidth}
                height={300}
                initialSelectedIndex={
                  selectedWaistUnit == "In"
                    ? value.waist_Circumference_In &&
                      waistOptionsIn.includes(value.waist_Circumference_In)
                      ? waistOptionsIn.indexOf(value.waist_Circumference_In)
                      : waistOptionsIn.indexOf("32")
                    : value.waist_Circumference_Cm &&
                      waistOptionsCm.includes(value.waist_Circumference_Cm)
                      ? waistOptionsCm.indexOf(value.waist_Circumference_Cm)
                      : waistOptionsCm.indexOf("81") // 32 inches ≈ 81 cm
                }
                items={
                  selectedWaistUnit == "In"
                    ? waistOptionsIn.map((age) => ({ label: age, value: age }))
                    : waistOptionsCm.map((age) => ({ label: age, value: age }))
                }
                onChange={({ item }) =>
                  selectedWaistUnit == "In"
                    ? setValue((prev) => ({
                      ...prev,
                      waist_Circumference_In: item.label,
                    }))
                    : setValue((prev) => ({
                      ...prev,
                      waist_Circumference_Cm: item.label,
                    }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label ==
                            (selectedWaistUnit == "In"
                              ? value.waist_Circumference_In
                              : value.waist_Circumference_Cm)
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              />
            </>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Switch
              title1="In"
              title2="cm"
              style={{ width: "40%" }}
              setValue={setSelectedWaistUnit}
              value={selectedWaistUnit}
            ></Switch>
          </View>
        </>
      );
    } else if (step == 7) {
      return (
        <>
          {/* blood pressure  */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
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
                  text={questions}
                ></Font>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#dfe9f0",
                      borderRadius: 99999,
                      flex: 1,
                    }}
                  >
                    <TextInput
                      value={value.blood_pressure_sys}
                      placeholder={"Sys"}
                      keyboardType="numeric"
                      placeholderTextColor={"#b2b2b2"}
                      onChangeText={(val) => {
                        setValue((prev) => ({
                          ...prev,
                          blood_pressure_sys: val,
                        }));
                        refreshPickerIfValid(val, bloodPressureOptionsSystolic);
                      }}
                      style={[{ padding: 10 }]}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#dfe9f0",
                      borderRadius: 99999,
                      flex: 1,
                    }}
                  >
                    <TextInput
                      value={value.blood_pressure_dia}
                      placeholder={"Dia"}
                      keyboardType="numeric"
                      placeholderTextColor={"#b2b2b2"}
                      onChangeText={(val) => {
                        setValue((prev) => ({
                          ...prev,
                          blood_pressure_dia: val,
                        }));
                        refreshPickerIfValid(val, bloodPressureOptionsDiastolic);
                      }}
                      style={[{ padding: 10 }]}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* <CustomInput
            title={questions}
            placeHolder="Blood pressure"
            value={
              value.blood_pressure_sys +
              (value.blood_pressure_sys ? ` / ` : "") +
              value.blood_pressure_dia
            }
            // onChangeText={(val) => setValue((prev) => ({ ...prev, name: val }))}
          ></CustomInput> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {/* {console.log(
                bloodPressureOptionsSystolic,
                bloodPressureOptionsSystolic.indexOf("120")
              )} */}
              {/* {console.log(bloodPressureOptionsDiastolic,bloodPressureOptionsDiastolic.indexOf("80"))} */}
              <WheelPickerExpo
                key={`bp-sys-picker-${pickerRefreshKey}`}
                width={"50%"}
                height={300}
                initialSelectedIndex={
                  value.blood_pressure_sys &&
                    bloodPressureOptionsSystolic.includes(value.blood_pressure_sys)
                    ? bloodPressureOptionsSystolic.indexOf(value.blood_pressure_sys)
                    : bloodPressureOptionsSystolic.indexOf("120")
                }
                items={bloodPressureOptionsSystolic.map((age) => ({
                  label: age,
                  value: age,
                }))}
                onChange={({ item }) =>
                  setValue((prev) => ({
                    ...prev,
                    blood_pressure_sys: item.label,
                  }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label == value.blood_pressure_sys
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              />
              <Font
                text={"/"}
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  color: "#284374",
                }}
              ></Font>
              <WheelPickerExpo
                key={`bp-dia-picker-${pickerRefreshKey}`}
                width={"50%"}
                height={300}
                initialSelectedIndex={bloodPressureOptionsDiastolic.indexOf(
                  value.blood_pressure_dia &&
                    bloodPressureOptionsDiastolic.includes(value.blood_pressure_dia)
                    ? value.blood_pressure_dia
                    : "80"
                )}
                items={bloodPressureOptionsDiastolic.map((age) => ({
                  label: age,
                  value: age,
                }))}
                onChange={({ item }) =>
                  setValue((prev) => ({
                    ...prev,
                    blood_pressure_dia: item.label,
                  }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label == value.blood_pressure_dia
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        fontFamily="poppins"
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              />
            </>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Font text="systolic"></Font>
            </View>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Font text="diastolic"></Font>
            </View>
          </View>
        </>
      );
    } else if (step == 8) {
      return (
        <>
          {/* blood glucose  */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
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
                  text={questions}
                ></Font>
                <Switch
                  title1={"fasting"}
                  title2={"postMeals"}
                  switchColor={["#284375", "#284375"]}
                  setValue={setSwitchValue}
                  value={switchValue}
                  style={{ width: "60%" }}
                ></Switch>
                {selectedGlucoseUnit == "mg/dL" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.blood_glucose_mg}
                        placeholder={"mg/dL"}
                        keyboardType="numeric"
                        placeholderTextColor={"#b2b2b2"}
                        onChangeText={(val) => {
                          setValue((prev) => ({
                            ...prev,
                            blood_glucose_mg: val,
                          }));
                          refreshPickerIfValid(val, bloodGlucoseMgOptions);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.blood_glucose_mmol}
                        placeholder={"mmol"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        // maxLength={1}
                        onChangeText={(val) => {
                          setValue((prev) => ({
                            ...prev,
                            blood_glucose_mmol: val,
                          }));
                          refreshPickerIfValid(val, bloodGlucoseMmolOptions);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dfe9f0",
                        borderRadius: 99999,
                        flex: 1,
                      }}
                    >
                      <TextInput
                        value={value.blood_glucose_mmol_points}
                        placeholder={"point"}
                        placeholderTextColor={"#b2b2b2"}
                        keyboardType="numeric" // Ensures only number keyboard
                        maxLength={1} // Restricts input to a single digit
                        onChangeText={(val) => {
                          // Allows only a single digit (0-9)
                          setValue((prev) => ({
                            ...prev,
                            blood_glucose_mmol_points: val,
                          }));
                          refreshPickerIfValid(val, bloodGlucoseMmolPointsOptions);
                        }}
                        style={[{ padding: 10 }]}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* <CustomInput
            toggleSwitch={true}
            title1={""}
            title2={"Post Meal"}
            switchColor={["#284375", "#284375"]}
            switchValue={switchValue}
            setSwitchValue={setSwitchValue}
            title={questions}
            placeHolder="Blood glucose level"
            value={
              selectedGlucoseUnit == "mg/dL"
                ? value.blood_glucose_mg
                : value.blood_glucose_mmol +
                  (value.blood_glucose_mmol ? ` . ` : "") +
                  value.blood_glucose_mmol_points
            }
            // onChangeText={(val) => setValue((prev) => ({ ...prev, name: val }))}
          ></CustomInput> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              <WheelPickerExpo
                key={`glucose-picker-${selectedGlucoseUnit}-${pickerRefreshKey}`}
                width={selectedGlucoseUnit == "mg/dL" ? "100%" : "50%"}
                height={300}
                initialSelectedIndex={
                  selectedGlucoseUnit == "mg/dL"
                    ? value.blood_glucose_mg && bloodGlucoseMgOptions.includes(value.blood_glucose_mg)
                      ? bloodGlucoseMgOptions.indexOf(value.blood_glucose_mg)
                      : bloodGlucoseMgOptions.indexOf("100")
                    : value.blood_glucose_mmol && bloodGlucoseMmolOptions.includes(value.blood_glucose_mmol)
                      ? bloodGlucoseMmolOptions.indexOf(value.blood_glucose_mmol)
                      : bloodGlucoseMmolOptions.indexOf("5")
                }
                items={
                  selectedGlucoseUnit == "mg/dL"
                    ? bloodGlucoseMgOptions.map((age) => ({ label: age, value: age }))
                    : bloodGlucoseMmolOptions.map((age) => ({ label: age, value: age }))
                }
                onChange={({ item }) =>
                  selectedGlucoseUnit == "mg/dL"
                    ? setValue((prev) => ({ ...prev, blood_glucose_mg: item.label }))
                    : setValue((prev) => ({ ...prev, blood_glucose_mmol: item.label }))
                }
                renderItem={(props) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          props.label ==
                            (selectedGlucoseUnit == "mg/dL"
                              ? value.blood_glucose_mg
                              : value.blood_glucose_mmol)
                            ? "#f4f6f9"
                            : "#ffffff",
                        width: "100%",
                        borderRadius: 99999,
                      }}
                    >
                      <Font
                        text={props.label}
                        style={{
                          fontSize: props.fontSize,
                          color: "#284374",
                          textAlign: props.textAlign,
                        }}
                      ></Font>
                    </View>
                  );
                }}
              />
              {selectedGlucoseUnit == "mmol/L" && (
                <>
                  <Font
                    text={"."}
                    style={{
                      fontSize: 36,
                      fontWeight: 500,
                      color: "#284374",
                    }}
                  ></Font>
                  <WheelPickerExpo
                    key={`glucosemmolPoints-picker-${selectedGlucoseUnit}-${pickerRefreshKey}`}
                    width={"50%"}
                    height={300}
                    initialSelectedIndex={
                      value.blood_glucose_mmol_points &&
                        bloodGlucoseMmolPointsOptions.includes(value.blood_glucose_mmol_points)
                        ? bloodGlucoseMmolPointsOptions.indexOf(value.blood_glucose_mmol_points)
                        : 4
                    }
                    items={bloodGlucoseMmolPointsOptions.map((age) => ({
                      label: age,
                      value: age,
                    }))}
                    onChange={({ item }) =>
                      setValue((prev) => ({
                        ...prev,
                        blood_glucose_mmol_points: item.label,
                      }))
                    }
                    renderItem={(props) => {
                      return (
                        <View
                          style={{
                            backgroundColor:
                              props.label == value.blood_glucose_mmol_points
                                ? "#f4f6f9"
                                : "#ffffff",
                            width: "100%",
                            borderRadius: 99999,
                          }}
                        >
                          <Font
                            text={props.label}
                            fontFamily="poppins"
                            style={{
                              fontSize: props.fontSize,
                              color: "#284374",
                              textAlign: props.textAlign,
                            }}
                          ></Font>
                        </View>
                      );
                    }}
                  />
                </>
              )}
            </>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Switch
              title1="mg/dL"
              title2="mmol/L"
              style={{ width: "50%" }}
              setValue={setSelectedGlucoseUnit}
              value={selectedGlucoseUnit}
            ></Switch>
          </View>
        </>
      );
    }
  };

  console.log(
    value.weight_Lb,
    value.weight_Lb_points,
    value.weight_Kg,
    value.weight_Kg_points,
    "value of weight"
  );

  // const handleNextStep = () => {
  //   if (step >= 1 && step < 8) {
  //     setPopup(false);
  //     setStep(step + 1);
  //   } else {
  //     if (value.name == "" || value.age == "" || value.gender == "") {
  //       alert("Please Enter all the required fields ");
  //       return;
  //     }

  //     const bloodPressureStatus = checkBloodPressureStatus(
  //       parseInt(value.blood_pressure_sys),
  //       parseInt(value.blood_pressure_dia)
  //     );

  //     const bloodGlucoseStatus = checkGlucoseLevel(
  //       selectedGlucoseUnit == "mg/dL"
  //         ? parseInt(value.blood_glucose_mg)
  //         : parseFloat(
  //             value.blood_glucose_mmol +
  //               "." +
  //               value.blood_glucose_mmol_points
  //           ),
  //       selectedGlucoseUnit == "mg/dL" ? "mg/dL" : "mmol/L",
  //       switchValue == "" ? true : false
  //     );

  //     navigation.navigate("QuestionsScreen", {
  //       name: value.name,
  //       height: selectedHeightUnit == "ft in"
  //         ? value.height_Ft + " Ft  " + value.height_In + "In"
  //         : value.height_Cm + "cm",
  //       age: value.age,
  //       gender: value.gender,
  //       weight: selectedWeightUnit == "lb"
  //         ? value.weight_Lb + value.weight_Lb_points + "Lb"
  //         : value.weight_Kg + value.weight_Kg_points + "Kg",
  //       bloodGlucose: bloodGlucoseStatus,
  //       bloodPressure: bloodPressureStatus,
  //       fasting: switchValue == "" ? true : false,
  //     });

  //     // Reset form after navigation
  //     setStep(1);
  //     setSelectedAge("");
  //     setValue({
  //       name: "",
  //       age: "",
  //       gender: "",
  //       height_Ft: "",
  //       height_In: "",
  //       height_Cm: "",
  //       weight_Kg: "",
  //       weight_Lb: "",
  //       weight_Lb_points: "",
  //       weight_Kg_points: "",
  //       waist_Circumference_In: "",
  //       waist_Circumference_In_points: "",
  //       waist_Circumference_Cm: "",
  //       waist_Circumference_Cm_points: "",
  //       blood_pressure_sys: "",
  //       blood_pressure_dia: "",
  //       blood_glucose_mg: "",
  //       blood_glucose_mmol: "",
  //       blood_glucose_mmol_points: "",
  //     });
  //   }
  // };

  function checkBloodPressureStatus(
    systolic: number,
    diastolic: number
  ): string {
    // Normal blood pressure ranges

    const isNormal =
      systolic >= 90 && systolic < 120 && diastolic >= 60 && diastolic < 80;

    if (isNormal) {
      return `${t("normalBp")} (${systolic}/${diastolic})`;
    } else {
      return (
        `${t("MaintainBp")} (${systolic}/${diastolic}). ` + `${t("bpRange")}`
      );
    }
  }

  function checkGlucoseLevel(
    glucoseValue: number,
    unit: "mg/dL" | "mmol/L",
    isFasting: boolean
  ): string {
    // Convert mmol/L to mg/dL for consistent comparison if needed
    const valueMgDl = unit === "mmol/L" ? glucoseValue * 18 : glucoseValue;

    let isNormal = false;
    let normalRange = "";

    if (isFasting) {
      //  glucose standards
      isNormal = valueMgDl >= 70 && valueMgDl < 100;
      normalRange = unit === "mg/dL" ? "70-99 mg/dL" : "3.9-5.5 mmol/L";
    } else {
      // Post-meal glucose standards (2 hours after eating)
      isNormal = valueMgDl >= 70 && valueMgDl < 140;
      normalRange = unit === "mg/dL" ? "70-139 mg/dL" : "3.9-7.7 mmol/L";
    }

    const formattedValue =
      unit === "mg/dL" ? `${glucoseValue} mg/dL` : `${glucoseValue} mmol/L`;

    if (isNormal) {
      return `${t("normalGlucoseLevel")} (${formattedValue})`;
    } else {
      return (
        `${t("maintainGlucoseLevel")} (${formattedValue}). ` +
        `${t("normalRangeGlucose")} ${normalRange} ${t("for")} ${isFasting ? `${t("fasting")}` : `${t("postMeal")}`
        } ${t("test")}.`
      );
    }
  }
  console.log(value.height_In, "value.height_In");

  return (
    <KeyboardAvoidingView
      style={styles.keyboardWrap}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <View style={[styles.container, isWebDesktop ? styles.webContainer : null]}>
      <View style={[styles.contentWrap, isWebDesktop ? styles.webContentWrap : null]}>
        <View
          style={[
            {
              flexDirection: "row",
              width: "100%",
              gap: 4,
              justifyContent: "center",
              marginVertical: 20,
            },
            isWebDesktop ? { marginTop: 28, marginBottom: 18 } : null,
          ]}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
            <View
              key={i}
              style={{
                backgroundColor: step >= e ? "#2C2E33" : "#D2DAEE",
                height: 4,
                width: 29,
                borderRadius: 99999,
              }}
            />
          ))}
        </View>

        {popup ? (
          <View
            style={[
              {
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              },
              isWebDesktop ? { justifyContent: "flex-start" } : null,
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                  backgroundColor: "#DFE9F0",
                  borderRadius: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  width: 329,
                },
                isWebDesktop ? { width: "100%", borderRadius: 18 } : null,
              ]}
            >
              <Image source={icons.bulb} style={{ width: 16, height: 16 }} />
              <View style={{ flex: 1, paddingRight: 18 }}>
                <Font text="getStarted" style={{ fontSize: 13, fontWeight: 400 }} />
              </View>
              <TouchableOpacity
                onPress={() => setPopup(false)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 10,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.45)",
                }}
              >
                <Image source={icons.close} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View style={{ width: "100%", marginVertical: isWebDesktop ? 12 : 20 }}>
          <View style={{ width: "100%", marginVertical: isWebDesktop ? 8 : 20 }}>
            <Image source={icons.healthAgeLogo} style={{ width: 24, height: 42 }} />
          </View>
          {renderItem()}
          {stepError ? <Text style={styles.stepErrorText}>{stepError}</Text> : null}
        </View>

        <View
          style={[styles.navRow, isWebDesktop ? styles.webBottomRow : null]}
        >
          <TouchableOpacity
            onPress={() => {
              if (step > 1 && step <= 8) {
                setStep(step - 1);
              } else {
                setPopup(true);
                if (isWebDesktop) {
                  navigation.navigate("Main");
                  return;
                }
                confirmExit();
              }
            }}
            style={[
              styles.navBtn,
              isWebDesktop ? styles.webNavBtn : null,
            ]}
          >
            <Image source={icons.Arrow} style={{ width: 10, height: 16 }} />
            <Font
              style={{
                color: "#0C9FD5",
                ...(isWebDesktop ? styles.webNavText : styles.navText),
              }}
              text={step > 1 && step <= 8 ? "back" : "home"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (step >= 1 && step < 8) {
                setPopup(false);
                const currentStepError = validateStep(step);
                if (currentStepError) {
                  showValidationError(currentStepError);
                  return;
                }
                setStepError(null);
                setStep((prev) => Math.min(prev + 1, 8));
              } else {
                for (let stepIndex = 1; stepIndex <= 8; stepIndex += 1) {
                  const requiredStepError = validateStep(stepIndex);
                  if (requiredStepError) {
                    showValidationError(requiredStepError);
                    return;
                  }
                }
                setStepError(null);
                setStep(1);
                setSelectedAge("");

                setValue({
                  name: "",
                  age: "",
                  gender: "",
                  height_Ft: "",
                  height_In: "",
                  height_Cm: "",
                  weight_Kg: "",
                  weight_Lb: "",
                  weight_Lb_points: "",
                  weight_Kg_points: "",
                  waist_Circumference_In: "",
                  waist_Circumference_In_points: "",
                  waist_Circumference_Cm: "",
                  waist_Circumference_Cm_points: "",
                  blood_pressure_sys: "",
                  blood_pressure_dia: "",
                  blood_glucose_mg: "",
                  blood_glucose_mmol: "",
                  blood_glucose_mmol_points: "",
                });
                setPopup(true);
                navigation.navigate("QuestionsScreen", {
                  name: value.name,
                  height:
                    selectedHeightUnit == "ft in"
                      ? value.height_Ft + " ft " + value.height_In + " in"
                      : value.height_Cm + " cm",
                  age: value.age,
                  gender: value.gender,
                  weight:
                    selectedWeightUnit == "Lb"
                      ? value.weight_Lb + " lb"
                      : value.weight_Kg + " kg",
                  bloodGlucose:
                    selectedGlucoseUnit == "mg/dL"
                      ? value.blood_glucose_mg
                      : value.blood_glucose_mmol + "." + value.blood_glucose_mmol_points,
                  bloodPressure: value.blood_pressure_sys + "/" + value.blood_pressure_dia,
                  bloodPressureSys: value.blood_pressure_sys,
                  bloodPressureDia: value.blood_pressure_dia,
                  bloodGlucose_mg: value.blood_glucose_mg ? value.blood_glucose_mg : "",
                  bloodGlucose_mmol: value.blood_glucose_mmol,
                  blood_glucose_mmol_points: value.blood_glucose_mmol_points,
                  selectedGlucoseUnit: selectedGlucoseUnit,
                  fasting: switchValue == "fasting" ? true : false,
                  selectedHeightUnit: selectedHeightUnit,
                  selectedWeightUnit: selectedWeightUnit,
                  heightValue:
                    selectedHeightUnit == "ft in"
                      ? value.height_Ft + "." + value.height_In
                      : value.height_Cm,
                  weightValue: selectedWeightUnit == "Lb" ? value.weight_Lb : value.weight_Kg,
                });
              }
            }}
            style={[
              styles.navBtn,
              isWebDesktop ? styles.webNavBtn : null,
            ]}
          >
            <Font
              style={{
                color: "#0C9FD5",
                ...(isWebDesktop ? styles.webNavText : styles.navText),
              }}
              text={step >= 1 && step < 8 ? "next" : "start"}
            />
            <Image source={icons.Arrow} style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default HealthAgeTest;

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
  keyboardWrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  webContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  contentWrap: {
    flex: 1,
    width: "100%",
  },
  webContentWrap: {
    maxWidth: 560,
    alignSelf: "center",
    paddingTop: 22,
    paddingBottom: 14,
  },
  navRow: {
    width: "100%",
    position: "static",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    marginTop: "auto",
  },
  navBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "#0C9FD5",
    borderRadius: 999,
    minWidth: 112,
  },
  navText: {
    fontWeight: "500",
    fontSize: 15,
  },
  webBottomRow: {
    paddingBottom: 26,
    paddingHorizontal: 6,
  },
  webNavBtn: {
    minWidth: 112,
    height: 38,
    borderWidth: 1,
    borderColor: "#0C9FD5",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  webNavText: {
    fontSize: 15,
  },
  stepErrorText: {
    marginTop: 8,
    color: "#B42318",
    fontSize: 13,
    fontWeight: "600",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  selectedItemContainer: {
    backgroundColor: "#007bff", // Background color for the selected item
    borderRadius: 10, // Rounded corners for the selected item
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
  selectedItemText: {
    color: "#fff", // Text color for the selected item
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
