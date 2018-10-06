const path = require('path')

const appDirectory = path.resolve(__dirname, '../../')

const tsLoader = {
  loader: 'ts-loader',
  options: {
    compilerOptions: { declaration: false, declarationMap: false },
  },
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
    plugins: ['expo-web', 'react-native-web'],
    presets: ['module:metro-react-native-babel-preset'],
  },
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(appDirectory, 'node_modules/react-navigation'),
          path.resolve(appDirectory, 'node_modules/react-native'),
          path.resolve(appDirectory, 'node_modules/@expo/samples'),
          path.resolve(appDirectory, 'node_modules/@expo/vector-icons'),
          path.resolve(appDirectory, 'src'),
        ],
        use: [babelLoader],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(appDirectory, 'src')],
        use: [babelLoader, tsLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@expo/vector-icons': 'expo-web',
      expo: 'expo-web',
      'react-native': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    },
  },
}
