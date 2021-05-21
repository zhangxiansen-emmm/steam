const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin');

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
      '/media/': {
        target: 'http://127.0.0.1:3000/',
        pathRewrite: {
          "^/media/": ""
        },
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
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
      "@Components": path.resolve(__dirname, 'src/Components'),
      '@sequelize': path.resolve(__dirname, 'client/sequelize'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@redux": path.resolve(__dirname, 'src/redux'),
      "@http": path.resolve(__dirname, './Ajax.js'),
      '@getAudio': path.resolve(__dirname, './getAudio.js')
    },
  },
}
