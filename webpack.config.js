const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? miniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ]
  };

  const getPlugins = () => {
    const plugins =  [
      new HtmlWebpackPlugin({
        title: "Starter Template",
        template: 'public/index.html'
      }),
      new CleanWebpackPlugin()
    ];
    if (isProd) {
      plugins.push(new miniCssExtractPlugin({
          filename: 'main.css'
        })
      )
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    output: {
      filename: isProd ? 'index.js' : undefined
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(jpg|png|gif|ico|svg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(s[ac]ss)$/,
          use: [ ...getStyleLoaders(), 'sass-loader']
        }
      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
      port: 1337,
      overlay: true,
    }
  }
};