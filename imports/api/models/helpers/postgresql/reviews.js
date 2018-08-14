import castToNumberIfDefined from "./misc.js";

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
			const votes = await client.query(
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
			// dummy values to prevent exception case
			votes: {
				refersto:
					newReview.rows[0] === undefined
						? -1
						: newReview.rows[0].reviewid,
				upvotes: 0,
				downvotes: 0,
			},
		};
	}

	static processReviewResults(reviewResults) {
		/*
			Translate from model function results
			to Mongo SimplSchema format

			Expects object with fields:
			- review or reviews: singular review or array of reviews
			- votes: singular or array depending on whether we get review or reviews
		*/
		if (reviewResults.review !== undefined) {
			const review = reviewResults.review;
			return {
				_id: Number(review.reviewid),
				submittedBy: castToNumberIfDefined(review.submittedby),
				companyName: review.companyname,
				companyId: castToNumberIfDefined(review.companyid),
				reviewTitle: review.reviewtitle,
				location: review.reviewlocation,
				jobTitle: review.jobtitle,
				numberOfMonthsWorked: Number(review.nummonthsworked),
				pros: review.pros,
				cons: review.cons,
				wouldRecommendToOtherJobSeekers: review.wouldrecommend,
				healthAndSafety: Number(review.healthandsafety),
				managerRelationship: Number(review.managerrelationship),
				workEnvironment: Number(review.workenvironment),
				benefits: Number(review.benefits),
				overallSatisfaction: Number(review.overallsatisfaction),
				additionalComments: review.additionalcomments,
				datePosted: review.dateadded,
				upvotes: Number(reviewResults.votes.upvotes),
				downvotes: Number(reviewResults.votes.downvotes),
			};
		} else if (reviewResults.reviews !== undefined) {
			return reviewResults.reviews.map(review => {
				return {
					_id: Number(review.reviewid),
					submittedBy: castToNumberIfDefined(review.submittedby),
					companyName: review.companyname,
					companyId: castToNumberIfDefined(review.companyid),
					reviewTitle: review.reviewtitle,
					location: review.reviewlocation,
					jobTitle: review.jobtitle,
					numberOfMonthsWorked: Number(review.nummonthsworked),
					pros: review.pros,
					cons: review.cons,
					wouldRecommendToOtherJobSeekers: review.wouldrecommend,
					healthAndSafety: Number(review.healthandsafety),
					managerRelationship: Number(review.managerrelationship),
					workEnvironment: Number(review.workenvironment),
					benefits: Number(review.benefits),
					overallSatisfaction: Number(review.overallsatisfaction),
					additionalComments: review.additionalcomments,
					datePosted: review.dateadded,
					upvotes: Number(
						reviewResults.votes[String(review.reviewid)].upvotes
					),
					downvotes: Number(
						reviewResults.votes[String(review.reviewid)].downvotes
					),
				};
			});
		}
		return undefined;
	}

	// editReview
	// deleteReview
}
