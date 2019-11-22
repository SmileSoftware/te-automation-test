const path = require('path');
const ROOT = path.resolve(__dirname, '../');
// const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const sourcePath = path.resolve(ROOT, './rest-proj');
const distPath = path.resolve(ROOT, './dist/rest');
const slsw = require('serverless-webpack');

const convertSjonSnippetPath = path.resolve(sourcePath, '../modules/snippets/convertJsonSnippet.js');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'development', // Hardcode
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    symlinks: true,
    modules: [path.resolve(sourcePath, './node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          '/node_modules/',
          convertSjonSnippetPath
        ]
      }
    ]
  },
  output: {
    path: distPath,
    filename: 'serverless.js'
  },
  devtool: 'source-map',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [
    // nodeExternals()
  ], // Need this to avoid error when working with Express
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [distPath], verbose: true }),
  ]
};