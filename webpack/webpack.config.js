// import { merge } from 'webpack-merge';
// import commonConfig from './webpack.common.js';
// import devConfig from './webpack.dev.js';
// import prodConfig from './webpack.prod.js';

// export default (envVars) => {
//   const { env } = envVars;
//   const envConfig = env === 'prod' ? prodConfig : devConfig;
//   const config = merge(commonConfig, envConfig);
//   return config;
// };

import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AntdScssThemePlugin from 'antd-scss-theme-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false }, // use true if you want CSS Modules
          },
          'sass-loader',
        ],
      },
      // Ant Design LESS
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
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

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'), // ✅ FIXED
    }),
    new Dotenv(),
    new AntdScssThemePlugin(path.resolve(__dirname, '../src/theme.scss')), // adjust if needed
  ],
  stats: 'errors-only',
};
