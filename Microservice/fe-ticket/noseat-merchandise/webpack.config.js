const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  const serverURL = 'http://cse.ticketclove.com';

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? 'play/' : '/',
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
      new ModuleFederationPlugin({
        name: 'ticket',
        filename: 'remoteEntry.js',
        remotes: {
          auth: `auth@${serverURL}/page/auth/remoteEntry.js`,
        },
        shared: ['react', 'react-dom', 'axios'],
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
        {
          directory: path.join(__dirname, 'public'),
        },
      ],
      compress: false,
      port: 3004,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/auth', '/default/auth', '/default/merch', '/default/kakao', '/default/event', '/pino/event', '/pino/seat', '/rose/seat', '/rose/event',
            '/test60/merch', '/test60/event', '/test60/ticket', '/test60/seat',
          ],
          target: serverURL,
        },
      ],
    },
  };
};
