// @flow
import type CommentModel from "./comment.js";
import type CompanyModel from "./company.js";
import type JobAdModel from "./job-ad.js";
import type ReviewModel from "./review.js";
import type SalaryModel from "./salary.js";
import type UserModel from "./user.js";
import type VoteModel from "./vote.js";

export type ID = string;

export type Location = {
	city: string,
	address: string,
	industrialHub: string,
};

export type StarRatings = {
	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,
};

export type AllModels = {
	commentModel: CommentModel,
	companyModel: CompanyModel,
	jobAdModel: JobAdModel,
	reviewModel: ReviewModel,
	salaryModel: SalaryModel,
	userModel: UserModel,
	voteModel: VoteModel,
};
