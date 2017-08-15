const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src'),
  node_modules: path.join(__dirname, 'node_modules')
};

const commonConfig = {
  entry: {
    'app-shell': path.join(PATHS.src, 'client/js/app-shell.js')
  },
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          PATHS.src
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      PATHS.src,
      PATHS.node_modules
    ]
  },
  output: {
    filename: 'public/js/[name].js',
    chunkFilename: 'public/js/[name].chunk.js',
    path: PATHS.build
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // Specify the common bundle's name.
    })
    //,
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(PATHS.src, 'client/assets'),
    //     to: path.join(PATHS.build, 'public')
    //   }
    // ])
  ]
};

const productionConfig = {
  output: {
    filename: 'public/js/[name].[chunkhash].js',
    path: PATHS.build
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ManifestPlugin()
  ]
};

const developmentConfig = {};

module.exports = () => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
