import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "./images";
// import RemixIcon from "react-native-remix-icon";

type CheckBoxProps = {
  type?: string;
  value?: boolean;
  setValue?: (val: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  type,
  value = false,
  setValue,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: 14,
          height: 14,
          borderRadius: type == "circle" ? 99999 : 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: value ? "green" : "white",
          borderWidth:1,
          borderColor:"#93a1b9"
        }}
        onPress={() => setValue && setValue(!value)}
      >
        {value ? (
          <Image
            source={icons.check}
            style={{
              width: 9,
              height: 7,
            }}
          ></Image>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
