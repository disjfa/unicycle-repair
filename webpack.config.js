const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },

  mode: "development",

  devServer: {
    host: '0.0.0.0'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: "index.html", to: "" },
      { from: "favicon.ico", to: "" },
      { from: "css", to: "css" },
      { from: "img", to: "img" },
      {
        from: "manifest.json",
        to: ""
      }
    ]),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "sw.js"
    })
  ]
};
