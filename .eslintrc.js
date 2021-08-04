module.exports = {
	parser: "@typescript-eslint/parser",
	env: {
		node: true,
		browser: true,
	},
	plugins: ["react", "jsx-a11y", "@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
	],
	rules: {
		// Simple functions are better than classes. We should always use them
		// if we are not using the class's lifecycle methods.
		"react/prefer-stateless-function": "warn",
		// It is quite hard to make unique ids in React, so instead we put the
		// control inside of its label to connect them.
		"jsx-a11y/label-has-associated-control": [
			"error",
			{
				controlComponents: ["Field"],
				assert: "nesting",
				depth: 3,
			},
		],
		// Although it should be avoided, There are some places where we need
		// to use the any type to silence type checking.
		"@typescript-eslint/no-explicit-any": "off",
		// It is good to have explicit return types on declarations, but in a
		// lot of cases the type of the function is already well constrained.
		// We do not want extra typing noise in those cases.
		"@typescript-eslint/explicit-function-return-type": [
			"warn",
			{
				allowExpressions: true,
				allowTypedFunctionExpressions: true,
				allowHigherOrderFunctions: true,
			},
		],
		// In many places a callbacks do not use all arguments, but it is nice
		// to bind them and with express.js it is required for error handlers.
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ args: "all", argsIgnorePattern: "^_" },
		],
		"@typescript-eslint/ban-ts-comment": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
		linkComponents: [{ name: "Link", linkAttribute: "to" }],
	},
};
