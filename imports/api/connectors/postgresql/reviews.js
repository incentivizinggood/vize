import pool from "./connection-pool.js";

export default class ReviewConnector {
	static async getReviewById(id) {
		const client = await pool.connect();
		let reviewResults = { rows: [] };
		let voteResults = { rows: [] };
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewResults = await client.query(
				"SELECT * FROM reviews WHERE reviewid=$1",
				[id]
			);

			voteResults = await client.query(
				"SELECT * FROM review_vote_counts WHERE refersto=$1",
				[id]
			);
			await client.query("COMMIT");
		} finally {
			await client.release();
		}

		return {
			review: reviewResults.rows[0],
			votes: voteResults.rows[0],
		};
	}

	static async getReviewsByAuthor(id, skip, limit) {
		const client = await pool.connect();
		let reviewResults = { rows: [] };
		let voteResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewResults = await client.query(
				"SELECT * FROM reviews WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);

			for (let review of reviewResults.rows) {
				let votes = await client.query(
					"SELECT * FROM review_vote_counts WHERE refersto=$1",
					[review.reviewid]
				);

				voteResults[review.reviewid] = votes.rows[0];
			}

			await client.query("COMMIT");
		} finally {
			await client.release();
		}

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async getAllReviews(skip, limit) {
		const client = await pool.connect();
		let reviewResults = { rows: [] };
		let voteResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewResults = await client.query(
				"SELECT * FROM reviews OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			for (let review of reviewResults.rows) {
				let votes = await client.query(
					"SELECT * FROM review_vote_counts WHERE refersto=$1",
					[review.reviewid]
				);

				voteResults[review.reviewid] = votes.rows[0];
			}

			await client.query("COMMIT");
		} finally {
			client.release();
		}

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async getReviewsForCompany(name, skip, limit) {
		const client = await pool.connect();
		let reviewResults = { rows: [] };
		let voteResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewResults = await client.query(
				"SELECT * FROM reviews WHERE companyname=$1 OFFSET $2 LIMIT $3",
				[name, skip, limit]
			);

			for (let review of reviewResults.rows) {
				let votes = await client.query(
					"SELECT * FROM review_vote_counts WHERE refersto=$1",
					[review.reviewid]
				);

				voteResults[review.reviewid] = votes.rows[0];
			}

			await client.query("COMMIT");
		} finally {
			await client.release();
		}

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async submitReview(review) {}

	// editReview
	// deleteReview
}
