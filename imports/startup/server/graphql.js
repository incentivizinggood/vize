import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "/imports/api/graphql/schema.graphql";
import { resolvers } from "/imports/api/graphql/resolvers.js";
import UserModel from "/imports/api/models/user.js";
import ReviewModel from "/imports/api/models/review.js";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
	context: { UserModel, ReviewModel },
});
