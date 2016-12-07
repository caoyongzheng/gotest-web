const webpack = require('webpack')
const path = require('path')
const production = process.env.NODE_ENV === 'production'

const publicPath = '/assets/'

const config = {
  entry: {
    vendor: ['vue', 'vue-router'],
    app: ['./src/index.js'],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
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
        test: /\.(css)$/,
        loader: 'style!css!postcss',
      },
    ],
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['', '.js', '.vue'],
    alias: {
      fetch2: path.resolve('./src/utils/fetch2.js'),
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
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  debug: !production,
  postcss() {
    return [require('autoprefixer')]
  },
  vue: {
    loaders: { css: 'style!css!postcss' },
    postcss() {
      return [require('autoprefixer')]
    },
  },
  devServer: {
    stats: {
      colors: true,
    },
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
