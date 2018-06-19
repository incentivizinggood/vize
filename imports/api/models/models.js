// @flow
import { Meteor } from "meteor/meteor";
import type { Mongo } from "meteor/mongo";

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

import type { AllModels } from "./common.js";

type AllConnectors = {
	commentConnector: Mongo.Collection,
	companyConnector: Mongo.Collection,
	jobAdConnector: Mongo.Collection,
	reviewConnector: Mongo.Collection,
	salaryConnector: Mongo.Collection,
	userConnector: Mongo.Collection,
	voteConnector: Mongo.Collection,
};

function createConnectors(): AllConnectors {
	const connectors = {
		commentConnector: Comments,
		companyConnector: Companies,
		jobAdConnector: JobAds,
		reviewConnector: Reviews,
		salaryConnector: Salaries,
		userConnector: Meteor.users,
		voteConnector: Votes,
	};
	return connectors;
}

// This object constructing function is used to help pass references around.
export default function constructModels(
	connectors: AllConnectors = createConnectors()
): AllModels {
	const models: AllModels = {
		commentModel: new CommentModel(connectors.commentConnector),
		companyModel: new CompanyModel(connectors.companyConnector),
		jobAdModel: new JobAdModel(connectors.jobAdConnector),
		reviewModel: new ReviewModel(connectors.reviewConnector),
		salaryModel: new SalaryModel(connectors.salaryConnector),
		userModel: new UserModel(connectors.userConnector),
		voteModel: new VoteModel(connectors.voteConnector),
	};
	Object.values(models).forEach(model => model.init(models));
	return models;
}
