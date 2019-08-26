const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        bundle: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: 'source-map',
    devServer: {
        port: 3000,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 10 versions"]
                            },
                            sourceMap: true,
                            plugins: () => [
                                autoprefixer,
                            ],
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            useRelativePath: true,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65,
                          },
                          optipng: {
                            enabled: true,
                          },
                          pngquant: {
                            quality: '65-90',
                            speed: 4,
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75,
                          },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
        }), 
        new HtmlWebpackPlugin({
            title: 'My awesome service',
            template: './src/index.html'
        }),
      ],
  };