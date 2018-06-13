// @flow
import type { Mongo } from "meteor/mongo";
import type { StarRatings, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

const defaultPageSize = 100;

export type Review = {
	_id: string,
	submittedBy: string,
	companyName: string,
	companyId: ?string,
	reviewTitle: string,
	locations: [string],
	jobTitle: string,
	numberOfMonthsWorked: number,
	pros: string,
	cons: string,
	wouldRecommendToOtherJobSeekers: boolean,
	starRatings: StarRatings,
	additionalComments: string,
	datePosted: Date,
	upvotes: number,
	downvotes: number,
};

export default class ReviewModel {
	connector: Mongo.Collection;
	userModel: UserModel;
	companyModel: CompanyModel;
	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ userModel, companyModel }: AllModels) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the review with a given id.
	getReviewById(id: string): Review {
		return this.connector.findOne(id);
	}

	// Get all reviews written by a given user.
	getReviewsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		const cursor = this.connector.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the user who wrote a given review.
	getAuthorOfReview(review: Review): User {
		return this.userModel.getUserById(review.submittedBy);
	}

	// Get all reviews written about a given company.
	getReviewsByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		const cursor = this.connector.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company that a given review is about.
	getCompanyOfReview(review: Review): Company {
		return this.companyModel.getCompanyByName(review.companyName);
	}

	// Get all of the reviews.
	getAllReviews(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Review] {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	isReview(obj: any): boolean {
		return this.connector.schema
			.newContext()
			.validate(obj)
			.isValid();
	}

	submitReview(user: User, company: Company, reviewParams: any) {
		throw new Error("Not implemented yet");
	}

	editReview(id: string, reviewChanges: any) {
		throw new Error("Not implemented yet");
	}

	deleteReview(id: string) {
		throw new Error("Not implemented yet");
	}
}
