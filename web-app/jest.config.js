module.exports = {
	transform: {
		".(ts|tsx)": "ts-jest",
	},
	testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
	roots: ["<rootDir>"],
	modulePaths: ["<rootDir>"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/mocks/fileMock.tsx",
	},
	moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
};
