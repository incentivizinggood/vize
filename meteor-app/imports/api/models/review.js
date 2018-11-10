// @flow
import type { ID, Location, StarRatings } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

import PgReviewFunctions from "./helpers/postgresql/reviews.js";
import type PostgreSQL from "../graphql/connectors/postgresql.js";
import { ReviewSchema } from "../data/reviews.js";

const defaultPageSize = 100;

export type Review = {
	_id: ID,

	submittedBy: ID,
	companyName: string,
	companyId: ?ID,
	reviewTitle: string,
	location: Location,
	jobTitle: string,
	numberOfMonthsWorked: number,
	pros: string,
	cons: string,
	wouldRecommendToOtherJobSeekers: boolean,

	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,

	additionalComments: ?string,
	datePosted: ?Date,
	upvotes: ?number,
	downvotes: ?number,
};

const reviewModel = (dataModel, postgreSQL: PostgreSQL) => ({
	// Get the review with a given id.
	async getReviewById(id: ID): Promise<?Review> {
		if (!Number.isNaN(Number(id)))
			return PgReviewFunctions.processReviewResults(
				await postgreSQL.executeQuery(
					PgReviewFunctions.getReviewById,
					Number(id)
				)
			);
		return undefined;
	},

	// Get all reviews written by a given user.
	async getReviewsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Review]> {
		const authorPostgresId = await dataModel.getUserPostgresId(user._id);
		return PgReviewFunctions.processReviewResults(
			await postgreSQL.executeQuery(
				PgReviewFunctions.getReviewsByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	// Get the user who wrote a given review.
	// BUG Not quite sure how to handle this.
	// getUserById expects a string, but review.submittedby
	// is an integer, which introduces a type conflict.
	// May need to ask Shaffer about this.
	async getAuthorOfReview(review: Review): Promise<User> {
		return dataModel.getUserById(String(review.submittedBy));
	},

	// Get all reviews written about a given company.
	async getReviewsByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Review]> {
		return PgReviewFunctions.processReviewResults(
			await postgreSQL.executeQuery(
				PgReviewFunctions.getReviewsForCompany,
				company.name,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	// Get the company that a given review is about.
	async getCompanyOfReview(review: Review): Promise<Company> {
		return dataModel.getCompanyByName(review.companyName);
	},

	// Get all of the reviews.
	async getAllReviews(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Review]> {
		return PgReviewFunctions.processReviewResults(
			await postgreSQL.executeQuery(
				PgReviewFunctions.getAllReviews,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	isReview(obj: any): boolean {
		// ReviewSchema
		// 	.newContext()
		// 	.validate(obj);
		const context = ReviewSchema.newContext();
		context.validate(obj, {
			extendedCustomContext: {
				isNotASubmission: true,
			},
		});

		return context.isValid();
	},

	async submitReview(
		user: User,
		company: Company,
		reviewParams: mixed
	): Review {
		throw new Error("Not implemented yet");
	},

	async editReview(id: ID, reviewChanges: mixed): Review {
		throw new Error("Not implemented yet");
	},

	async deleteReview(id: ID): Review {
		throw new Error("Not implemented yet");
	},
});

export default reviewModel;
