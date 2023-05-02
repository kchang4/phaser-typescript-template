import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import "webpack-dev-server";

const config: Configuration = {
  mode: "development",
  entry: "./src/game.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "game.bundle.js",
    publicPath: "/asset/",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, "src"),
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    /**
     * Sets up our favicon
     */
    new HtmlWebpackPlugin({ favicon: "./src/asset/favicon.ico" }),
    /**
     * Gets all the files within /src/asset into our publicly available /asset directory
     * which can then be accessed when running the app via:
     * localhost:8080/asset/*
     */
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/asset", to: "asset" }],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

export default config;
