const path = require('path');
const Dotenv = require('dotenv-webpack')

const common = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }, 
     {
       test: /\.css$/,
       exclude: /dayPicker\.css$/,
       loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new Dotenv()
  ],
};

const clientSide = {
  entry: './src/client/app/prodDist.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/public'),
    publicPath: '/'
  },
}

const serverSide = {
  entry: './src/client/app/server.js',
  target: 'node',
  output: {
    filename: 'app-server.js',
    path: path.resolve(__dirname, 'src/public'),
    libraryTarget: 'commonjs-module',
    publicPath: '/'
  }
};

module.exports = [
  Object.assign({}, common, clientSide),
  Object.assign({}, common, serverSide),
];
