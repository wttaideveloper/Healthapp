import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Platform,
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
import {
  calculateHealthAge,
  readExcelFile,
} from "../components/utils/readExcel";
import { calculateBMI } from "../components/utils/BmiCalculation";
import { useTranslation } from "react-i18next";

type QuestionsProps = DrawerScreenProps<DrawerParamList, "QuestionsScreen">;

const questionsData = [
  {
    id: 1,
    question: "howOftenEatBreakfast",
    subQuestion: "breakfastNote",
    options: [
      { id: 1, text: "lessThan2Days", points: 0 },
      { id: 1, text: "twoToFourDays", points: 0 },
      { id: 1, text: "fiveToSixDays", points: 0.5 },
      { id: 1, text: "everyday", points: 1 },
    ],
  },
  {
    id: 2,
    question: "howOftenSnack",
    options: [
      { id: 2, text: "severalTimesDay", points: 0 },
      { id: 2, text: "onceDay", points: 0 },
      { id: 2, text: "fewTimesWeek", points: 0.5 },
      { id: 2, text: "rarelyNever", points: 1 },
    ],
  },
  {
    id: 3,
    question: "howManyFruitsVeggies",
    subQuestion: "fruitsVeggiesNote",
    options: [
      { id: 3, text: "0-2", points: 0 },
      { id: 3, text: "3-4", points: 0.5 },
      { id: 3, text: "5+", points: 1 },
    ],
  },
  {
    id: 4,
    question: "howManyWholeGrains",
    subQuestion: "wholeGrainsNote",
    options: [
      { id: 4, text: "none", points: 0 },
      { id: 4, text: "1-2", points: 0.5 },
      { id: 4, text: "3+", points: 1 },
    ],
  },
  {
    id: 5,
    question: "howManyNutsSeeds",
    subQuestion: "nutsSeedsNote",
    options: [
      { id: 5, text: "0-2", points: 0 },
      { id: 5, text: "3-4", points: 0.5 },
      { id: 5, text: "5+", points: 1 },
    ],
  },
  {
    id: 6,
    question: "howOftenRedMeat",
    options: [
      { id: 6, text: "threeOrMoreTimesWeek", points: 0 },
      { id: 6, text: "onceTwiceMonth", points: 0.5 },
      { id: 6, text: "never", points: 1 },
    ],
  },
  {
    id: 7,
    question: "howOftenExercise",
    options: [
      { id: 7, text: "rarely", points: 0 },
      { id: 7, text: "oneTwoDaysWeek", points: 0 },
      { id: 7, text: "threeFourDaysWeek", points: 0.5 },
      { id: 7, text: "fiveMoreDaysWeek", points: 1 },
    ],
  },
  {
    id: 8,
    question: "howIsWeight",
    options: [
      { id: 8, text: "severelyOverweight", points: 0 },
      { id: 8, text: "moderatelyOverweight", points: 0 },
      { id: 8, text: "underweight", points: 0 },
      { id: 8, text: "healthyWeight", points: 1 },
    ],
  },
  {
    id: 9,
    question: "howOftenSleep",
    options: [
      { id: 9, text: "twoOrFewerDays", points: 0 },
      { id: 9, text: "threeFourDays", points: 0 },
      { id: 9, text: "fiveSixDays", points: 0.5 },
      { id: 9, text: "everyday", points: 1 },
    ],
  },
  {
    id: 10,
    question: "whatIsTobaccoHistory",
    options: [
      { id: 10, text: "currentlyUse", points: 0 },
      { id: 10, text: "quitLessThanTwoYears", points: 0 },
      { id: 10, text: "quitOverTwoYears", points: 0.5 },
      { id: 10, text: "neverUsed", points: 1 },
    ],
  },
  {
    id: 11,
    question: "howManyAlcohol",
    subQuestion: "alcoholNote",
    options: [
      { id: 11, text: "excessiveAlcohol", points: 0 },
      { id: 11, text: "1-7", points: 0 },
      { id: 11, text: "none", points: 1 },
    ],
  },
  {
    id: 12,
    question: "howRateSpirituality",
    options: [
      { id: 12, text: "noInterest", points: 0 },
      { id: 12, text: "moderatelySpiritual", points: 0.5 },
      { id: 12, text: "deeplySpiritual", points: 1 },
    ],
  },
];

