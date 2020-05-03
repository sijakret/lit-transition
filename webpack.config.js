const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const {publicPath} = require('./doc/config');
const config = {
  devtool: 'source-map',
  entry: {
    doc: './doc/index.js',
    'lit-transition': 'lit-transition'
  },
  output: {
    path: path.resolve(__dirname, 'dist-doc'),
    publicPath,
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: {
      index: publicPath,
      disableDotRule: true
    },
  },
  resolve: {
    alias: {
      'lit-transition': path.resolve(__dirname,'src')
    },
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(__dirname, 'tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: './doc/loaders/svg-loader'
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'doc/index.html',
      chunks: ['doc'],
      inject: true
    }),
    new CopyPlugin([
      {
        from: 'doc/assets',
        to: 'assets'
      },
    ]),
    new FaviconsWebpackPlugin(
      path.join(__dirname, 'doc/assets/favicon.svg')
    )
  ]
};

module.exports = config