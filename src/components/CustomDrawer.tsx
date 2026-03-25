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
import { useSubscription } from "../context/subScriptionContext";
import { useAuth } from "../context/authContext";
import { clearCachedSubscriptionStatus } from "./utils/purchase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEBUG_SUB_OVERRIDE_KEY = "debug_subscription_override";

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { isSubscribed } = useSubscription();
  const { signOut, user } = useAuth();
  const hasPremium = isSubscribed;

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
          pro: !hasPremium,
        },
        {
          name: "PrintReport",
          iconKey: "print",
          navigateLocation: "PrintScreen",
          screen: "Report",
          pro: !hasPremium,
        },
        {
          name: "reportSetting",
          iconKey: "report",
          navigateLocation: "ReportSettings",
          pro: !hasPremium,
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
                          ? hasPremium
                            ? props.navigation.navigate(ee.navigateLocation, {
                                screen: ee.screen,
                              })
                            : setShowModal(true)
                          : ee.navigateLocation == "ReportSettings"
                          ? hasPremium
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
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            // Clear auth + premium caches, then reset to the auth stack.
            await signOut();
            await clearCachedSubscriptionStatus();
            await AsyncStorage.removeItem(DEBUG_SUB_OVERRIDE_KEY);

            // Drawer navigator is nested under RootStack; reset parent so we land on SignIn.
            props.navigation.closeDrawer();
            const parent = props.navigation.getParent();
            (parent as any)?.reset?.({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ borderRadius: 10, padding: 4 }}>
          <View>
            <Text style={{ color: "white", marginBottom: 6 }}>
              {user ? `Signed in as ${user.email}` : "Not signed in"}
            </Text>
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
          </View>
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
          props.navigation.navigate("Main", { screen: "Purchase" });
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
  logoutButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 4,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
