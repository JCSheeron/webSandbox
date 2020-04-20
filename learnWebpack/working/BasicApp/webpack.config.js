//module.exports = {
//    mode: 'development',
//    entry: './src/app.js',
//    output: {
//        filename: 'app.bundle.js'
//    }
//}

// import plugins
var webpack = require('webpack');
var path = require('path');
// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
var htmlWebpackPlugin = require('html-webpack-plugin');
// Support to create manifest file -- maps source file with resulting
// generated output file. This allows file cleanup.
var ManifestPlugin = require('webpack-manifest-plugin');

var BUILD_DIR = path.join(__dirname, 'dist');
var APP_DIR = path.join(__dirname, 'src');
var CSS_DIR = path.join(__dirname, 'css');
var IMG_DIR = path.join(__dirname, 'img');

var config = {
    mode: 'development',
    entry: APP_DIR + '/index.js',
    output: {
        /* without lazy loading */
        // path: BUILD_DIR,
        // chuckhash for cache busting -- force browser reload on change
        // filename: 'bundle.[chunkhash].js', // can't use chunkhash with hot reload
        // filename: 'bundle.[hash].js',
        // chunkFilename: '[name].[chunkhash].js' // otherwise same as filename with different hash
        /* with lazy loading */
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js', // otherwise same as filename with different hash
        publicPath: '/' // load additional modules here
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups:{
                commons: {
                    // create a vendors chuck which contains all code from node_modules_
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: APP_DIR,
                exclude: /node_modules/,
                // without lazy loading
                // use: 'babel-loader'
                // with lazy loading, use loader in place of use so options are avail
                loader: 'babel-loader',
                options: {
                    // if false, put the babelrc stuff here
                    // if true, put this stuff in .babelrc
                    babelrc: true,
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ['syntax-dynamic-import'] // needed for lazy loading
                }
            },
            {
                test: /\.css$/,
                include: CSS_DIR,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader'] // order reversed! [0] is used after [1]
            },
            {
                test: /\.scss$/,
                include: CSS_DIR,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'] // order reversed! [0] is used after [1], and [1] is used after [2]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: IMG_DIR,
                // exclude: /node_modules/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: BUILD_DIR, // can be an array of paths [path1, path2, ...] 
        compress: true, // files being sent to browser
        port: 9000, // default is 8080
        disableHostCheck: false, // default is true, but false is more secure
        /* optional headers
        headers: {
            "Custom-header: "custom"
        }
        */
        open: false, // true: open tab in browser
        hot: true // hot reload of modules. Needs webpack.HotModuleReplacmentPlugin() above
    }
}

module.exports = config;