const QuestionsScreen: React.FC<QuestionsProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    { questionId: number; text: string; points: number }[]
  >([]);
  console.log(
    route.params.heightValue,
    route.params.weightValue,
    "height, weight "
  );

  // const [totalScore, setTotalScore] = React.useState(0);
  const [questionsText, setQuestionsText] = React.useState("");
  // const [age, setAge] = React.useState("21");
  // React.useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate("Main"); // Ensure back goes to healthAgeTest
  //     return true; // Prevent default behavior
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove(); // Cleanup
  // }, [navigation]);

  const handleSelectAnswer = (
    Id: number,
    selectedOption: string,
    points: number
  ) => {
    setSelectedAnswers((prev) => {
      const filteredAnswers = prev.filter((answer) => answer.questionId !== Id);
      return [
        ...filteredAnswers,
        { questionId: Id, text: selectedOption, points: points },
      ];
    });
  };

  const handleNext = () => {
    const currentQuestionId = questionsData[currentIndex].id;

    // Check if current question is answered
    const isAnswered = selectedAnswers.some(
      (answer) => answer.questionId === currentQuestionId
    );

    if (!isAnswered) {
      Alert.alert(t("enterThisFields"), "", [{ text: t("Fs_Close") }]);
      return;
    }
    if (currentIndex + 1 == 12) {
      if (selectedAnswers.length !== 12) return;
    }
    if (currentIndex < questionsData.length - 1) {
      const nextQuestion = questionsData[currentIndex + 1];

      if (nextQuestion.question === "howIsWeight") {
        console.log("check1");
        // console.log(route.params.weight, route.params.height, "weight,height");
        console.log(route.params.weightValue, route.params.heightValue, "weight,height");

        const bmiAnswer = calculateBMI(
          route?.params?.weightValue,
          route?.params?.selectedWeightUnit,
          route?.params?.heightValue,
          route?.params?.selectedHeightUnit
        );
        console.log(bmiAnswer, "bmianswer");

        if (bmiAnswer) {
          console.log("check2");
          setSelectedAnswers((prev) => {
            const alreadyExists = prev.some(
              (answer) => answer.questionId === nextQuestion.id
            );

            if (alreadyExists) {
              return prev; // Don't add anything if questionId already exists
            }

            return [...prev, { questionId: nextQuestion.id, ...bmiAnswer }];
          });

          setCurrentIndex(currentIndex + 1); // Skip manual selection
          return;
        }
      }

      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate total score when quiz ends
      if (currentIndex + 1 !== selectedAnswers.length) {
        alert("Complete the Assessments to move forward");
        return;
      }
      const totalScore = selectedAnswers.reduce(
        (sum, answer) => sum + answer.points,
        0
      );
      // setTotalScore(totalScore);
      navigation.navigate("InterestScreen", {
        totalScore: totalScore,
        answers: selectedAnswers,
        reportData: {
          name: route?.params?.name,
          height: route?.params?.height,
          age: route?.params?.age,
          gender: route?.params?.gender,
          weight: route?.params?.weight,
          bloodGlucose: route?.params?.bloodGlucose,
          bloodPressure: route?.params?.bloodPressure,
          fasting: route?.params?.fasting,
          bloodPressureSys: route?.params?.bloodPressureSys,
          bloodPressureDia: route?.params?.bloodPressureDia,
          bloodGlucose_mg: route?.params?.bloodGlucose_mg,
          bloodGlucose_mmol: route?.params?.bloodGlucose_mmol,
          selectedGlucoseUnit: route?.params?.selectedGlucoseUnit,
          blood_glucose_mmol_points: route?.params?.blood_glucose_mmol_points,
          selectedWeightUnit: route?.params?.selectedWeightUnit,
          selectedHeightUnit: route?.params?.selectedHeightUnit,
          heightValue: route?.params?.heightValue,
          weightValue: route?.params?.weightValue,
        },
      });
      setSelectedAnswers([]);
      setCurrentIndex(0);
      //   console.log(totalScore, "total Score");
    }
  };

    const confirmExit = () => {
      Alert.alert(
        t("leavePage"),
        t("leavePageConfirmation"),
        [
          { text: t("Hs_Cancel"), style: "cancel" },
          {
            text: t("home"),
            onPress: () => {
              setSelectedAnswers([]);
              setCurrentIndex(0);
              navigation.navigate("Main")
            }, // Or replace('Main')
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

  const handleBack = () => {
    if (currentIndex == 0) {
      confirmExit();
      // navigation.navigate("Main");
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  console.log(selectedAnswers, selectedAnswers.length, "selectedAnswers");
  console.log(currentIndex, "current index");

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Font
          text="newAssessment"
          style={{ fontWeight: 700, fontSize: 20, color: "#262F40" }}
        ></Font>
        <View style={{ marginVertical: 20 }}>
          <ProgressBar
            progress={`${Math.round(
              (selectedAnswers.length / questionsData.length) * 100
            )}%`}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <View style={{ width: "100%", marginVertical: 20 }}>
          <Image
            source={icons.healthAgeLogo}
            style={{ width: 24, height: 42 }}
          ></Image>
        </View>
        <Font
          text={questionsData[currentIndex].question}
          style={styles.question}
        ></Font>
        <Font
          text={
            questionsData[currentIndex].subQuestion
              ? questionsData[currentIndex].subQuestion
              : ""
          }
          style={styles.subQuestion}
        ></Font>
      </View>

      <FlatList
        data={questionsData[currentIndex].options}
        keyExtractor={(item) => item.text}
        style={Platform.OS === "web" ? { flex: 1, width: "100%", minHeight: 0 } : undefined}
        contentContainerStyle={Platform.OS === "web" ? { paddingBottom: 10 } : undefined}
        renderItem={({ item }) => (
          <>
            {console.log(item, "item")}
            <Button
              onPress={() => {
                if (questionsData[currentIndex].question === "howIsWeight")
                  return;
                setQuestionsText(item.text);
                handleSelectAnswer(
                  questionsData[currentIndex].id,
                  item.text,
                  item.points
                );
              }}
              disabled={
                !selectedAnswers.some(
                  (answers) =>
                    answers.text == item.text && answers.questionId == item.id
                )
              }
              title={item.text}
              style={styles.option}
            ></Button>
          </>
        )}
      />
      <View
        style={{
          width: "100%",
          position: "static",
          //   bottom: 30,
          //   left:20,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: Platform.OS === "web" ? "auto" : 0,
          paddingBottom: Platform.OS === "web" ? 24 : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleBack();
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            padding: 5,
          }}
        >
          <Image source={icons.Arrow} style={{ width: 10, height: 16 }}></Image>
          <Font
            style={{ fontWeight: "500", color: "#0C9FD5" }}
            text="back"
          ></Font>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNext();
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            padding: 5,
          }}
        >
          <Font
            style={{ fontWeight: "500", color: "#0C9FD5" }}
            text={"next"}
          ></Font>
          <Image
            source={icons.Arrow}
            style={{ width: 10, height: 16, transform: [{ scaleX: -1 }] }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: Platform.OS === "web" ? "flex-start" : "space-between",
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
});
