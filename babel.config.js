module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'react-native-vision-camera',
        {
          cameraPermissionText: '$(PRODUCT_NAME) needs access to your Camera.',
        },
      ],
    ],
  };
};
