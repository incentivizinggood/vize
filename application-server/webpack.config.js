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
		],
	},
};
