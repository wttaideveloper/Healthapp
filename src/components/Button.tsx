import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Font from "./CustomisedFont";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  style?: React.CSSProperties;
  onPress?: () => void;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  style,
  onPress,
  type,
  disabled = false,
}) => {
  const textStyle = {
    ...styles.defaultText,
    ...style,
  };
  if(type=="cancel"){
    return (
      <TouchableOpacity onPress={onPress} style={{flex:1}}>
        <LinearGradient
          colors={ ["#F4F6F9", "#F4F6F9"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            {
              // Border thickness
              borderRadius: 999999,
              flexDirection: "row",
              // flex: 1,
              borderWidth:1,
              borderColor: "#EAECF1",
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <Font
            text={title}
            style={{ color: "#262F40" , fontWeight: 500 ,fontSize:16 }}
          ></Font>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  else if (type=="delete"){
    return (
      <TouchableOpacity onPress={onPress} style={{flex:1}}>
        <LinearGradient
          colors={ ["#FF8E8D", "#FE4C4A"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            {
              // Border thickness
              borderRadius: 999999,
              flexDirection: "row",
              // flex: 1,
              borderWidth:1,
              borderColor: "#EAECF1",
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <Font
            text={title}
            style={{ color: "#FFFFFF" , fontWeight: 500 ,fontSize:16 }}
          ></Font>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  else if (type=="remove"){
    <TouchableOpacity 
    onPress={onPress} 
    disabled={disabled}
    activeOpacity={0.7}
  >
    <LinearGradient
      colors={disabled ? ["#e0e0e0", "#e0e0e0"] : ["#0F9AD1", "#2D579D"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        {
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          minWidth: 120,
          borderWidth: disabled ? 1 : 0,
          borderColor: disabled ? "#C8C9CC" : "transparent",
        },
        style,
      ]}
    >
      <Text style={[
        {
          color: disabled ? "#888" : "white",
          fontWeight: "600",
          fontSize: 16,
        },
        textStyle,
      ]}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
  }
    else if (type=="intro"){
    return (
<TouchableOpacity
  onPress={onPress}
  // disabled={disabled}
  activeOpacity={0.8}
  style={[
    {
      borderRadius: 999,
      overflow: "hidden",
      opacity: disabled ? 0.6 : 1,
    },
    style, // Custom style passed as prop
  ]}
>
  <LinearGradient
    colors={disabled ? ["#E0E0E0", "#E0E0E0"] : ["#0F9AD1", "#2D579D"]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 999,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: disabled ? "#C8C9CC" : "white",
    }}
  >
    <Font
      text={title}
      style={{
        color: disabled ? "#7A7A7A" : "white",
        fontWeight: "500",
        fontSize: 16,
      }}
    />
  </LinearGradient>
</TouchableOpacity>

    );
  }
  else{
    return (
      <TouchableOpacity onPress={onPress} style={{flex:1}}>
        <LinearGradient
          colors={disabled ? ["white", "white"] : ["#0F9AD1", "#2D579D"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            {
              // Border thickness
              borderRadius: 999999,
              flexDirection: "row",
              // flex: 1,
              borderWidth:1,
              borderColor: disabled ? "#C8C9CC" : "white",
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <Font
           onPress={onPress}
            text={title}
            style={{ color: disabled ? "black" : "white", fontWeight: "medium" }}
          ></Font>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16, // Default font size
    color: "black", // Default text color
  },
});
