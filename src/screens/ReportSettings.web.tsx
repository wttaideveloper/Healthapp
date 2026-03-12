import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReportSettingsWeb: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report settings are not available on web yet.</Text>
      <Text style={styles.subtitle}>
        This screen currently depends on native PDF/file modules. We can implement a web-friendly
        version next.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 10 },
  subtitle: { fontSize: 13, color: "#475569", lineHeight: 18 },
});

export default ReportSettingsWeb;

