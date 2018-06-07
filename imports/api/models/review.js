import { Reviews } from "../data/reviews.js";
import UserModel from "./user.js";
import CompanyModel from "./company.js";

const defaultPageSize = 100;

const ReviewModel = {
	// Get the review with a given id.
	getById(id) {
		return Reviews.findOne(id);
	},

	// Get all reviews written by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Reviews.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the user who wrote a given review.
	getTheAuthor(review) {
		return UserModel.getById(review.submittedBy);
	},

	// Get all reviews written about a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Reviews.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the company that a given review is about.
	getTheCompany(review) {
		return CompanyModel.getByName(review.companyName);
	},

	// Get all of the reviews.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Reviews.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},
};

export default ReviewModel;
