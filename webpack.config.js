const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development'

  return {
    entry: ['@babel/polyfill', './src/js/app.js'],
    output: {
      filename: 'js/bundle.js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@utilities': path.resolve(__dirname, './src/js/utilities'),
        '@modules': path.resolve(__dirname, './src/js/modules'),
        '@namespaces': path.resolve(__dirname, './src/js/namespaces')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ]
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    optimization: {
      minimizer: IS_DEVELOPMENT ? [] : [
        new TerserPlugin({
          terserOptions: {
            // compress: { drop_console: true }
          }
        })
      ]
    }
  }
}
