import path from 'path';
import { fileURLToPath } from 'url';

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);

export default {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(DIR_NAME, 'public'),
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-cheap-module-source-map',
};
