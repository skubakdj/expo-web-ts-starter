const path = require('path');

const appDirectory = path.resolve(__dirname, '../')

// const tsLoaderConfig = {
//   test: /\.tsx?$/,
//   use: [{

//   }]
// }

const tsLoader = {
  loader: 'ts-loader',
  options: {
    compilerOptions: { declaration: false, declarationMap: false },
  }
}

// const reactDocgenTypescriptLoaderConfig = {
//   test: /\.ts(x?)$/,
//   use: [{
//     loader: 'react-docgen-typescript-loader',
//     options: {
//       propFilter: prop => !prop.parent,
//     }
//   }]
// }

const babelLoader = {
  loader: 'babel-loader',
  options: {
    // cacheDirectory: false,
    babelrc: false,

    // This aliases 'react-native' to 'react-native-web' and includes only
    // the modules needed by the app.
    plugins: [
      // 'expo-web',
      'react-native-web',
    ],
    presets: ['module:metro-react-native-babel-preset'],
  },
}

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        path.resolve(appDirectory, 'node_modules/react-navigation'),
        path.resolve(appDirectory, 'node_modules/react-native'),
        path.resolve(appDirectory, 'node_modules/@expo/samples'),
        path.resolve(appDirectory, 'node_modules/@expo/vector-icons'),
        path.resolve(appDirectory, 'build/tsc')
      ],
      use: [
        babelLoader
      ]
    }]
  },
  resolve: {
    extensions: ['.js', 'jsx'],
    alias: {
      '@storybook/react-native': '@storybook/react'
    }
  },
}