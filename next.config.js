const withTM = require("next-transpile-modules");

module.exports = withTM({
  transpileModules: ["react-native-web"],
  webpack: config => {
    // Alias all `react-native` imports to `react-native-web`
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web"
    };

    return config;
  }
});
