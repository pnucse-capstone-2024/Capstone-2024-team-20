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
      publicPath: isProduction ? '/page/main/' : '/',
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
        name: 'main',
        remotes: {
          auth: `auth@${isProduction ? `${serverURL}/page/auth` : 'http://localhost:3001'}/remoteEntry.js`,
          deploy: `deploy@${isProduction ? `${serverURL}/page/deploy` : 'http://localhost:3002'}/remoteEntry.js`,
          myTicket: `myTicket@${isProduction ? `${serverURL}/page/myticket` : 'http://localhost:3008'}/remoteEntry.js`,
        },
        shared: ['react', 'react-dom', 'react-router-dom', 'axios'],
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
      ],
      compress: false,
      port: 3000,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/auth', '/deploy', '/ticket', '/event', '/monitor', '/template', '/default/event', '/default/ticket', '/default/seat', '/rose/event', '/pino/event', '/default/merch',
          ],
          target: serverURL,
        },
        {
          context: ['/changetest2/event',
            '/changetest2/merch',
            '/changetest2/seat',
            '/changetest2/ticket',
            '/festival/event',
            '/festival/merch',
            '/festival/seat',
            '/festival/ticket',
          ],
          target: serverURL,
        },
      ],
    },
  };
};
