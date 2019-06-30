module.exports = {
	entry: "./src/index.ts",
	target: "node",
	// Enable sourcemaps for debugging Webpack's output
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
			},
		],
	},
};
