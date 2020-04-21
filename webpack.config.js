const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    doc: './doc/index.js',
    'lit-transition': 'lit-transition'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
      historyApiFallback: {
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
        use: 'ts-loader',
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
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'doc/index.html',
      chunks: ['doc'],
      inject: true
    }),
  ]
};

module.exports = config