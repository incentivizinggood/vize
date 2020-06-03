const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	// Enable sourcemaps for debugging Webpack's output
	devtool: "source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src/"),
			generated: path.resolve(__dirname, "generated/"),
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto",
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
			},
		],
	},
	plugins: [
		new ProgressBarPlugin(),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],
};
