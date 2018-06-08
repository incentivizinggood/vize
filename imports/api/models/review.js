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
	getById(id) {
		return this.connector.findOne(id);
	}

	// Get all reviews written by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
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
	getTheAuthor(review) {
		return this.userModel.getById(review.submittedBy);
	}

	// Get all reviews written about a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
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
	getTheCompany(review) {
		return this.companyModel.getByName(review.companyName);
	}

	// Get all of the reviews.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
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
		throw new Error("Not implemented yet");
	}
}
