const path = require("path");

module.exports = function override(config, env) {
  // Add a fallback for the 'os' module
  config.resolve.fallback = {
    os: require.resolve("os-browserify/browser")
  };

  return config;
};
