const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname + '/src/client');
const BUILD_DIR = path.resolve(__dirname + '/src/public');

const common = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
};

const clientSide = {
  entry: APP_DIR + '/app/prodDist.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'MenuView-bundle.js',
  },
}
// style-loader!
const serverSide = {
  entry: APP_DIR + '/app/server.js',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  output: {
    filename: 'Menu-View-bundle-server.js',
    path: path.resolve(__dirname, 'src/public'),
    libraryTarget: 'commonjs-module',
    publicPath: '/'
  }
};

module.exports = [
  Object.assign({}, common, clientSide),
  Object.assign({}, common, serverSide),
];
