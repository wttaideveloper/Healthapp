const { withXcodeProject } = require('expo/config-plugins');

/**
 * Disables Mac Catalyst on the main iOS app target so fastlane/gym exports an IPA
 * for App Store builds (SUPPORTS_MACCATALYST=YES causes gym to skip IPA export).
 */
function withIosNoMacCatalyst(config) {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const configurations = project.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(configurations)) {
      const configuration = configurations[key];
      if (typeof configuration !== 'object' || !configuration.buildSettings) {
        continue;
      }

      const { buildSettings } = configuration;
      const productName = buildSettings.PRODUCT_NAME;
      const bundleId = buildSettings.PRODUCT_BUNDLE_IDENTIFIER;

      if (
        productName === 'HealthAge' ||
        productName === '"HealthAge"' ||
        bundleId === 'com.wtt.healthAge'
      ) {
        buildSettings.SUPPORTS_MACCATALYST = 'NO';
      }
    }

    return config;
  });
}

module.exports = withIosNoMacCatalyst;
