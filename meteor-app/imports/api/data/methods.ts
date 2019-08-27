import { Meteor } from "meteor/meteor";

import * as dataModel from "imports/api/models/index";

import { PostgreSQL } from "imports/api/connectors/postgresql/index";
import PgUserFunctions from "imports/api/models/helpers/postgresql/users";

Meteor.methods({
	async "postgres.users.createUser"(user, companyPostgresId) {
		// just trying to get this to work, will
		// add security and validation later
		return PostgreSQL.executeMutation(PgUserFunctions.createUser, user);
	},

	flagAReview(reviewId, reason, explanation) {
		// gets the data from the frontend and sends an email.
		dataModel.flagAReview(reviewId, this.userId, reason, explanation);
	},
});
