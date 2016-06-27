var commonConfig = require('./webpack.common');

module.exports = function(options) {
  var prodOptions = Object.assign(options, {
        inlineLimit: 10000
      });

  return commonConfig(prodOptions, {
    devtool: false,
    entry: options.srcPath + '/main.prod.js'
  });
};
