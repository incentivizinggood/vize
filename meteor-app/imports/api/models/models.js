// @flow
import { Meteor } from "meteor/meteor";

// Import models.
import commentModel from "./comment.js";
import companyModel from "./company.js";
import jobAdModel from "./job-ad.js";
import reviewModel from "./review.js";
import salaryModel from "./salary.js";
import userModel from "./user.js";
import voteModel from "./vote.js";

// PostgreSQL connector
import PostgreSQL from "../graphql/connectors/postgresql.js";

/*
	We are stuck using Mongo.Collection and Meteor.users until we
	are able to migrate to a more long-term solution for the
	user accounts. Everything else goes through PostgreSQL,
	and the various cross-dependencies have to be accounted for
	on other levels of the stack.
*/

// This object constructing function is used to help pass references around.
export default function constructModels() {
	const model = {
		...commentModel(this, PostgreSQL),
		...companyModel(this, PostgreSQL),
		...jobAdModel(this, PostgreSQL),
		...reviewModel(this, PostgreSQL),
		...salaryModel(this, PostgreSQL),
		...userModel(this, PostgreSQL, Meteor.users),
		...voteModel(this, PostgreSQL),
	};
	return model;
}
