const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'eval',
 
  resolve: {
    alias: {
      transition: path.resolve(__dirname,'transition.js')
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ]
};

module.exports = config