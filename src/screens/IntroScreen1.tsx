import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";

type IntroScreen1Props = {
  navigation: StackNavigationProp<RootStackParamList, "Intro1">;
};

const IntroScreen1: React.FC<IntroScreen1Props> = ({ navigation }) => {
  const [step, setStep] = React.useState(1);
  const { width } = useWindowDimensions();
  const isWebDesktop = width >= 760;
  const isWeb = Platform.OS === "web";

  const handleBackPress = () => {
    if (step > 1 && step <= 3) {
      setStep((prev) => prev - 1);
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace("SignIn");
  };

  // React.useEffect(() => {
  //   InitializeDb();
  // }, []);

  // const InitializeDb = async () => {
  //   await initDatabase().catch(console.error);
  // };



  // const translateX = React.useRef(new Animated.Value(0)).current;

  // const handleNext = () => {
  //   if (step < 3) {
  //     Animated.timing(translateX, {
  //       toValue: -300 * step, // Adjust based on screen width
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       setStep(step + 1);
  //     });
  //   } else {
  //     navigation.navigate("Main");
  //   }
  // };

  return (
    <View style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.pageShell, isWeb && styles.webShell]}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={[styles.backRow, isWeb && styles.backRowWeb]}
        >
          <Image source={icons.Arrow} style={{ width: 10, height: 16 }}></Image>
          <Font
            text="back"
            style={{ color: "#0C9FD5", fontWeight: "medium" }}
          ></Font>
        </TouchableOpacity>
        <View
          style={[styles.mainBody, isWebDesktop && styles.mainBodyDesktop]}
        >
          <View style={[styles.visualWrap, isWebDesktop && styles.visualWrapDesktop]}>
            <View style={styles.circleContainer}>
              {/* Outer Circle (Largest) */}
              <View style={[styles.circle, styles.largeCircle]} />

              {/* Middle Circle (Dashed) */}
              <View
                style={[
                  styles.circle,
                  styles.mediumCircle,
                  { borderStyle: "dashed" },
                ]}
              />

              {/* Inner Circle (Smallest) */}
              <View style={[styles.circle, styles.smallCircle]} />

              {/* Image on Top */}
              <Image source={icons.introScreen} style={styles.image} />
            </View>
          </View>
          <View style={[styles.copyWrap, isWebDesktop && styles.copyWrapDesktop]}>
            <Font
              text={
                step == 1 ? "introduction" : step == 2 ? "howItWorks" : "benefits"
              }
              style={{ color: "#0C9FD5", fontWeight: "semibold", fontSize: 14 }}
            ></Font>
            <Font
              text={
                step == 1
                  ? "discoverHealthAge"
                  : step == 2
                    ? "simpleScienceBacked"
                    : "getPersonalizedTips"
              }
              style={{ color: "black", fontWeight: "semibold", fontSize: 24 }}
            />
            <Font
              // text={
              //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              // }
              text={
                step == 1
                  ? "lifestyleAffectsHealth"
                  : step == 2
                    ? "answerQuestions"
                    : "improveLifestyle"
              }
              style={{ color: "black", fontWeight: "regular", fontSize: 15 }}
            />
            <View style={styles.indicatorsWrap}>
              {/* <Animated.View
              sty
              le={[styles.stepContainer, { transform: [{ translateX }] }]}
              > */}
              {/* Step Indicators */}
              {[1, 2, 3].map((item) => (
                <View
                  key={item}
                  style={{
                    backgroundColor: step === item ? "#2C2E33" : "#D2DAEE",
                    padding: 2,
                    paddingHorizontal: step === item ? 10 : 5,
                    borderRadius: 99999,
                    // margin: 5,
                  }}
                />
              ))}
              {/* </Animated.View> */}
            </View>
          </View>
        </View>
        <Button
          type="intro"
          style={{ ...styles.nextButton, ...(isWeb && styles.nextButtonWeb) }}
          title={step == 3 ? "GetStarted" : "next"}
          onPress={() => {
            if (step >= 1 && step < 3) {
              setStep(step + 1);
              // handleNext();
            } else {
              AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true")
                .catch((error) => console.error("Failed to persist onboarding:", error))
                .finally(() => {
                  navigation.replace("SignIn");
                });
            }
          }}
        ></Button>
        {step === 3 ? (
          <TouchableOpacity
            style={styles.signInLink}
            onPress={() => navigation.replace("SignIn")}
          >
            <Text style={{ color: "#0C9FD5", fontWeight: "500", fontSize: 13 }}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  webContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  pageShell: {
    flex: 1,
    width: "100%",
  },
  webShell: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
  },
  backRow: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  backRowWeb: {
    paddingTop: 28,
    paddingBottom: 8,
  },
  mainBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainBodyDesktop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
    justifyContent: "space-between",
  },
  visualWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  visualWrapDesktop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  copyWrap: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
  },
  copyWrapDesktop: {
    flex: 1,
    maxWidth: 520,
    justifyContent: "center",
    alignSelf: "center",
  },
  indicatorsWrap: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
  },
  nextButton: {
    padding: 10,
    marginTop: 26,
    marginBottom: 26,
  },
  nextButtonWeb: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "flex-start",
    marginTop: 18,
    marginBottom: 18,
  },
  signInLink: {
    alignItems: "center",
    marginTop: -8,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  circleContainer: {
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ensures circles stay behind the image
  },
  circle: {
    position: "absolute",
    borderColor: "#E9F0F4",
    borderWidth: 1,
    borderRadius: 9999, // Makes it a perfect circle
  },
  largeCircle: {
    width: 360,
    height: 360,
  },
  mediumCircle: {
    width: 290,
    height: 290,
  },
  smallCircle: {
    width: 230,
    height: 230,
  },
  image: {
    width: 302,
    height: 302,
  },
});

export default IntroScreen1;
