'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {

    entry: './app/core/bootstrap.ts',

    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {

        preloaders: [
            {
                test: /\.ts$/,
                loader: 'tslint'
            }
        ],

        loaders: [
            {
                test: /\.html$/,
                loader: 'raw',
            },
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file'
            },
        ]
    },

    postcss: function() {
        return [autoprefixer];
    },

    node: {
        fs: "empty"
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Nightwing - An Application Framework',
            filename: './index.html',
            template: './app/index.html',
            inject: false
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        }),
        new ngAnnotatePlugin({
            add: true
        })
    ]
};
