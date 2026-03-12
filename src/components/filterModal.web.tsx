import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  visible?: boolean;
};

const FilterModalWeb: React.FC<Props> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters are not supported on web yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  title: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
});

export default FilterModalWeb;

