import {
	CompanyId,
	ReviewId,
	UserId,
	LocationString,
} from "imports/api/models";

export type Review = {
	reviewId: ReviewId;

	submittedBy: UserId;
	companyName: string;
	companyId: CompanyId | null;
	location: LocationString;
	title: string;
	jobTitle: string;
	numberOfMonthsWorked: number;
	pros: string;
	cons: string;
	wouldRecommend: boolean;

	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;

	additionalComments: string | null;
	dateAdded: Date;
	upvotes: number;
	downvotes: number;
};
