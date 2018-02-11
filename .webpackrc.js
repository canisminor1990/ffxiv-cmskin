import cssnano from 'cssnano';
import pxtorem from 'postcss-pxtorem';

export default {
	entry              : {
		index : './src/index.js',
		vendor: [
			'classnames/bind',
			'dva',
			'dva/router',
			'dva/dynamic',
			'dva-loading',
			'path',
			'react',
			'react-dom',
			'g2',
			'g2-react',
			'qrcode.react'
		]
	},
	outputPath         : './docs',
	publicPath         : '/',
	disableCSSModules  : false,
	hash               : true,
	ignoreMomentLocale : true,
	sass               : {
		includePaths: ['node_modules', 'src/style']
	},
	theme              : 'src/style/theme.js',
	html               : {
		'template': './src/index.ejs'
	},
	define             : {
		'$dirname': __dirname,
		'$isDev'  : process.env.NODE_ENV === 'development'
	},
	extraPostCSSPlugins: [
		pxtorem({
			        rootValue: 16
		        })
	],
	extraBabelPlugins  : [
		'lodash',
		['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}]
	],
	browserslist       : ['iOS >= 8', 'Android >= 4'],
	env                : {
		development: {
			extraBabelPlugins: [
				'dva-hmr'
			]
		},
		production : {
			commons            : [
				{
					name    : 'vendor',
					filename: 'vendor.[chunkhash].js'
				}
			],
			extraPostCSSPlugins: [
				cssnano(
					{safe: true},
					{preset: ['default', {discardComments: {removeAll: true}}]})
			]
		}
	}
};



