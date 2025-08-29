import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['mozjpeg', { quality: 70 }],
              ['pngquant', { quality: [0.65, 0.8] }],
              ['svgo'],
            ],
          },
        },
      }),
    ],
  },
  performance: { hints: false },
};
