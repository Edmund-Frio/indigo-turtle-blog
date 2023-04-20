const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'development',
  target: 'node',
  entry: './src/server.ts',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'main',
    libraryTarget: 'commonjs',
  },
};

module.exports = config;
