const esNodeModules = /react-native-web(?!.*node_modules)/;
const cjsNodeModules = /node_modules\/(?!react-native-web(?!.*node_modules))/;

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    // Alias all `react-native` imports to `react-native-web`
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web"
    };

    defaultLoaders.babel.options.plugins = ["react-native-web"];

    // Compile packages using ES modules
    config.resolve.symlinks = false;
    let manageExternal = external => (context, request, callback) => {
      if (typeof external !== "function") {
        return external;
      } else if (esNodeModules.test(request)) {
        return callback();
      } else {
        return external(context, request, callback);
      }
    };
    config.externals = config.externals
      ? config.externals.map(manageExternal)
      : undefined;
    config.module.rules.push({
      test: /\.js$/,
      loader: defaultLoaders.babel,
      include: [esNodeModules]
    });

    return config;
  },
  webpackDevMiddleware: config => {
    // Ignore packages using CJS modules
    config.watchOptions.ignored = [
      config.watchOptions.ignored[0],
      cjsNodeModules
    ];
    return config;
  }
};
