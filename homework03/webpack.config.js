var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

/* Figuring out how to server up multiple pages: https://github.com/ampedandwired/html-webpack-plugin#generating-multiple-html-files */
module.exports = {
    entry: [
        __dirname + '/app/scripts/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
    plugins: [
		    new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
        new HtmlWebpackPlugin({filename: "getPerson.html", template: __dirname + "/app/getPerson.html"}),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3001,
        proxy: { '/people': 'http://localhost:3000' },
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};