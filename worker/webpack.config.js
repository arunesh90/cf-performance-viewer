const dotenv  = require('dotenv')
const path    = require('path')
const webpack = require('webpack')

dotenv.config()

module.exports = {
  target: 'webworker',
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'faunadb_key',
      'lighthouse_endpoint',
      'lighthouse_code'
    ])
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ],
  },
}
