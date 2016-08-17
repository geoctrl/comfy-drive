var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var includeFolders = /(app)/;

var ENV = process.env.npm_lifecycle_event;
var isDev = ENV === 'start';
var isProd = ENV === 'build';

var config = {
	entry: path.resolve(__dirname, 'app', 'main.js'),
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js(x)?$/,
				loaders: ['babel', /**'eslint-loader'**/],
				include: includeFolders
			},
			{
				test: /\.scss$/,
				loader: 'style!css!postcss-loader!sass',
				include: includeFolders
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline?removeTags=true&removingTags[]=style',
				include: includeFolders
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			__DEV__: isDev,
			__PROD__: isProd
		}),
		new htmlWebpackPlugin({
			hash: true,
			template: 'app/index.ejs',
			env: isDev && 'dev' || isProd && 'prod'
		})
	],
	postcss: function() {
		return [require('autoprefixer')];
	}
};
if (isDev) {
	config.devtool = 'source-map';
}

if (isProd) {
	config.output.path = path.resolve(__dirname, 'dist');
	config.devtool = 'source-map';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;