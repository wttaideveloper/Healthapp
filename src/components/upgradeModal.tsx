import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Font from "./CustomisedFont";
import { icons } from "./images";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./Button";
import {
  getRevenueCatTargetProductIds,
  getSubscriptionSummaries,
  initIAP,
} from "./utils/purchase";
// import { useNavigation } from "@react-navigation/native";

interface upgradeModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  navigationTo:()=> void;
}



const UpgradeModal: React.FC<upgradeModalProps> = ({
  visible,
  onClose,
  children,
  navigationTo
}) => {
  const [planPrice, setPlanPrice] = React.useState("$49/year");
  const [planName, setPlanName] = React.useState("Annual Pro subscription");

  React.useEffect(() => {
    if (!visible || Platform.OS === "web") {
      return;
    }

    const loadPlanSummary = async () => {
      try {
        await initIAP();
        const summaries = await getSubscriptionSummaries();
        const targetProductIds = getRevenueCatTargetProductIds();
        const preferred =
          summaries.find((item) => targetProductIds.includes(item.productIdentifier)) ??
          summaries.find((item) => item.packageType.toUpperCase() === "ANNUAL") ??
          summaries[0];

        if (!preferred) {
          return;
        }

        if (preferred.priceString) {
          setPlanPrice(preferred.priceString);
        }
        if (preferred.title || preferred.description) {
          setPlanName(preferred.title || preferred.description);
        }
      } catch {
        // Keep fallback plan text.
      }
    };

    loadPlanSummary().catch(() => undefined);
  }, [visible]);

  // const navigation = useNavigation();
  return (
    <Modal transparent visible={visible} animationType="slide">
      {/* <TouchableWithoutFeedback onPress={onClose}> */}
        <View style={styles.modalOverlay}>
            <LinearGradient
                    start={{ x:1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={["#FFFFFF", "#F6F4EE", "#F5EAC4"]}
                    style={[
                      {
                        // Border thickness
                        borderRadius: 14,
                        flexDirection: "row",
                        // flex: 1,
                        borderWidth: 1,
                        borderColor: "#EAECF1",
                        // justifyContent: "center",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: 10,
                        marginVertical: 10,
                      },
                    ]}
                  >
          <View style={styles.modalContainer}>
            <TouchableOpacity
            onPress={onClose}
             style={{position:"absolute",top:10,right:10 }}>
              <Image
                source={icons.closeDark}
                style={{ width: 20, height: 20 ,}}
                ></Image>
                </TouchableOpacity>
            <Image
              source={icons.proVersion}
              style={{ width: 105, height: 100 }}
              ></Image>
            <Font
              text="thisOneForPro"
              style={{ color: "#274273", fontSize: 20, fontWeight: 500 ,textAlign:"center",marginVertical:10}}
              ></Font>
              {/* <View style={{flexDirection:"row",flex:1}}> */}
          <View style={{borderWidth:1,borderColor:"#E3DECC",width:"100%",marginVertical:10}}></View>
              {/* </View> */}
              <Font
              text="proMembersDesc"
              style={{ color: "#274273", fontSize: 14, fontWeight: 400 ,textAlign:"center",marginVertical:10}}
              ></Font>
              <Text
                style={{ color: "#274273", fontSize: 40, fontWeight: "600", textAlign: "center", marginVertical: 10 }}
              >
                {planPrice}
              </Text>
              <Text
                style={{ color: "#274273", fontSize: 16, fontWeight: "600", textAlign: "center", marginBottom: 10 }}
              >
                {planName}
              </Text>
          <View style={{flexDirection:"row"}}>
              <Button title="upgrade" onPress={navigationTo} style={{padding:10}} ></Button>
          </View>
          </View>
              </LinearGradient>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default UpgradeModal;

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
    // backgroundColor: "white",
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
