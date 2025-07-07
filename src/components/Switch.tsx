import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Font from "./CustomisedFont";
import { LinearGradient } from "expo-linear-gradient";

interface SwitchProps {
  title1?: string;
  title2?: string;
  style?: React.CSSProperties;
  onPress1?: () => void;
  onPress2?: () => void;
  type?: string;
  value?: string;
  setValue?: (val: any) => void;
  switchColor?: [string, string, ...string[]];
}

const Switch: React.FC<SwitchProps> = ({
  title1,
  title2,
  style,
  onPress1,
  onPress2,
  type,
  value,
  setValue,
  switchColor = ["#0F9AD1", "#2E589D"]
}) => {
  const textStyle = {
    ...styles.defaultText,
    ...style,
  };
  return (
    <View
      style={[{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        borderRadius: 99999,
        padding: 4,
        paddingVertical:5,
        width:"100%"
      },style]}
    >
      <TouchableOpacity onPress={()=> setValue && setValue(title1)} style={{ width:"50%",}}>
        <LinearGradient
          colors={value==title1 ? switchColor : ["#f4f6f9","#f4f6f9"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[
            {
              // Border thickness
              width:"100%",
              borderRadius: 999999,
              flexDirection: "row",
              paddingVertical:5,
            //   flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
          ]}
        >
          <Font
            text={title1}
            style={{ color:value==title1 ? "white" : "black", fontWeight: "medium" }}
          ></Font>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setValue && setValue(title2)} style={{ width:"50%"}}>
        <LinearGradient
          colors={value==title2 ? switchColor : ["#f4f6f9","#f4f6f9"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[
            {
                width:"100%",
              // Border thickness
              borderRadius: 999999,
              flexDirection: "row",
              paddingVertical:5,
            //   flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
          ]}
        >
          <Font
            text={title2}
            style={{ color:value==title2 ? "white" : "black", fontWeight: "medium" }}
          ></Font>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16, // Default font size
    color: "black", // Default text color
  },
});
