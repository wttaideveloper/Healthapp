import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Font from "./CustomisedFont";
import { icons } from "./images";

interface DeleteMessageModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={icons.deleteModal}
              style={{ width: 225, height: 150 }}
            ></Image>
            <Font text="Item Deleted"></Font>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};




const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});
