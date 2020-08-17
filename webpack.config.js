const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  optimization: {    // 1. 这个配置必须
    minimize: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    // port: 10406,
    inline: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:4430/',
        pathRewrite: {
          '^/api/': '',
        },
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@View': path.resolve(__dirname, 'src/View'),
      '@sequelize': path.resolve(__dirname, 'client/sequelize'),
      "@utils": path.resolve(__dirname, 'src/utils')
    },
  },
}
