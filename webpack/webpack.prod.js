import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    minimizer: [
      new TerserJSPlugin(),
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
