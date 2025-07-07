import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Font from "./CustomisedFont";
import { LinearGradient } from "expo-linear-gradient";

type ProgressBarProps = {
  progress: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={{ width: "100%",flexDirection:"column",gap:5 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Font
          text="Progress"
          style={{ color: "black", fontSize: 12, fontWeight: 500 }}
        ></Font>
        <Font
          text={progress}
          style={{ color: "black", fontSize: 12, fontWeight: 500 }}
        ></Font>
      </View>
      <View
        style={{
          height: 8,
          borderRadius: 32,
          width: "100%",
          backgroundColor: "#F4F6F9",
        }}
      >
        <View style={{
          height: 8,
          borderRadius: 32,
          width: progress,
          backgroundColor: "#F4F6F9",
        }}>
          <LinearGradient
            colors={["#BBECFF", "#0E9AD1"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: "100%",
              // Border thickness
              height: 8,
              borderRadius: 32,

            }}
          ></LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
