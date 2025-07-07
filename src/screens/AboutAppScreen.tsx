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
    // backgroundColor:"green",
    // justifyContent: "center",
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
});

export default AboutAppScreen;
