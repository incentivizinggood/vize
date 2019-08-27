import { Meteor } from "meteor/meteor";

import * as dataModel from "imports/api/models/index";

import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

Meteor.methods({
	async "postgres.users.createUser"(user) {
		return {
			user: await simpleQuery1<unknown>(
				sql`INSERT INTO users (userMongoId,role) VALUES (${user._id}, ${user.role}) RETURNING *`
			),
		};
	},

	flagAReview(reviewId, reason, explanation) {
		// gets the data from the frontend and sends an email.
		dataModel.flagAReview(reviewId, this.userId, reason, explanation);
	},
});
