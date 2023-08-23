const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'index': path.resolve(__dirname, "./src/js/index.js"),
        'main.css': path.resolve(__dirname, './src/sass/index.scss')
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
            ],
        }),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/images/*",
                    to: path.resolve(__dirname, "dist", "images", "[name].[ext]"),
                },
                {
                    from: "src/*.html",
                    to: path.resolve(__dirname, "dist", "[name].[ext]"),
                },
            ]
        })
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};
