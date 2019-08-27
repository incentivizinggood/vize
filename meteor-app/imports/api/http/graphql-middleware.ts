import { ApolloServer, IResolvers } from "apollo-server-express";
import { Express } from "express";

import { typeDefs, resolvers } from "imports/api/graphql";

export function applyGraphQLMiddleware(app: Express) {
	// Setup the GraphQL API endpoint.
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers: resolvers as IResolvers,
		context: async ({ req }) => {
			console.log("user = ", req.user);
			return {
				// The user is provided by the PassportJS middleware.
				user: req.user,
			};
		},
		introspection: true,
	});

	apolloServer.applyMiddleware({
		app,
		path: "/graphql",
	});

	app.use("/graphql", (req, res) => {
		if (req.method === "GET") {
			res.end();
		}
	});
}
