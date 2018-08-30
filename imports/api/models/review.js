// @flow
import type { ID, StarRatings, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

import PgReviewFunctions from "./helpers/postgresql/reviews.js";
import { Reviews } from "../data/reviews.js";

const defaultPageSize = 100;

export type Review = {
	_id: ID,

	submittedBy: ID,
	companyName: string,
	companyId: ?ID,
	reviewTitle: string,
	location: string,
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

export default class ReviewModel {
	connector: Object;
	userModel: UserModel;
	companyModel: CompanyModel;
	constructor(connector: Object) {
		this.connector = connector;
	}

	init({ userModel, companyModel }: AllModels) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the review with a given id.
	async getReviewById(id: ID): Review {
		if (!Number.isNaN(Number(id)))
			return PgReviewFunctions.processReviewResults(
				await this.connector.executeQuery(
					PgReviewFunctions.getReviewById,
					Number(id)
				)
			);
		return undefined;
	}

	// Get all reviews written by a given user.
	async getReviewsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		const authorPostgresId = await this.userModel.getUserPostgresId(
			user._id
		);
		return PgReviewFunctions.processReviewResults(
			await this.connector.executeQuery(
				PgReviewFunctions.getReviewsByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	}
	// Get the user who wrote a given review.
	// BUG Not quite sure how to handle this.
	// getUserById expects a string, but review.submittedby
	// is an integer, which introduces a type conflict.
	// May need to ask Shaffer about this.
	async getAuthorOfReview(review: Review): User {
		return this.userModel.getUserById(String(review.submittedBy));
	}

	// Get all reviews written about a given company.
	async getReviewsByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		return PgReviewFunctions.processReviewResults(
			await this.connector.executeQuery(
				PgReviewFunctions.getReviewsForCompany,
				company.name,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	// Get the company that a given review is about.
	async getCompanyOfReview(review: Review): Company {
		return this.companyModel.getCompanyByName(review.companyName);
	}

	// Get all of the reviews.
	async getAllReviews(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		return PgReviewFunctions.processReviewResults(
			await this.connector.executeQuery(
				PgReviewFunctions.getAllReviews,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	isReview(obj: any): boolean {
		Reviews.simpleSchema()
			.newContext()
			.validate(obj);
		const context = Reviews.simpleSchema().newContext();
		context.validate(obj, {
			extendedCustomContext: {
				isNotASubmission: true,
			},
		});

		return context.isValid();
	}

	async submitReview(
		user: User,
		company: Company,
		reviewParams: mixed
	): Review {
		throw new Error("Not implemented yet");
	}

	async editReview(id: ID, reviewChanges: mixed): Review {
		throw new Error("Not implemented yet");
	}

	async deleteReview(id: ID): Review {
		throw new Error("Not implemented yet");
	}
}
