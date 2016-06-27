var commonConfig = require('./webpack.common'),
    devServer = require('./dev-server');

module.exports = function(options) {
  var devOptions = Object.assign(options, {
        inlineLimit: 1
      });

  return commonConfig(devOptions, {
    debug: true,
    devServer: devServer(devOptions),
    devtool: 'cheap-module-source-map',
    entry: options.srcPath + '/main.js'
  });
};
