const NodemonPlugin = require("nodemon-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	mode: "production",
	target: "node",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto",
			},
		],
	},
	plugins: [new NodemonPlugin(), new ProgressBarPlugin()],
};
