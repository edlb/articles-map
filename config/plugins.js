var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = function(options) {
  if (options.isProd) {
    return [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        mangle: true
      })
    ];
  }
  return [
    new ExtractTextPlugin('[name]-[contenthash].css', { allChunks: true }),
    new HtmlPlugin({
      template: options.srcPath + '/index.html'
    })
  ];
};
