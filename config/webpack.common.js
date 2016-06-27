var loaders = require('./loaders'),
    plugins = require('./plugins');

module.exports = function(options, config) {
  return Object.assign(config, {
    module: {
      loaders: loaders(options)
    },
    output: {
      filename: 'articles-map.js',
      path: options.outPath,
      publicPath: '/'
    },
    plugins: plugins(options)
  });
};
