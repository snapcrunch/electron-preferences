'use strict'

const path = require( 'path' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )

module.exports = {
	mode: 'production',
	entry: './src/app/index.js',
	watchOptions: {
		ignored: /node_modules/,
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'app.js',
	},
	resolve: {
		extensions: [
			'.js', '.scss',
		],
		modules: [
			path.resolve( __dirname, 'src' ),
			path.resolve( __dirname, 'scss' ),
			path.resolve( __dirname, 'node_modules' ),
		],
		alias: {
		},
	},
	plugins: [
		new CopyWebpackPlugin( {
			patterns: [
				{ from: 'assets' },
			],
		} ),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'cache-loader',
					},
					{
						loader: 'babel-loader',
						options: {
							presets: [ 'env', 'react' ],
							plugins: [ 'transform-object-rest-spread', 'transform-class-properties' ],
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
}
