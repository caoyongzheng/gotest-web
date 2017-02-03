const webpack = require('webpack')
const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const production = process.env.NODE_ENV === 'production'

const publicPath = '/'

const HOST = production ? 'http://api.caoyongzheng.com' : `http://${os.networkInterfaces().en0[1].address}:3000`

const config = {
  entry: {
    vendor: ['vue', 'vue-router', 'fetch2', 'normalize.css'],
    app: ['./src/index.js'],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id]-[hash].chunk.js",
    path: path.resolve('./assets'),
    publicPath,
  },
  module: {
    preLoaders: [
      {
        test: /\.(vue|js)$/,
        exclude: [/node_modules/],
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel',
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.less$/,
        loader: 'style!css!less!postcss',
      },
      {
        test: /\.(png|gif|jpe?g|svg|ttf|eot|woff)$/,
        loader: 'url',
        query: {
          limit: 8192,
        },
      }
    ],
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['', '.js', '.vue'],
    alias: {
      fetch2: path.resolve('./src/utils/fetch2.js'),
      notify: path.resolve('./src/utils/notify.js'),
      marked2: path.resolve('./src/utils/Marked.js'),
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: production ? JSON.stringify('production') : JSON.stringify('development'),
        HOST: JSON.stringify(HOST),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      hash: true,
      template: path.resolve('./src/index.html'),
      filename: path.resolve('./assets/index.html')
    })
  ],
  debug: !production,
  postcss() {
    return [require('autoprefixer')]
  },
  vue: {
    loaders: { css: 'style!css!postcss', less: 'style!css!less!postcss' },
    postcss() {
      return [require('autoprefixer')]
    },
  },
  devServer: {
    stats: {
      colors: true,
    },
    port: 3001,
    host: '0.0.0.0',
    hot: true,
    publicPath,
    contentBase: path.resolve('./src'),
    historyApiFallback: true,
  },
}

if (!production) {
  config.devtool = '#source-map'
}

module.exports = config
