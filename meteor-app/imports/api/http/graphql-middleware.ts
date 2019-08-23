import { ApolloServer, IResolvers } from "apollo-server-express";
import { Express } from "express";

import { getUser } from "meteor/apollo";

import { typeDefs, resolvers } from "imports/api/graphql";

export function applyGraphQLMiddleware(app: Express) {
	// Setup the GraphQL API endpoint.
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers: resolvers as IResolvers,
		context: async ({ req }) => ({
			// Get the user using a token in the headers. Will be changed when
			// switching away from Meteor's authorization framework.
			user: await getUser(req.headers.authorization),
		}),
		// Allow introspection queries and enable the playground on production
		// builds so that we can more easily learn about and test the API.
		introspection: true,
		playground: true,
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
