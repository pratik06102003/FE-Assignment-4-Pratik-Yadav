import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export default {
  mode: 'development',
  devServer: {
    hot: true,
  },
  devtool: 'eval-source-map',

  plugins: [new ReactRefreshPlugin()],
};
