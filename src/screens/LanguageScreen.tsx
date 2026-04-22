import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTranslation } from "react-i18next";
import Font from "../components/CustomisedFont";
import i18n from "../components/i18n";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Language">;
};

const languages = [
  { code: "hi", name: "हिंदी", letter: "अ" }, // Hindi
  { code: "en", name: "English", letter: "A" }, // English
  { code: "es", name: "Español", letter: "A" }, // Spanish
  { code: "ja", name: "日本語", letter: "あ" }, // Japanese
  { code: "fr", name: "Français", letter: "A" }, // French
  { code: "zh", name: "中文", letter: "中文" }, // Chinese
  { code: "ko", name: "한국어", letter: "ㄱ" }, // Korean
  { code: "ru", name: "Русский", letter: "A" }, // Russian
  { code: "pt", name: "Português", letter: "A" }, // Portuguese
  { code: "de", name: "Deutsch", letter: "A" }, // German
  // { code: "pap", name: "Papiamentu", letter: "A" }, // Papiamentu
  { code: "vi", name: "Tiếng Việt", letter: "A" }, // Vietnamese
  { code: "mg", name: "Malagasy", letter: "A" }, // Malagasy
  { code: "da", name: "Dansk", letter: "A" }, // Danish
  { code: "ta", name: "தமிழ்", letter: "அ" }, // Tamil
];
const LanguageScreen: React.FC<LanguageScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const { width } = useWindowDimensions();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 4; // Adjust column width
  const isWebDesktop = width >= 760;

  const setLanguageToStore = async (lang: string) => {
    try {
      await AsyncStorage.setItem("language", lang);
    } catch (e) {
      console.error("Failed to save language", e);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageToStore(lng);
    setLanguage(lng);
  };

  React.useEffect(() => {
    setLanguageToStore(i18n.language);
  }, []);

  if (isWebDesktop) {
    const webLanguages = languages.slice(0, 10);
    return (
      <View style={styles.webRoot}>
        <View style={styles.webContent}>
          <Text style={styles.webTitle}>Select language</Text>

          <View style={styles.webGrid}>
            {webLanguages.map((lang) => {
              const active = language === lang.code;
              return (
                <TouchableOpacity
                  onPress={() => changeLanguage(lang.code)}
                  key={lang.code}
                  style={styles.webItem}
                >
                  <LinearGradient
                    colors={active ? ["#0F9AD1", "#2D579D"] : ["#ffffff", "#ffffff"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.webCircleWrap, active ? styles.webCircleWrapActive : null]}
                  >
                    <View style={[styles.webCircleInner, active ? styles.webCircleInnerActive : null]}>
                      <Text style={[styles.webLetter, active ? styles.webLetterActive : null]}>{lang.letter}</Text>
                    </View>
                  </LinearGradient>
                  <Text style={styles.webLabel}>{lang.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Intro1")}
            style={styles.webNextButtonTouch}
          >
            <LinearGradient
              colors={["#19ABE7", "#2D579D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.webNextButton}
            >
              <Text style={styles.webNextText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Font text="chooseLanguage" fontFamily="Roboto" style={styles.title} />
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 15,
              width: "100%", // Adjust to keep items aligned
            }}
          >
            {languages.map((lang) => (
              <TouchableOpacity
                onPress={() => changeLanguage(lang.code)}
                key={lang.code}
                style={{
                  width: itemWidth,
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={language !== lang.code ? ["#ffffff","#ffffff"] : ["#0F9AD1", "#2D579D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 54, // Add fixed width
                    height: 54, // Add fixed height
                    padding: 2, // Border thickness
                    borderRadius: 9999999,
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      // border:1,
                      borderWidth: 2,
                      borderColor: language !== lang.code ? "#1c4a96" :"transparent",
                    }}
                  >
                    <Font
                      text={lang.letter}
                      style={{
                        fontSize: 20,
                        color: language === lang.code ? "white" : "#262F40",
                        fontWeight: "bold",
                      }}
                      onPress={() => changeLanguage(lang.code)}
                    />
                  </View>
                </LinearGradient>
                <Font
                  text={lang.name}
                  style={{ fontSize: 14, marginTop: 5, color: "#262F40" }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
{/* <View style={{height:150,}}> */}

      <Button
      type="intro"
        style={{
          // width:"90%",
          padding: 10,
          marginTop: 40,
          // position: "absolute",
          // bottom: 20,
          // left: 0,
          // right: 0,
        }}
        title="next"
        onPress={() => {
          console.log("pressed");
          
          navigation.navigate("Intro1");
        }}
        ></Button>
        {/* </View> */}
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    // width: "100%",
  },
  languageText: {
    fontSize: 16,
    color: "black",
    fontWeight: "regular",
  },
  webRoot: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  webContent: {
    width: "100%",
    maxWidth: 720,
    alignItems: "center",
  },
  webTitle: {
    fontSize: 58 / 2,
    lineHeight: 68 / 2,
    fontWeight: "700",
    color: "#1F2A44",
    marginBottom: 34,
  },
  webGrid: {
    width: "100%",
    maxWidth: 620,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 22,
  },
  webItem: {
    width: 116,
    alignItems: "center",
  },
  webCircleWrap: {
    width: 74,
    height: 74,
    borderRadius: 74,
    padding: 2,
  },
  webCircleWrapActive: {
    shadowColor: "#2759A1",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  webCircleInner: {
    flex: 1,
    borderRadius: 72,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0F9AD1",
    backgroundColor: "#FFFFFF",
  },
  webCircleInnerActive: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  webLetter: {
    fontSize: 36 / 2,
    fontWeight: "700",
    color: "#2B3345",
  },
  webLetterActive: {
    color: "#FFFFFF",
  },
  webLabel: {
    marginTop: 10,
    fontSize: 34 / 2,
    color: "#1C1F26",
  },
  webNextButtonTouch: {
    width: "100%",
    maxWidth: 560,
    marginTop: 42,
    borderRadius: 999,
    overflow: "hidden",
  },
  webNextButton: {
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
  },
  webNextText: {
    color: "#FFFFFF",
    fontSize: 36 / 2,
    fontWeight: "500",
  },
});

export default LanguageScreen;
