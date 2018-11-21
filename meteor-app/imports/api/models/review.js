// @flow
import { ReviewSchema } from "/imports/api/data/reviews.js";

import type { ID, Location, StarRatings } from ".";

export type Review = {
	reviewid: number,

	submittedby: number,
	companyname: string,
	companyid: number | null,
	reviewlocation: string,
	reviewtitle: string,
	jobtitle: string,
	nummonthsworked: number,
	pros: string,
	cons: string,
	wouldrecommend: boolean,

	healthandsafety: number,
	managerrelationship: number,
	workenvironment: number,
	benefits: number,
	overallsatisfaction: number,

	additionalcomments: string | null,
	dateadded: Date,
	upvotes: number,
	downvotes: number,
};

export function isReview(obj: any): boolean {
	// ReviewSchema
	// 	.newContext()
	// 	.validate(obj);
	// const context = ReviewSchema.newContext();
	// context.validate(obj, {
	//	extendedCustomContext: {
	//		isNotASubmission: true,
	//	},
	// });
	//
	// return context.isValid();

	return true;
}
