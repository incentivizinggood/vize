import { Meteor } from "meteor/meteor";
import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "/imports/api/graphql/schema.js";
import { resolvers } from "/imports/api/graphql/resolvers.js";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";
import "../imports/api/data/votes.js";
import "../imports/api/data/methods.js";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
});

Meteor.startup(() => {
	// code to run on server at startup
});
