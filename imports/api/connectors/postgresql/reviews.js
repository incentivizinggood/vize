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
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
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
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
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
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
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
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async submitReview(review) {
		// assumes review is formatted for SimplSchema conformity
		// ignores Comments and upvotes/downvotes, because this is
		// (supposed to be) a new review, which cannot have been
		// commented or voted on yet
		const client = await pool.connect();
		let newReview = { rows: [] };

		try {
			await client.query("START TRANSACTION");
			newReview = await client.query(
				"INSERT INTO reviews " +
					"(submittedBy,companyName,companyId,reviewLocation," +
					"reviewTitle,jobTitle,numMonthsWorked,pros,cons," +
					"wouldRecommend,healthAndSafety,managerRelationship," +
					"workEnvironment,benefits,overallSatisfaction,additionalComments) " +
					"VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) " +
					"RETURNING *",
				[
					review.submittedBy,
					review.companyName,
					review.companyId,
					review.location,
					review.reviewTitle,
					review.jobTitle,
					review.numberOfMonthsWorked,
					review.pros,
					review.cons,
					review.wouldRecommendToOtherJobSeekers,
					review.healthAndSafety,
					review.managerRelationship,
					review.workEnvironment,
					review.benefits,
					review.overallSatisfaction,
					review.additionalComments,
				]
			);
			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			review: newReview.rows[0],
		};
	}

	// editReview
	// deleteReview
}
