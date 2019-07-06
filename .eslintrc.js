module.exports = {
	extends: ["@meteorjs/eslint-config-meteor", "prettier", "prettier/react"],
	rules: {
		"react/prop-types": false,
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: ["Link"],
				specialLink: ["to"],
			},
		],
		"jsx-a11y/label-has-for": false,
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
