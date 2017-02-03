const gulp = require('gulp')
const gutil = require("gulp-util")
const del = require("del")
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const os = require('os')
const open = require("open")

const webpackConfig = require('./webpack.config.js')

gulp.task('clean:assets', function (cb) {
  del.sync('./assets/**')
  cb()
})



gulp.task('webpack-dev-server', function(callback) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  const host = webpackConfig.devServer.host
  const port = webpackConfig.devServer.port
  const url = `http://${os.networkInterfaces().en0[1].address}:${port}`
  webpackConfig.entry.app.push(
    `webpack-dev-server/client?${url}`,
    'webpack/hot/only-dev-server'
  )
  const compiler = webpack(webpackConfig)
  new WebpackDevServer(compiler, webpackConfig.devServer).listen(port, host, function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', url)
    open(url)
    callback()
  })
})

gulp.task("webpack:build", function(callback) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
    }))
    callback()
  })
})

gulp.task("compile", ["clean:lib", "compile:css", "compile:js"])
gulp.task('webpack', ['clean:assets', 'webpack:build'])
gulp.task("default", ["webpack-dev-server"])
