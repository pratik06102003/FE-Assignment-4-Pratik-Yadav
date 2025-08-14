import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin"

export default {
  mode: 'development',
  devServer: {
    hot: true,
  },
  devtool: 'cheap-module-source-map',

  plugins: [
    new ReactRefreshPlugin()
  ]
}