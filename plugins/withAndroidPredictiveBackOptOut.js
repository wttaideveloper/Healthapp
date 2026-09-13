const { withAndroidManifest, AndroidConfig } = require('expo/config-plugins');

/**
 * Keeps hardware/gesture back routed to React Native when targeting Android 16 (API 36).
 *
 * Apps targeting API 36 get predictive back by default on Android 16+ devices, where the
 * system no longer calls Activity.onBackPressed(). React Native 0.79 (Expo SDK 53) only
 * receives back events through onBackPressed(), so without this opt-out BackHandler and
 * React Navigation stop handling back. Remove once the app is on a React Native version
 * that supports predictive back.
 */
function withAndroidPredictiveBackOptOut(config) {
  return withAndroidManifest(config, (config) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
    application.$['android:enableOnBackInvokedCallback'] = 'false';
    return config;
  });
}

module.exports = withAndroidPredictiveBackOptOut;
