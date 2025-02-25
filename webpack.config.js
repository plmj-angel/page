const path = require('path');

module.exports = {
  entry: './res/ts/scripts.ts', // main ts file should prob rename
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname), // Root so Nacho can find it easily
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development', // not even really using this bruh
  watch: true, // watch mode is goated
};