"use strict";

const Path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractSASS = new ExtractTextPlugin("styles/bundle.[hash].css");
const port = 3001;

module.exports = (options) => {
  const dest = Path.join(__dirname, "dist");

  let webpackConfig = {
    devtool: "eval-cheap-source-map",
    entry: ["./src/scripts/index.js"],
    mode: "development",
    output: {
      path: dest,
      filename: "bundle.[hash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: false,
      }),
    ],
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
  };

  webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

  webpackConfig.module.rules.push({
    test: /\.s?css$/i,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: { includePaths: [Path.join(__dirname, "src/styles")] },
        },
      },
    ],
  });

  webpackConfig.devServer = {
    static: Path.resolve(__dirname, "dist"),
    compress: true,
    port,
  };

  return webpackConfig;
};
