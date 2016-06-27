var options = {
      env: process.env.NODE_ENV,
      isProd: process.env.NODE_ENV === 'production',
      outPath: __dirname + '/dist',
      srcPath: __dirname + '/src'
    };

if (options.isProd) {
  module.exports = require('./config/webpack.prod')(options);
} else {
  module.exports = require('./config/webpack.dev')(options);
}
