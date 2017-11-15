import cssnano from 'cssnano';
import pxtorem from 'postcss-pxtorem';

export default {
  entry: {
    index: './src/index.js',
    common: './src/vendor.js'
  },
  multipage: true,
  publicPath: '/',
  disableCSSModules: false,
  hash: true,
  sass: {
    sourceMap: process.env.NODE_ENV === 'development',
    includePaths: ['node_modules', 'src/style']
  },
  theme: 'src/style/theme.js',
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 16,
      propWhiteList: []
    })
  ],
  extraBabelPlugins: [
    'transform-runtime',
    'lodash',
    ['import', {libraryName: 'antd', style: true}]
  ],
  autoprefixer: {
    browsers: ['iOS >= 8', 'Android >= 4']
  },
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr']
    },
    production: {
      extraPostCSSPlugins: [cssnano(
        {safe: true},
        {preset: ['default', {discardComments: {removeAll: true}}]})]
    }
  },
  dllPlugin: {
    exclude: ['babel-runtime', 'gulp', 'eslint'],
    include: ['dva/router', 'dva/saga', 'dva/fetch', 'dva/dynamic']
  }
};
