var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(options) {
  return [{
    include: options.srcPath,
    loaders: [
      'url?limit=' + options.inlineLimit,
      'image-webpack?bypassOnDebug&interlaced=false&optimizationLevel=7'
    ],
    test: /\.(jpg|png|svg)$/
  }, {
    include: options.srcPath,
    loader: 'babel?presets[]=es2015',
    test: /\.js$/
  }, {
    include: options.srcPath,
    loader: ExtractTextPlugin.extract('style', ['css', 'sass']),
    test: /\.scss$/
  }];
};
