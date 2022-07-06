const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
    performance: {
        hints: false
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            parallel: 4
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    output: {
        filename: "./[name].js",
        path: path.resolve(__dirname, "bin"),
    }
});