/*
    ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
         {from:'./app/img',to:'img'},
         {from:'./app/fonts',to:'fonts'}
     ]);

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: "file-loader?name=img/[name].[ext]" }
        ]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file-loader'
      },
       {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig
  ],
  devServer: {
    contentBase: '/dist',
    historyApiFallback: true,
    port: 3000
  }
}
