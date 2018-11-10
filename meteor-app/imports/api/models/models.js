// @flow
import { Meteor } from "meteor/meteor";

// Import models.
import CommentModel from "/imports/api/models/comment.js";
import CompanyModel from "/imports/api/models/company.js";
import JobAdModel from "/imports/api/models/job-ad.js";
import ReviewModel from "/imports/api/models/review.js";
import SalaryModel from "/imports/api/models/salary.js";
import UserModel from "/imports/api/models/user.js";
import VoteModel from "/imports/api/models/vote.js";

// PostgreSQL connector
import PostgreSQL from "../graphql/connectors/postgresql.js";

import type { AllModels } from "./common.js";

/*
	We are stuck using Mongo.Collection and Meteor.users until we
	are able to migrate to a more long-term solution for the
	user accounts. Everything else goes through PostgreSQL,
	and the various cross-dependencies have to be accounted for
	on other levels of the stack.
*/

// This object constructing function is used to help pass references around.
export default function constructModels(): AllModels {
	const models: AllModels = {
		commentModel: new CommentModel(PostgreSQL),
		companyModel: new CompanyModel(PostgreSQL),
		jobAdModel: new JobAdModel(PostgreSQL),
		reviewModel: new ReviewModel(PostgreSQL),
		salaryModel: new SalaryModel(PostgreSQL),
		userModel: new UserModel(Meteor.users),
		voteModel: new VoteModel(PostgreSQL),
	};
	Object.values(models).forEach(model => model.init(models));
	return models;
}
