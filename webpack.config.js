const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development'

  return {
    entry: './src/js/app.js',
    output: {
      filename: 'js/bundle.js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@modules': path.resolve(__dirname, './src/js/modules'),
        '@namespaces': path.resolve(__dirname, './src/js/namespaces'),
        '@components': path.resolve(__dirname, './src/js/components')
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
            compress: { drop_console: true }
          }
        })
      ]
    }
  }
}
