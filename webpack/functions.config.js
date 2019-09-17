const path = require('path');

const rootDir = path.join(__dirname, '..');
const functionsDir = path.join(rootDir, 'functions');


module.exports = {
  entry: path.join(functionsDir, 'reason-fetch/handler.bs.js'),
  mode: 'production',
  resolve: {
    extensions: [
      '.js',
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(functionsDir, 'dist'),
    filename: 'reason-fetch.js',
  },
  target: 'node',
};
