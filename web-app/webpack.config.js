const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

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
	plugins: [new ProgressBarPlugin()],
};
