module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-remove-console', 
      ['@babel/plugin-transform-class-static-block', { "loose": true }],
      ['@babel/plugin-transform-class-properties', { "loose": true }],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ],
    overrides: [{
      test: './src',
      plugins: ['./scripts/wm-babel.transform.plugin.js']
    }]
  };
};
