import { Meteor } from "meteor/meteor";

import * as dataModel from "imports/api/models/index";

Meteor.methods({
	flagAReview(reviewId, reason, explanation) {
		// gets the data from the frontend and sends an email.
		dataModel.flagAReview(reviewId, this.userId, reason, explanation);
	},
});
