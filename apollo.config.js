module.exports = {
	client: {
		includes: ["./web-app/src/**/*.graphql"],
		service: {
			name: "vize-api",
			localSchemaFile: "./api-server/src/graphql/schema.graphql",
		},
	},
};
