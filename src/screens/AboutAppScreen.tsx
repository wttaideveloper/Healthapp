import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Font from "../components/CustomisedFont";

type AboutAppScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "AboutApp">;
};

const AboutAppScreen: React.FC<AboutAppScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Font text="About the App" style={styles.title} /> */}
        <Font text={"aboutTheAppDesc"} style={styles.content}>
          {/* This app helps to determine the “health age” of one's body according to an individual’s lifestyle practices. This app combines information from both the well-known Alameda County longevity studies and the new Adventist Health Studies. This app helps participants understand the strong correlation between one’s health habits and their risk of death. It provides an excellent basis for health counseling. */}
        </Font>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This app is <Text style={{ fontWeight: "bold" }}>not a substitute for professional medical care</Text>. Always consult with a qualified healthcare provider regarding any medical concerns, conditions, or before making changes to your diet, exercise, or lifestyle.{"\n\n"}
            By using this app, you acknowledge and agree that the creators, developers, and associated organizations are <Text style={{ fontWeight: "bold" }}>not responsible</Text> for any decisions, actions, or outcomes resulting from its use.
          </Text>
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
});

export default AboutAppScreen;
