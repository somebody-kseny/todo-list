const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => `[name].[contenthash].${ext}`;

const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
};

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: 'eval-source-map',
    devServer: {
        static: './dist',
        port: 2042,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    stats: {
        children: true,
        errorDetails: true,
    },
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '...'],
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.ts', '.tsx', '.jsx', '...'],
            }),
        ],
        alias: {
            '@components': [path.resolve(__dirname, 'src', 'components')],
            '@projectTypes': [path.resolve(__dirname, 'src', 'types')],
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            favicon: './images/favicon.ico',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include: path.resolve(__dirname, 'src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: babelOptions,
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
};
