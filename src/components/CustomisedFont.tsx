// components/Font.tsx
import React from "react";
import { Text, StyleSheet, TextStyle, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

interface FontProps {
  text: string; // The translation key
  style?: TextStyle; // Custom styles for the text
  fontFamily?: string; // Custom font family
  onPress?:()=> void
}

const Font: React.FC<FontProps> = ({ text, style, fontFamily = "Poppins",onPress }) => {
  const { t } = useTranslation();

  // Combine default styles with custom styles and font family
  const textStyle = {
    fontFamily: fontFamily,
    ...styles.defaultText,
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text  style={textStyle}>{t(text)}</Text>
      </TouchableOpacity>
    );
  }

  // If no onPress, return just the Text
  return <Text style={textStyle}>{t(text)}</Text>;
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16, // Default font size
    // color: "black", // Default text color
  },
});

export default Font;