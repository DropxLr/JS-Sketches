const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    plugins: [

    ],
    output: {
        filename: "./[name].js",
        path: path.resolve(__dirname, "bin")
    }
});