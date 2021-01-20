const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TesterWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks:{
			chunks: 'all'
		}
	}
	if(isProd){
		config.minimizer = [
				new OptimizeCssAssetsPlugin(),
				new TesterWebpackPlugin()
		]
	}
	return config
}

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath:  path.resolve(__dirname, 'dist')
			}
		}, 'css-loader?url=false'
	]
	if(extra){
		loaders.push(extra)
	}
	return loaders
}

const filename = ext => isDev ? `${ext==='css' ? 'style': `[name]`}.[hash].${ext}` : `[name].[hash].${ext}`

const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
			plugins: [
				'@babel/plugin-proposal-class-properties'
			]
		}
	}]
	if(isDev){
		loaders.push({
			loader: 'eslint-loader'
		})
	}
	return loaders
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		//'@babel/polyfill',
		main: ['@babel/polyfill','./index.js']
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@styles': path.resolve(__dirname, 'src/styles')
		}
	},
	optimization: optimization(),
	devtool: isDev ? 'source-map' : false,

	devServer: {
		contentBase: './dist',
		hot: isDev
	},

	plugins: [
			new HTMLWebpackPlugin({
				template: 'index.html',
				minify: {
					collapseWhitespace: isProd
				}
			}),
			new CleanWebpackPlugin(),
			new CopyWebpackPlugin({
					patterns: [
						{
							from: path.resolve(__dirname, 'src/assets/favicon'),
							to: path.resolve(__dirname, 'dist/assets/favicon')
						},
						{
							from: path.resolve(__dirname, 'src/assets/images'),
							to: path.resolve(__dirname, 'dist/assets/images')
						},
						{
							from: path.resolve(__dirname, 'src/assets/fonts'),
							to: path.resolve(__dirname, 'dist/assets/fonts')
						}
					]
			}),
			new MiniCssExtractPlugin({
				filename: filename('css')
			})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},

			{
				test: /\.sass$/,
				use: cssLoaders('sass-loader')
			},

			{
				test: /\.(png|jpg|gif|svg$)/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: filename('[ext]'),
							outputPath: '../dist/assets',
							publicPath: 'assets',
						},
					}]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				},
				{
					loader: "eslint-loader"
				}
				]
			}
		]
	}
}