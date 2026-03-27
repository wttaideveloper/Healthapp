import React from "react";
import { Animated, Easing, Image, Platform, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type WebPreloaderProps = {
  visible: boolean;
};

const WebPreloader: React.FC<WebPreloaderProps> = ({ visible }) => {
  const [shouldRender, setShouldRender] = React.useState(visible);
  const opacity = React.useRef(new Animated.Value(visible ? 1 : 0)).current;

  React.useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    if (visible) {
      setShouldRender(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 420,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShouldRender(false);
      }
    });
  }, [opacity, visible]);

  if (!shouldRender || Platform.OS !== "web") {
    return null;
  }

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <LinearGradient
        colors={["#1FB2F2", "#3D89D0", "#3B73BF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.topRightBubble} />
        <View style={styles.bottomLeftBubble} />
        <Image
          source={require("../../assets/images/logo_splash.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    elevation: 99999,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: 360,
    maxWidth: "80%",
    height: 120,
    zIndex: 2,
  },
  topRightBubble: {
    position: "absolute",
    top: -90,
    right: -70,
    width: 420,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(170, 236, 255, 0.16)",
  },
  bottomLeftBubble: {
    position: "absolute",
    bottom: -160,
    left: -120,
    width: 520,
    height: 340,
    borderRadius: 170,
    backgroundColor: "rgba(160, 228, 255, 0.12)",
  },
});

export default WebPreloader;
