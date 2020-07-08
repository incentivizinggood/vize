const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
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
	node: { __dirname: false },
	externals: [
		nodeExternals(),
		// This second externals is so that the app works with yarn workspaces.
		// Some of this app's deps are installed in ../node_modules instead of ./node_modules.
		nodeExternals({
			modulesDir: path.resolve(__dirname, "../node_modules"),
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
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
		new ForkTsCheckerWebpackPlugin({
			eslint: { files: "./src/**/*.{ts,tsx,js,jsx}" },
		}),
		new NodemonPlugin({
			nodeArgs: [
				"-r",
				"source-map-support/register",
				"--experimental-modules",
			],
		}),
		new ProgressBarPlugin(),
	],
};
