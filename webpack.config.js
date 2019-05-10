const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src")
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, "src/index.html")
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  }
};
