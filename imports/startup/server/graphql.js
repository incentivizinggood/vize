import { Meteor } from "meteor/meteor";
import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "/imports/api/graphql/schema.graphql";
import resolvers from "/imports/api/graphql/resolvers.js";

// Import models.
import CommentModel from "/imports/api/models/comment.js";
import CompanyModel from "/imports/api/models/company.js";
import JobAdModel from "/imports/api/models/job-ad.js";
import ReviewModel from "/imports/api/models/review.js";
import SalaryModel from "/imports/api/models/salary.js";
import UserModel from "/imports/api/models/user.js";
import VoteModel from "/imports/api/models/vote.js";

// Import connectors
import { Comments } from "./../../api/data/comments.js";
import { Companies } from "./../../api/data/companies.js";
import { JobAds } from "./../../api/data/jobads.js";
import { Reviews } from "./../../api/data/reviews.js";
import { Salaries } from "./../../api/data/salaries.js";
// The users connector is Meteor.users which is imported above.
import { Votes } from "./../../api/data/votes.js";

// This object constructing function is used to help pass references around.
function constructModels() {
	const models = {
		commentModel: new CommentModel(Comments),
		companyModel: new CompanyModel(Companies),
		jobAdModel: new JobAdModel(JobAds),
		reviewModel: new ReviewModel(Reviews),
		salaryModel: new SalaryModel(Salaries),
		userModel: new UserModel(Meteor.users),
		voteModel: new VoteModel(Votes),
	};
	Object.values(models).forEach(model => model.init(models));
	return models;
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
	context: {
		...constructModels(),
	},
});
