import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
  },
  performance: { hints: false },
};
