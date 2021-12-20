module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@theme': './src/theme',
          '@api': './src/api',
          '@components': './src/components',
          '@helpers': './src/helpers',
          '@screens': './src/screens',
          '@router': './src/router',
          '@store': './src/store',
          '@translation': './src/translation',
          '@utils': './src/utils',
          '@assets': './src/assets'
        }
      }
    ]
  ]
}
