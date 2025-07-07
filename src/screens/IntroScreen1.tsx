import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Font from "../components/CustomisedFont";
import { icons } from "../components/images";
import Button from "../components/Button";
import { initDatabase } from "../components/utils/database";

type IntroScreen1Props = {
  navigation: StackNavigationProp<RootStackParamList, "Intro1">;
};

const IntroScreen1: React.FC<IntroScreen1Props> = ({ navigation }) => {
  const [step, setStep] = React.useState(1);

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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (step > 1 && step <= 3) {
            setStep(step - 1);
          } else {
            navigation.goBack();
          }
        }}
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Image source={icons.Arrow} style={{ width: 10, height: 16 }}></Image>
        <Font
          text="back"
          style={{ color: "#0C9FD5", fontWeight: "medium" }}
        ></Font>
      </TouchableOpacity>
      <View
         style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={{  justifyContent: "center", alignItems: "center" }}>
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
          {/* <View style={{ width: "100%", marginTop: 40 }}> */}
          {/* </View> */}
        </View>
        <View style={{  flexDirection: "column",
          justifyContent: "center", gap: 4 }}>
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
        </View>
        <View style={{marginTop:20, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 5,
              justifyContent: "flex-start",
            }}
          >
            {/* <Animated.View
              style={[styles.stepContainer, { transform: [{ translateX }] }]}
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
        style={{
          padding: 10,
          marginTop: 40,
          marginBottom: 40,
          // position: "absolute",
          // bottom: 20,
          // left: 0,
          // right: 0,
        }}
        title={step == 3 ? "GetStarted" : "next"}
        onPress={() => {
          if (step >= 1 && step < 3) {
            setStep(step + 1);
            // handleNext();
          } else {
            navigation.navigate("InitialScreen");
          }
        }}
      ></Button>
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
