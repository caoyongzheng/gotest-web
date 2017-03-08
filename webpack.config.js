const webpack = require('webpack')
const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const production = process.env.NODE_ENV === 'production'

const publicPath = '/'

const HOST = production ? 'https://api.caoyongzheng.com' : `http://${os.networkInterfaces().en0[1].address}:3000`

const postcssOptions = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}

const config = {
  entry: {
    vendor: ['es6-promise', 'vue', 'vue-router', 'fetch2', 'normalize.css'],
    app: ['./src/index.js'],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name]-[hash].chunk.js",
    path: path.resolve('./assets'),
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: "pre",
        exclude: [/node_modules/],
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'style-loader',
                'css-loader',
              ],
              less: [
                'style-loader',
                'css-loader',
                'less-loader',
              ],
              js: 'babel-loader',
            },
            postcss: postcssOptions.plugins,
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: postcssOptions},
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          { loader: 'postcss-loader', options: postcssOptions},
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg|ttf|eot|woff)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }
      }
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), './node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      fetch2: path.resolve('./src/utils/fetch2.js'),
      notify: path.resolve('./src/utils/notify.js'),
      marked2: path.resolve('./src/utils/marked2.js'),
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: !production,
      options: {
        context: __dirname,
      }
    }),
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
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      hash: true,
      template: path.resolve('./src/index.html'),
      filename: path.resolve('./assets/index.html')
    })
  ],
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

if (production) {
  config.devtool = '#source-map'
} else {
  config.devtool = '#cheap-module-eval-source-map'
}

module.exports = config
