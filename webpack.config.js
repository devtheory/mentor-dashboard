var path = require('path');

module.exports = {
  entry: ['./client'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    root: [
      path.resolve('./client')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: []
};
