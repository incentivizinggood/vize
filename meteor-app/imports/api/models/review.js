// @flow
import type { CompanyId, ReviewId, UserId, Location, StarRatings } from ".";

export type Review = {|
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
|};
