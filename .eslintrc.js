module.exports = {
	parser: "@typescript-eslint/parser",
	env: {
		node: true,
		browser: true,
	},
	plugins: ["react", "jsx-a11y", "@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
	],
	rules: {
		// Simple functions are better than classes. We should always use them
		// if we are not using the class's lifecycle methods.
		"react/prefer-stateless-function": 1,
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
		"@typescript-eslint/no-explicit-any": 0,
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
	},
};
