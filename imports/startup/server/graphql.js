import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "/imports/api/graphql/schema.graphql";
import { resolvers } from "/imports/api/graphql/resolvers.js";

import CommentModel from "/imports/api/models/comment.js";
import CompanyModel from "/imports/api/models/company.js";
import JobAdModel from "/imports/api/models/job-ad.js";
import ReviewModel from "/imports/api/models/review.js";
import SalaryModel from "/imports/api/models/salary.js";
import UserModel from "/imports/api/models/user.js";
import VoteModel from "/imports/api/models/vote.js";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
	context: {
		CommentModel,
		CompanyModel,
		JobAdModel,
		ReviewModel,
		SalaryModel,
		UserModel,
		VoteModel,
	},
});
