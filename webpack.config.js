const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

const MonacoEditorSrc = path.join(__dirname, '..', 'src');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './out'),
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
  devServer: { contentBase: './' }
}
