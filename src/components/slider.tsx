import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface SliderProps {
    item: number;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>; 
}

const Slider : React.FC<SliderProps>= ({item,step, setStep}) => {
  return (

        <View
          key={item}
          style={{
            backgroundColor: step === item ? "#2C2E33" : "#D2DAEE",
            padding: 2,
            paddingHorizontal: step === item ? 10 : 5,
            borderRadius: 99999,
            // margin: 5,
          }}
        />

  );
};

export default Slider;

const styles = StyleSheet.create({});
