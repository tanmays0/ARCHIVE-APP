/**
 * ARCHIVE Mobile — Babel configuration.
 * [Assignment 1] Expo preset; Reanimated plugin must be listed last.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
