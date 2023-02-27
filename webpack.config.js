const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => `[name].[contenthash].${ext}`;

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		static: './dist',
		port: 2042,
		https: true,
		historyApiFallback: true,
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'all',
	},
	stats: {
		children:true,
	},
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './index.js',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/",
		clean: true
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new CopyPlugin({
			patterns: [
			  { from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, 'dist/images') },
			],
		  }),
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				include: [ path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/yandex-messenger-widget-beta')],
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: "babel-loader",
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
			{
				test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'image',
						relativePath: true,
					}
				}],
			}
		],
	},
};
