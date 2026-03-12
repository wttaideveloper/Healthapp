import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PrintScreenWeb: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Printing is not available on web yet.</Text>
      <Text style={styles.subtitle}>
        This feature uses native PDF/file APIs. Use iOS/Android builds, or we can implement a web
        download/print flow next.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 10 },
  subtitle: { fontSize: 13, color: "#475569", lineHeight: 18 },
});

export default PrintScreenWeb;

