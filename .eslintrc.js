module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"@meteorjs/eslint-config-meteor",
		"prettier",
		"prettier/react",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"react/prop-types": 0,
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
};
