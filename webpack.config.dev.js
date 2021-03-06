const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Source files
const SRC_DIR = path.join(__dirname, 'src');
const STATICS_DIR = path.join(__dirname, 'statics');
const TESTS_DIR = `${SRC_DIR}/tests/`;

// Build paths
const BUILD_FILES_PATH = path.join(__dirname, 'build');
const BUILD_PUBLIC_PATH = '/';

module.exports = {

    // source mapping tool
    devtool: 'inline-source-map',

    // application entry point
    entry: `${SRC_DIR}/index.js`,

    // output configuration
    output: {
        path: BUILD_FILES_PATH,
        publicPath: BUILD_PUBLIC_PATH,
        filename: 'bundle.js',
    },

    plugins: [
        // extract css in separate file
        new ExtractTextPlugin('styles.css'),
    ],

    module: {
        // loaders
        rules: [
            // javascript
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [SRC_DIR],
                exclude: [STATICS_DIR, TESTS_DIR],
            },
            // styles
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                    ],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            // images
            {
                test: /\.(ico|jpe?g|png|gif)$/,
                use: 'url-loader?limit=1000000&mimetype=image',
            },
            // fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader',
            },
            // svg
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=image/svg+xml',
            },
        ],
    },
};
