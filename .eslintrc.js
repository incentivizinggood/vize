module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
	],
	rules: {
		// Simple functions are better than classes. We should always use them
		// if we are not using the class's lifecycle methods.
		"react/prefer-stateless-function": 1,
	},
	/*
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: ["Link"],
				specialLink: ["to"],
			},
		],
		"jsx-a11y/label-has-for": 0,
		"jsx-a11y/label-has-associated-control": [
			"error",
			{
				controlComponents: ["Field"],
				assert: "nesting",
				depth: 3,
			},
		],
	},
	*/
};
