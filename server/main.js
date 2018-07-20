import { Meteor } from "meteor/meteor";

// Initialize GraphQL
import "../imports/startup/server/graphql.js";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";
import "../imports/api/data/votes.js";
import "../imports/api/data/methods.js";

// Initialize PostgreSQL publications
import "./postgresql-publications.js";

Meteor.startup(() => {
	// code to run on server at startup
});
