const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push("xlsx"); // Ensure Metro recognizes .xlsx files

  // pdf-lib 1.17.1 ships its own tslib 1.14.1. That tslib's package.json "exports" maps the
  // "import" condition to ./modules/index.js, a Node-ESM wrapper that does
  // `import tslib from "../tslib.js"; const { __extends, ... } = tslib;`. tslib.js sets
  // __esModule but has no `default` export, so under Metro (package exports enabled) the
  // default import is undefined and the web bundle crashes at startup with
  // "Cannot destructure property '__extends' of '_tslib.default' as it is undefined".
  // Resolve tslib for pdf-lib without package exports so Metro uses its "module" field
  // (tslib.es6.js, which has the named exports pdf-lib imports). Scoped to pdf-lib only.
  const defaultResolveRequest = config.resolver.resolveRequest;
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    const resolve = defaultResolveRequest ?? context.resolveRequest;
    if (moduleName === "tslib" && /[\\/]pdf-lib[\\/]/.test(context.originModulePath)) {
      return resolve({ ...context, unstable_enablePackageExports: false }, moduleName, platform);
    }
    return resolve(context, moduleName, platform);
  };

  return config;
})();
