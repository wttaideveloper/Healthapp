import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { SetStateAction } from "react";
import Font from "./CustomisedFont";
import Switch from "./Switch";

type InputProps = {
  title?: string;
  placeHolder: string;
  value?: string;
  switchValue?: string;
  onChangeText?: (text: string) => void;
  toggleSwitch?: boolean;
  setValue?: React.Dispatch<SetStateAction<string>>;
  setSwitchValue?: React.Dispatch<SetStateAction<string>>;
  style?: React.CSSProperties;
  title1?: string;
  title2?: string;
  switchColor?: [string, string, ...string[]];
  type?: string;
};

const CustomInput: React.FC<InputProps> = ({
  title = "",
  placeHolder = "",
  setValue,
  value,
  onChangeText,
  toggleSwitch = false,
  style = {},
  title1,
  title2,
  switchColor = ["#0F9AD1", "#2E589D"],
  setSwitchValue,
  switchValue,
  type = "default"
}) => {
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          gap: 10,
        }}
      >
        {toggleSwitch && (
          <Switch
            switchColor={switchColor}
            title1={title1}
            title2={title2}
            setValue={setSwitchValue}
            value={switchValue}
            style={{width:"60%"}}
          ></Switch>
        )}
        <Font style={{ fontSize: 16, fontWeight: 400 }} text={title}></Font>
        <View
          style={[
            { borderWidth: 1, borderColor: "#dfe9f0", borderRadius: 99999 },
            style,
          ]}
        >
          <TextInput
            value={value}
            placeholder={placeHolder}
            placeholderTextColor={"#b2b2b2"}
            keyboardType={type} // default | numeric | phone-pad
            // keyboardType="phone-pad" // default | numeric
            onChangeText={onChangeText} // Now correctly typed
            style={[{ padding: 10 }]}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
