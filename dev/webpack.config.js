const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "index.js"), // The entry point for our application.
    },
    output: {
        path: path.resolve(__dirname, "..", "dist"), // Output directory for the bundled files.
        filename: "[name].js", // Name of the bundled JavaScript file.
        clean: true, // Clean the "dist" directory before each build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Process .scss files with "sass-loader", "css-loader", "postcss-loader", and "MiniCssExtractPlugin".
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files for production build.
                    "css-loader",
                ],
            },
            {
                test: /\.scss$/, // Process .scss files with "sass-loader", "css-loader", "postcss-loader", and "MiniCssExtractPlugin".
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files for production build.
                    "css-loader", // Translates CSS into CommonJS.
                    "postcss-loader", // PostCSS is used for autoprefixing CSS for better cross-browser support.
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/, // Process .js files with "babel-loader" excluding "node_modules".
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CleanWebpackPlugin() // Clean the "dist" directory before each build to remove old files.
    ],
};