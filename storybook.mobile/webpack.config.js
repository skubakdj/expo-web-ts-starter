
const path = require('path');

const appDirectory = path.resolve(__dirname, '../')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: ['module:metro-react-native-babel-preset'],
  },
}

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        path.resolve(appDirectory, 'build/mobile'),
        path.resolve(appDirectory, 'node_modules/react-navigation'),
        path.resolve(appDirectory, 'node_modules/react-native'),
        path.resolve(appDirectory, 'node_modules/@expo/samples'),
        path.resolve(appDirectory, 'node_modules/@expo/vector-icons'),
        path.resolve(appDirectory, 'storybook.mobile'),
        path.resolve(appDirectory, 'build/tsc')
      ],
      use: [
        babelLoader
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
