import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import devConfig from './webpack.dev.js';
import prodConfig from './webpack.prod.js';

export default (envVars) => {
  const { env } = envVars;
  const envConfig = env === 'prod' ? prodConfig : devConfig;
  const config = merge(commonConfig, envConfig);
  return config;
};
