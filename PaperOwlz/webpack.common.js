const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        bundle: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs|frag|vert)$/,
                loader: 'shader-loader',
                options: {
                    glsl: {
                        chunkPath: path.resolve("/glsl/chunks")
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|libs)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: "pixi.js"
        })
    ]
};
