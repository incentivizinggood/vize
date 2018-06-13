const defaultPageSize = 100;

export default class ReviewModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ userModel, companyModel }) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the review with a given id.
	getReviewById(id) {
		return this.connector.findOne(id);
	}

	// Get all reviews written by a given user.
	getReviewsByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
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
	getAuthorOfReview(review) {
		return this.userModel.getUserById(review.submittedBy);
	}

	// Get all reviews written about a given company.
	getReviewsByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
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
	getCompanyOfReview(review) {
		return this.companyModel.getCompanyByName(review.companyName);
	}

	// Get all of the reviews.
	getAllReviews(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	isReview(obj) {
		return this.connector.schema
			.newContext()
			.validate(obj)
			.isValid();
	}

	submitReview(user, company, reviewParams) {
		throw new Error("Not implemented yet");
	}

	editReview(id, reviewChanges) {
		throw new Error("Not implemented yet");
	}

	deleteReview(id) {
		throw new Error("Not implemented yet");
	}
}
