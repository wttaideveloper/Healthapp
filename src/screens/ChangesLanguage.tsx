import React from "react";
import BackButton from "../components/BackButton";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTranslation } from "react-i18next";
import Font from "../components/CustomisedFont";
import i18n from "../components/i18n";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { switchLanguage } from "../components/utils/rtl";
import { useResponsiveLayout } from "../components/utils/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChangeLanguageProps = {
  navigation: StackNavigationProp<RootStackParamList, "ChangeLanguage">;
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
  { code: "bn", name: "বাংলা", letter: "ব" }, // Bangla
  { code: "id", name: "Bahasa Indonesia", letter: "A" }, // Indonesian
  { code: "tr", name: "Türkçe", letter: "A" }, // Turkish
  { code: "te", name: "తెలుగు", letter: "అ" }, // Telugu
  { code: "pa", name: "ਪੰਜਾਬੀ", letter: "ਪ" }, // Punjabi
  // RTL languages - the app mirrors its layout for these via src/components/utils/rtl.ts
  { code: "fa", name: "فارسی", letter: "ف" }, // Persian
  { code: "ur", name: "اردو", letter: "ا" }, // Urdu
  { code: "he", name: "עברית", letter: "ע" }, // Hebrew
];

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const { width, isWideLayout: isWebDesktop } = useResponsiveLayout();
  const insets = useSafeAreaInsets();
  const columns = width < 360 ? 3 : 4;
  const horizontalPadding = 40;
  const columnGap = 15;
  const itemWidth = (width - horizontalPadding - columnGap * (columns - 1)) / columns;
  const setLanguageToStore = async (lang: string) => {
    try {
      await AsyncStorage.setItem("language", lang);
    } catch (e) {
      console.error("Failed to save language", e);
    }
  };
  const changeLanguage = (lng: string) => {
    // switchLanguage persists language + direction, swaps translations, and
    // prompts for a restart only when the writing direction actually flips.
    setLanguage(lng);
    void switchLanguage(lng);
  };

  if (isWebDesktop) {
    const webLanguages = languages;
    return (
      <ScrollView style={styles.webScroll} contentContainerStyle={styles.webRoot}>
        <View style={styles.webContent}>
          <View style={{ alignSelf: "flex-start", marginBottom: 12 }}>
            <BackButton fallback={{ name: "InitialScreen" }} />
          </View>
          <Text style={styles.webTitle}>{t("selectLanguage")}</Text>

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
            onPress={() => navigation.navigate("InitialScreen")}
            style={styles.webNextButtonTouch}
          >
            <LinearGradient
              colors={["#19ABE7", "#2D579D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.webNextButton}
            >
              <Text style={styles.webNextText}>{t("next")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={
        [
          styles.mobileScroll,
          // @react-navigation/stack's CardSheet (node_modules/@react-navigation/stack/
          // lib/module/views/Stack/CardSheet.js) deliberately drops its own `flex: 1,
          // overflow: 'hidden'` for a full-height screen like this one, switching to
          // `minHeight: '100%'` instead so document.body can scroll (its own comment:
          // "necessary for mobile browsers to be able to hide address bar on scroll").
          // But Expo's web template sets `body { overflow: hidden }` specifically so
          // ScrollView owns all scrolling - the two assumptions conflict, leaving every
          // ancestor (and this ScrollView) unbounded: sized to content, not viewport, so
          // nothing ever actually overflows a box that has `overflow-y: auto`. Binding
          // this ScrollView directly to the real viewport height side-steps that broken
          // ancestor chain entirely. `--vh` is the same custom property CardSheet itself
          // sets on `html` for exactly this (mobile address-bar-safe) viewport height; it
          // falls back to plain `1vh` (i.e. this becomes plain 100vh) wherever CardSheet
          // hasn't set it, e.g. desktop/non-touch.
          //
          // `height` alone is not enough: RNW's ScrollView always carries its own
          // flex-grow/flex-shrink on the scroll node, and flex-grow can expand an
          // item PAST an explicit `height` (height only sets the flex-basis) when
          // the surrounding flex chain has no definite size to grow against - which
          // is exactly this broken ancestor chain. Measured in a real headless
          // Chromium run: with only `height` set, the node's computed height was
          // still 1037px (= its content), not the intended 568px. `maxHeight` is
          // clamped by the flexbox spec regardless of flex-grow, so it holds.
          Platform.OS === "web" ? { maxHeight: "calc(var(--vh, 1vh) * 100)" } : null,
        ] as any
      }
      contentContainerStyle={[styles.container, { paddingBottom: 24 + insets.bottom }]}
    >
      <View style={{ alignSelf: "flex-start", marginBottom: 12 }}>
        <BackButton fallback={{ name: "InitialScreen" }} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Font text="chooseLanguage" fontFamily="Roboto" style={styles.title} />
        <View
          style={{ alignItems: "center", paddingBottom: 24, width: "100%" }}
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
                      // backgroundColor: language === lang.code ? "red" : "white",
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
        </View>
      </View>

      <Button
        type="intro"
        style={{
          padding: 10,
          marginTop: 40,
        }}
        title="Hs_Change"
        onPress={() => navigation.navigate("InitialScreen")}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // The real fix: the ScrollView itself had no `style` prop, so it had no
  // bounded height of its own and just grew to match its content - same as
  // the rest of the page, since Expo's web template (dist/index.html) sets
  // `body { overflow: hidden }` specifically so ScrollView owns all
  // scrolling. With no bounded box, there was nothing for the browser to
  // treat as "overflowing" and no document-level scroll to fall back on.
  // Matches the desktop branch's own `webScroll: { flex: 1, ... }` below.
  mobileScroll: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    // contentContainerStyle: flexGrow (not flex) lets the content grow
    // taller than the now-bounded ScrollView above when it doesn't fit,
    // which is what the bounded box needs in order to actually scroll.
    flexGrow: 1,
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
  webScroll: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  webRoot: {
    flexGrow: 1,
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

export default ChangeLanguage;
