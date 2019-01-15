import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "/imports/api/graphql/schema.graphql";
import resolvers from "/imports/api/graphql/resolvers.js";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
});
