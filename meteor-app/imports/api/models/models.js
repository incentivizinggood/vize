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
type AllConnectors = {
	commentConnector: Object,
	companyConnector: Object,
	jobAdConnector: Object,
	reviewConnector: Object,
	salaryConnector: Object,
	userConnector: Mongo.Collection,
	voteConnector: Object,
};

function createConnectors(): AllConnectors {
	const connectors = {
		commentConnector: PostgreSQL,
		companyConnector: PostgreSQL,
		jobAdConnector: PostgreSQL,
		reviewConnector: PostgreSQL,
		salaryConnector: PostgreSQL,
		userConnector: Meteor.users,
		voteConnector: PostgreSQL,
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
