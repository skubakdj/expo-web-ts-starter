
const path = require('path');

const appDirectory = path.resolve(__dirname, '../')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: ['module:metro-react-native-babel-preset'],
  },
}

const tsLoader = {
  loader: 'ts-loader',
  options: {
    compilerOptions: { declaration: false, declarationMap: false },
  }
}

module.exports = {
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      include: [
        path.resolve(appDirectory, 'node_modules/react-navigation'),
        path.resolve(appDirectory, 'node_modules/react-native'),
        path.resolve(appDirectory, 'node_modules/@expo/samples'),
        path.resolve(appDirectory, 'node_modules/@expo/vector-icons'),
        path.resolve(appDirectory, 'storybook.mobile'),
        path.resolve(appDirectory, 'src')
      ],
      use: [
        babelLoader
      ]
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      include: [
        path.resolve(appDirectory, 'src')
      ],
      use: [
        babelLoader,
        tsLoader
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}
