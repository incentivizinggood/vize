module.exports = {
	parser: "@typescript-eslint/parser",
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
	},
};
