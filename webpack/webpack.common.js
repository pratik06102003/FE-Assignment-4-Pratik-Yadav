import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);

export default {
  entry: path.resolve(DIR_NAME, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(DIR_NAME, '../src/components'),
      '@utils': path.resolve(DIR_NAME, '../src/utils'),
      '@styles': path.resolve(DIR_NAME, '../src/styles'),
      '@assets': path.resolve(DIR_NAME, '../src/assets'),
      '@hooks': path.resolve(DIR_NAME, '../src/hooks'),
      '@store': path.resolve(DIR_NAME, '../src/store'),
      '@layouts': path.resolve(DIR_NAME, '../src/layouts'),
      '@pages': path.resolve(DIR_NAME, '../src/pages'),
      '@services': path.resolve(DIR_NAME, '../src/services'),
      '@features': path.resolve(DIR_NAME, '../src/features'),
      '@app': path.resolve(DIR_NAME, '../src/app'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|jpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(woff2|ttf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  output: {
    path: path.resolve(DIR_NAME, '..', './build'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new Dotenv(),
  ],
  stats: 'errors-only',
};
