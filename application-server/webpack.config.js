const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/index.ts",
	mode: "production",
	target: "node",
	// Enable sourcemaps for debugging Webpack's output
	devtool: "source-map",
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src/"),
			generated: path.resolve(__dirname, "generated/"),
		},
		extensions: [".ts", ".js"],
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: "ts-loader",
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
		new NodemonPlugin({
			nodeArgs: ["-r", "source-map-support/register"],
		}),
		new ProgressBarPlugin(),
	],
};
