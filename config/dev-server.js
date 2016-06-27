module.exports = function(options) {
  return {
    compress: true,
    contentBase: options.outPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    outputPath: options.outPath,
    port: 7357
  };
};
