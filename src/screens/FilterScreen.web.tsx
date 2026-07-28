import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

const FilterScreenWeb: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("filtersNotAvailableWeb")}</Text>
      <Text style={styles.subtitle}>{t("filtersWebDesc")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 10 },
  subtitle: { fontSize: 13, color: "#475569", lineHeight: 18 },
});

export default FilterScreenWeb;

