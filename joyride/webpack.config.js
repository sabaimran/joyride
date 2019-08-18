//webpack.config.js
var path = require('path');
var webpack = require('webpack');
require('dotenv').config();

module.exports = {
    mode: 'development',
    entry: './client/index.jsx',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: ['babel-loader','ts-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name:'images/[hash]-[name].ext'
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                PORT: process.env.PORT
            }
        })
    ]
}
