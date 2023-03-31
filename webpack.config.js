const webpack = require('webpack');

module.exports = {
  entry: "./client/src/index.js",
  mode: "development",
  output: {
    path: __dirname + "/client/dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {presets: ["@babel/preset-env", "@babel/preset-react"]}
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

