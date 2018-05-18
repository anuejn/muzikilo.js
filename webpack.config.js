const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

const MonacoEditorSrc = path.join(__dirname, '..', 'src');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './lib/t'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['file?name=[name].[ext]'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /Worklet\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: { 'src/react-monaco-editor': MonacoEditorSrc }
  },
  plugins: [
    new MonacoWebpackPlugin(),
  ],
  devServer: { contentBase: './' },
  node: {
    fs: 'empty'
  }
}
