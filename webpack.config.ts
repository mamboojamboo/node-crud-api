import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
	target: 'node',
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devtool: false,
};

export default config;
