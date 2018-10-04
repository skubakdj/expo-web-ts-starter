
// Modeled after example in react-native-web docs:
// https://github.com/necolas/react-native-web/blob/a6dddbb6e1f07d761990fad63b21199958566209/docs/guides/multi-platform-apps.md

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, './');

// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// 'node_module'.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'build/mobile'),
    path.resolve(appDirectory, 'node_modules/react-navigation'),
    path.resolve(appDirectory, 'node_modules/react-native-'),
    path.resolve(appDirectory, 'node_modules/@expo/samples'),
    path.resolve(appDirectory, 'node_modules/@expo/vector-icons'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      // cacheDirectory: false,
      babelrc: false,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: [
        'expo-web',
        'react-native-web',
        
        // 'transform-decorators-legacy',
        // [
        //   '@babel/plugin-transform-runtime',
        //   { helpers: false, regenerator: true },
        // ],
      ],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
    },
  },
};

// This is needed for loading css
const cssLoaderConfiguration = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: './fonts/[hash].[ext]',
      },
    },
  ],
  include: [
    path.resolve(appDirectory, './src/assets/fonts'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/@expo/vector-icons/fonts'),
    path.resolve(
      appDirectory,
      'node_modules/expo-web/node_modules/react-native-vector-icons/Fonts',
    ),
    path.resolve(
      appDirectory,
      'node_modules/expo/node_modules/@expo/vector-icons/fonts',
    ),
  ],
};

module.exports = {
  // your web-specific entry file
  entry: path.resolve(appDirectory, './build/tsc/index.web.js'),
  devtool: 'cheap-module-source-map',

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    // publicPath: '/assets/',
    path: path.resolve(appDirectory, './build/web'),
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      cssLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },

  plugins: [
    // process.env.NODE_ENV === 'production' must be true for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV === 'production' || true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.web.html'
    })
  ],

  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // '.web.js'.
    symlinks: false,
    extensions: ['.web.js', '.js'],
    alias: {
      './assets/images/expo-icon.png': './assets/images/expo-icon@2x.png',
      './assets/images/slack-icon.png': './assets/images/slack-icon@2x.png',

      '@expo/vector-icons': 'expo-web',
      expo: 'expo-web',
      'react-native': 'react-native-web',
    },
  },
};
