import {
	CompanyId,
	ReviewId,
	UserId,
	LocationString,
} from "imports/api/models";

export type Review = {
	reviewid: ReviewId;

	submittedby: UserId;
	companyname: string;
	companyid: CompanyId | null;
	reviewlocation: LocationString;
	reviewtitle: string;
	jobtitle: string;
	nummonthsworked: number;
	pros: string;
	cons: string;
	wouldrecommend: boolean;

	healthandsafety: number;
	managerrelationship: number;
	workenvironment: number;
	benefits: number;
	overallsatisfaction: number;

	additionalcomments: string | null;
	dateadded: Date;
	upvotes: number;
	downvotes: number;
};
