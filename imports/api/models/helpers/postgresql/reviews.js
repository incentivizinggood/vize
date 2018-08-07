export default class PgReviewFunctions {
	static async getReviewById(client, id) {
		let reviewResults = { rows: [] };
		let voteResults = { rows: [] };

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE reviewid=$1",
			[id]
		);

		voteResults = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[id]
		);

		return {
			review: reviewResults.rows[0],
			votes: voteResults.rows[0],
		};
	}

	static async getReviewsByAuthor(client, id, skip, limit) {
		let reviewResults = { rows: [] };
		let voteResults = {};

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

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async getAllReviews(client, skip, limit) {
		let reviewResults = { rows: [] };
		let voteResults = {};

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

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async getReviewsForCompany(client, name, skip, limit) {
		let reviewResults = { rows: [] };
		let voteResults = {};

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

		return {
			reviews: reviewResults.rows,
			votes: voteResults,
		};
	}

	static async submitReview(client, review) {
		// assumes review is formatted for SimplSchema conformity
		// ignores Comments and upvotes/downvotes, because this is
		// (supposed to be) a new review, which cannot have been
		// commented or voted on yet

		let newReview = { rows: [] };

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

		return {
			review: newReview.rows[0],
		};
	}

	// editReview
	// deleteReview
}
