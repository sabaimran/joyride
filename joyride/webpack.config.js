//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['babel-preset-es2015', 'react']
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }]  
    }
}
