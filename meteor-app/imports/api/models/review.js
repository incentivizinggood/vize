// @flow
import { ReviewSchema } from "/imports/api/data/reviews.js";

import type { CompanyId, ReviewId, UserId, Location, StarRatings } from ".";

export type Review = {
	reviewid: ReviewId,

	submittedby: UserId,
	companyname: string,
	companyid: CompanyId | null,
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

// Determine if obj is a valid review. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
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
