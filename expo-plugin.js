module.exports = function withIAP(config) {
    return {
      ...config,
      plugins: [
        ...config.plugins || [],
        [
          "react-native-iap",
          {
            playStoreBillingKey: "your-play-store-billing-key",
            appleTeamId: "your-apple-team-id"
          }
        ]
      ]
    };
  };
  