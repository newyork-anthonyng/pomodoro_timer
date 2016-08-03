const webpack = require('webpack');
const path = require('path');

const PROD = (process.env.NODE_ENV === 'production');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: PROD ? 'bundle.min.js' : 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	] : []
};

module.exports = config;
