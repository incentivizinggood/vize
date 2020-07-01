import { ApolloServer, IResolvers } from "apollo-server-express";

import { typeDefs, resolvers } from "src/graphql";

/** Setup the GraphQL API endpoint. */
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers: resolvers as IResolvers,
	context: async ({ req }) => {
		return {
			// The user is provided by the PassportJS middleware.
			user: req.user,
		};
	},
	// Allow introspection queries on production.
	// This is useful for debugging.
	introspection: true,
});

export const router = apolloServer.getMiddleware({
	path: "/graphql",
	// Disable automatic adding of these middlewares.
	// They are added manually in server.ts.
	cors: false,
	bodyParserConfig: false,
});
