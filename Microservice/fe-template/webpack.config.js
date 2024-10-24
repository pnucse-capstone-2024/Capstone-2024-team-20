const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? '/page/template/' : '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: false,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
      ],
      compress: false,
      port: 3005,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/pool'],
          target: 'http://cse.ticketclove.com',
        },
        {
          context: ['/template'],
          target: 'http://cse.ticketclove.com',
        },
      ],
    },
  };
};
