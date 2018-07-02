import { pool } from "./connection-pool.js";

export default class ReviewConnector {
	static async getReviewById(id) {}

	static async getReviewsByAuthor(id, skip, limit) {}

	static async getAllReviews(skip, limit) {}

	static async getReviewsForCompany(name, skip, limit) {}

	static async submitReview(review) {}

	// editReview
	// deleteReview
}
