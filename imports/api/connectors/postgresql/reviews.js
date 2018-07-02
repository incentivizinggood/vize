import { pool } from "./connection-pool.js";

export default class ReviewConnector {
	static async getReviewById(id) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");

		const reviewResults = await client.query(
			"SELECT * FROM reviews WHERE reviewid=$1",
			[id]
		);

		const voteResults = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[id]
		);
		await client.query("COMMIT");
		client.release();

		return {
			review: reviewResults.rows[0],
			votes: voteResults.rows[0],
		};
	}

	static async getReviewsByAuthor(id, skip, limit) {}

	static async getAllReviews(skip, limit) {}

	static async getReviewsForCompany(name, skip, limit) {}

	static async submitReview(review) {}

	// editReview
	// deleteReview
}
