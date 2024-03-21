/*global module, require, __dirname */

const path = require('path');
const pkg = require('./package.json');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const date = new Date();
const webpack = require("webpack");

const version = `${pkg.version} (${date.toISOString().substring(0, 10)})`;
const banner = `
${pkg.name} v${version}
${pkg.description}
${pkg.homepage}
 
(c) ${date.getFullYear()} ${pkg.author.name || pkg.author}

Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
the European Commission- subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.

For full license information of included components please see: components.LICENSE

WARNING: This is a compressed version of "${pkg.name}". Full source code is freely available at:
${pkg.repository.url}
`;

const assetRules = [
  {
    test: /\.html$/,
    use: ['html-loader'],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
];

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          }
        },
      },
      ...assetRules,
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_ID: JSON.stringify(`${pkg.title} v${version}`),
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    })
  ],
  devServer: {
    host: 'localhost',
    port: 9001,
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    client: {
      overlay: true,
      progress: true,
    },
  },
  performance: {
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          filename: `${pkg.name}.components.LICENSE`,
          banner: () => banner,
        },
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
};
