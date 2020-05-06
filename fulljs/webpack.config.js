// import plugins
var path = require('path');
var webpack = require('webpack');
// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Support to create manifest file -- maps source file with resulting
// generated output file. This allows file cleanup.
var ManifestPlugin = require('webpack-manifest-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');
// var SASS_DIR = path.join(__dirname, 'sass');
// var CSS_DIR = path.join(BUILD_DIR, 'css');
const IMG_DIR = path.join(BUILD_DIR, 'img');
const HBS_VIEWS_DIR = path.join(__dirname, 'views');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials');
const HBS_DIST_PARTIALS_DIR = path.join(BUILD_DIR, 'partials');
const HBS_HELPERS_DIR = path.join(HBS_VIEWS_DIR, 'helpers');

// webpack config object
var config = {
  mode: 'development',
  entry: { bpsMain: APP_DIR + '/index.js' },
  /* OLD -- From class
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
*/
  output: {
    /* without lazy loading */
    // path: BUILD_DIR,
    // chuckhash for cache busting -- force browser reload on change
    // filename: 'bundle.[chunkhash].js', // can't use chunkhash with hot reload
    // filename: 'bundle.[hash].js',
    // chunkFilename: '[name].[chunkhash].js' // otherwise same as filename with different hash
    /* with lazy loading */
    path: BUILD_DIR,
    filename: 'bpsMain.[hash].js',
    chunkFilename: '[name].[chunkhash].js', // otherwise same as filename with different hash
    publicPath: '/' // load additional modules here
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // create a vendors chuck which contains all code from node_modules_
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generic Title',
      // template to use
      template: path.join(HBS_VIEWS_DIR, 'index.hbs'),
      // output file name
      filename: path.join(HBS_PARTIALS_DIR, 'jcs1.hbs')
    }),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
          // babel.config.json will be used by default
          // if false, put the babelrc stuff here
          // if true, put this stuff in .babelrc
          // babelrc: true,
          // presets: ["@babel/preset-env", "@babel/preset-react"],
          //plugins: ['syntax-dynamic-import'] // needed for lazy loading
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [HBS_HELPERS_DIR],
          // can't get partials to resolve in paths other than from the
          // partials directory. dist/partials does not seem to work.
          // Not sure how to use the partialDirs option.
          partialDirs: [HBS_PARTIALS_DIR, HBS_DIST_PARTIALS_DIR],
          debug: false
        }
      },
      /* Using node-sass-middleware instead to manage sass and css
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
            */
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
};

module.exports = config;
