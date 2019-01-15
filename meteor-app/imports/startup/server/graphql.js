import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";

import typeDefs from "/imports/api/graphql/schema.graphql";
import resolvers from "/imports/api/graphql/resolvers.js";

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => ({
		user: await getUser(req.headers.authorization),
	}),
});

server.applyMiddleware({
	app: WebApp.connectHandlers,
	path: "/graphql",
});

WebApp.connectHandlers.use("/graphql", (req, res) => {
	if (req.method === "GET") {
		res.end();
	}
});
