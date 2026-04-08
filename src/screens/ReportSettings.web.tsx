import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getSettings, saveSettings } from "../components/utils/reportService";

type SettingsShape = {
  image?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
};

const ReportSettingsWeb: React.FC = () => {
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = (await getSettings()) as SettingsShape | null;
      setLogoUri(data?.image ?? null);
      setPhoneNumber(data?.phoneNumber ?? "");
      setAddress(data?.address ?? "");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings])
  );

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const onSave = async () => {
    try {
      setIsSaving(true);
      await saveSettings(logoUri, phoneNumber.trim(), address.trim());
      if (Platform.OS === "web" && typeof window !== "undefined") {
        window.alert("Report settings saved.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const clearLogo = () => {
    setLogoUri(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Report Settings</Text>
        <Text style={styles.subtitle}>
          Update the logo and contact details that appear in exported reports.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logo</Text>

          {logoUri ? (
            <View style={styles.logoBlock}>
              <Image source={{ uri: logoUri }} style={styles.logoPreview} />
              <TouchableOpacity onPress={clearLogo} style={styles.ghostButton}>
                <Text style={styles.ghostButtonText}>Remove logo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={pickLogo} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload logo</Text>
            </TouchableOpacity>
          )}

          {logoUri ? (
            <TouchableOpacity onPress={pickLogo} style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Replace logo</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            placeholderTextColor="#8b909b"
            style={[styles.input, styles.multilineInput]}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            placeholderTextColor="#8b909b"
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={onSave} disabled={isSaving} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{isSaving ? "Saving..." : "Save settings"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  card: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dbe6f3",
    padding: 20,
  },
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  uploadButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#b8c8df",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#f7fbff",
  },
  uploadButtonText: {
    color: "#21406d",
    fontWeight: "600",
  },
  logoBlock: {
    alignItems: "flex-start",
    gap: 10,
  },
  logoPreview: {
    width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d8deea",
    backgroundColor: "#f8fbfe",
  },
  secondaryAction: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  secondaryActionText: {
    color: "#1663d6",
    fontSize: 13,
    fontWeight: "600",
  },
  ghostButton: {
    borderWidth: 1,
    borderColor: "#ecc3c3",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff7f7",
  },
  ghostButtonText: {
    color: "#b42318",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8deea",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#f9fbfd",
    fontSize: 14,
  },
  multilineInput: {
    minHeight: 86,
    textAlignVertical: "top",
  },
  primaryButton: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: "#1e62d0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default ReportSettingsWeb;
