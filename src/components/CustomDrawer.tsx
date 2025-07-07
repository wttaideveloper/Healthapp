import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { icons } from "./images";
import Font from "./CustomisedFont";
import UpgradeModal from "./upgradeModal";
import { verifySubscriptionStatus } from "./utils/purchase";
import { useSubscription } from "../context/subScriptionContext";

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const { isSubscribed, autoRenewing, refreshSubscription } = useSubscription();

  React.useEffect(() => {
    SubscriptionCheck();
  });
  const SubscriptionCheck = () => {
    if (isSubscribed && autoRenewing) {
      setIsValid(true);
    } else if (isSubscribed && !autoRenewing) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // setIsValid(true);
  };

  const [showModal, setShowModal] = React.useState(false);

  const drawerContent = [
    {
      name: "aboutTheApp",
      iconKey: "book",
      navigateLocation: "AboutAppScreen",
    },

    {
      name: "reports",
      iconKey: "report",
      // navigateLocation: "profile",
      subTabs: [
        {
          name: "PrintQuestion",
          iconKey: "print",
          navigateLocation: "PrintScreen",
          screen: "Questionnaire",
          pro: !isValid,
        },
        {
          name: "PrintReport",
          iconKey: "print",
          navigateLocation: "PrintScreen",
          screen: "Report",
          pro: !isValid,
        },
        {
          name: "reportSetting",
          iconKey: "report",
          navigateLocation: "ReportSettings",
          pro: !isValid,
        },
      ],
    },
    {
      name: "changeLanguage",
      iconKey: "changeLanguage",
      navigateLocation: "ChangeLanguage",
    },
  ];
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.drawerHeader}>
        {/* Profile and App Logo */}

        <Image
          source={icons.drawerBg}
          style={{ width: "100%", height: "100%" }}
        ></Image>
        <Image source={icons.drawerLogo} style={styles.overlayImage} />
      </View>

      {/* Drawer Options */}
      <View style={{ padding: 10 }}>
        {drawerContent.map((e, i) => (
          <React.Fragment key={i}>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                e?.name === "reports"
                  ? null
                  : props.navigation.navigate(e.navigateLocation);
              }}
            >
              <Image
                source={icons[e.iconKey]}
                style={{ width: 20, height: 20 }}
              ></Image>
              <Font text={e.name} style={styles.drawerText}></Font>
            </TouchableOpacity>
            <View style={styles.separator} />
            {e?.subTabs
              ? e?.subTabs.map((ee, index) => (
                  <View style={{ width: "90%", marginLeft: 30 }} key={index}>
                    <TouchableOpacity
                      style={[
                        styles.drawerItem,
                        { ...{ justifyContent: "space-between" } },
                      ]}
                      onPress={() =>
                        ee.navigateLocation == "PrintScreen"
                          ? isValid
                            ? props.navigation.navigate(ee.navigateLocation, {
                                screen: ee.screen,
                              })
                            : setShowModal(true)
                          : ee.navigateLocation == "ReportSettings"
                          ? isValid
                            ? props.navigation.navigate(ee.navigateLocation)
                            : setShowModal(true)
                          : props.navigation.navigate(ee.navigateLocation)
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={icons[ee?.iconKey]}
                          style={{ width: 20, height: 20 }}
                        ></Image>
                        <Font text={ee.name} style={styles.drawerText}></Font>
                      </View>
                      {ee.pro && (
                        <Image
                          source={icons.proSymbol}
                          style={{
                            width: 48,
                            height: 22,
                            justifyContent: "flex-end",
                          }}
                        ></Image>
                      )}
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* <View style={styles.separator} /> */}
                    {/* <View style={{width:"50%"}}></View> */}
                  </View>
                ))
              : null}
            {/* <View style={styles.separator} /> */}
          </React.Fragment>
        ))}
      </View>

      {/* You can add more items here */}

      {/* Footer Section */}
      <View style={styles.drawerFooter}>
        <View style={{ borderRadius: 10, padding: 4 }}>
          {/* Logout Button */}
          <TouchableOpacity
            // style={styles.footerItem}
            onPress={() => {
              // Implement logout functionality here
              // console.log("Logging out...");
            }}
          >
            <Text style={{ color: "white" }}>Contact Information</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image source={icons.phone} style={{ width: 15, height: 14 }} /> */}
              <Text style={{ color: "white" }}> : 269-471-6159</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image source={icons.mail} style={{ width: 15, height: 14 }} /> */}
              <Text style={{ color: "white" }}>
                {" "}
                : communitychange@andrews.edu
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: 30,
            marginVertical: 20,
          }}
        >
          {/* <Image
            source={require("../assets/icons/footerIcon.png")}
            style={{ width: 20, height: 30 }}
          /> */}
        </View>
      </View>
      <UpgradeModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        navigationTo={() => {
          setShowModal(false);
          props.navigation.navigate("Purchase");
        }}
      ></UpgradeModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 185,
    // paddingTop: 50,
    // flex:1,
    // paddingBottom: 20,
    // backgroundColor: "#14517d",
  },
  overlayImage: {
    position: "absolute",
    bottom: 30, // Adjust positioning from bottom
    left: 30, // Adjust positioning from left
    width: 127, // Adjust size as needed
    height: 40,
    resizeMode: "contain",
  },
  profilePic: {
    borderRadius: 40,
    marginBottom: 10,
  },
  logo: {},
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  drawerText: {
    color: "black",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 10,
  },
  drawerFooter: {
    marginTop: "auto", // Push the footer to the bottom
    padding: 10,
    // backgroundColor: "#14517d", // Set a background color for the footer
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  footerText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#ff6347", // Red color for the footer text
  },
});
