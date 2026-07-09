import React from "react";
import { Alert, Linking, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "../navigation/AppNavigator";
import Font from "../components/CustomisedFont";
import { CORE_MEDICAL_SOURCES } from "../components/utils/medicalSources";

type AboutAppScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const AboutAppScreen: React.FC<AboutAppScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const openSource = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open this source link.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Font text="About the App" style={styles.title} /> */}
        <Font text={"aboutTheAppDesc"} style={styles.content}>
          {/* This app helps to determine the “health age” of one's body according to an individual’s lifestyle practices. This app combines information from both the well-known Alameda County longevity studies and the new Adventist Health Studies. This app helps participants understand the strong correlation between one’s health habits and their risk of death. It provides an excellent basis for health counseling. */}
        </Font>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>{t("Rs_MedicalDisclaimerTitle")}</Text>
          <Text style={styles.disclaimerText}>
            {t("Rs_MedicalDisclaimerText")}
          </Text>
        </View>
        <View style={styles.sourcesContainer}>
          <Text style={styles.sourcesTitle}>Medical Sources</Text>
          {CORE_MEDICAL_SOURCES.map((source) => (
            <TouchableOpacity
              key={source.url}
              style={styles.sourceItem}
              onPress={() => openSource(source.url)}
            >
              <Text style={styles.sourceTitle}>{source.title}</Text>
              <Text style={styles.sourceDescription}>{source.description}</Text>
              <Text style={styles.sourceUrl}>{source.url}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    color: "#333333",
  },
  disclaimerContainer: {
    marginTop: 32,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b00020',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  disclaimerText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
  sourcesContainer: {
    marginTop: 20,
    width: "100%",
    borderRadius: 10,
    padding: 18,
    backgroundColor: "#F4FAFD",
    borderWidth: 1,
    borderColor: "#D7ECF5",
  },
  sourcesTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#194959",
    textAlign: "center",
  },
  sourceItem: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#D7ECF5",
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#194959",
  },
  sourceDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: "#3E5964",
  },
  sourceUrl: {
    marginTop: 4,
    fontSize: 12,
    color: "#0B85B4",
    textDecorationLine: "underline",
  },
});

export default AboutAppScreen;
