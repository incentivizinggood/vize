// @flow
import type { ID, Location, StarRatings } from "../misc.js";
import type { Company } from "../company";
import type { User } from "../user";
import { castToNumberIfDefined } from "../helpers/postgresql/misc.js";

import { getUserPostgresId, getUserById, getCompanyByName } from "..";

import {
	execTransactionRO,
	execTransactionRW,
} from "../../connectors/postgresql.js";

import { ReviewSchema } from "../../data/reviews.js";

const defaultPageSize = 100;

export type Review = {
	_id: ID,

	submittedBy: ID,
	companyName: string,
	companyId: ?ID,
	reviewTitle: string,
	location: Location,
	jobTitle: string,
	numberOfMonthsWorked: number,
	pros: string,
	cons: string,
	wouldRecommendToOtherJobSeekers: boolean,

	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,

	additionalComments: ?string,
	datePosted: ?Date,
	upvotes: ?number,
	downvotes: ?number,
};

function processResultToReview({ review, votes }): Review {
	return {
		_id: review.reviewid,
		submittedBy: castToNumberIfDefined(review.submittedby),
		companyName: review.companyname,
		companyId: castToNumberIfDefined(review.companyid),
		reviewTitle: review.reviewtitle,
		location: JSON.parse(review.reviewlocation),
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
		upvotes: Number(votes.upvotes),
		downvotes: Number(votes.downvotes),
	};
}

function processResultToReviews({ reviews, votes }): Review[] {
	return reviews.map(review =>
		processResultToReview({
			review,
			votes: votes[String(review.reviewid)],
		})
	);
}

// Get the review with a given id.
export async function getReviewById(id: ID): Promise<Review> {
	if (Number.isNaN(Number(id))) throw Error("not a valid review id");

	const transaction = async client => {
		let reviewResults = { rows: [] };
		let voteResults = { rows: [] };

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE reviewid=$1",
			[Number(id)]
		);

		voteResults = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[Number(id)]
		);

		return {
			review: reviewResults.rows[0],
			votes: voteResults.rows[0],
		};
	};

	return execTransactionRO(transaction).then(processResultToReview);
}

// Get all reviews written by a given user.
export async function getReviewsByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	const transaction = async client => {
		let reviewResults = { rows: [] };
		let voteResults = {};

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
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
	};

	return execTransactionRO(transaction).then(processResultToReviews);
}

// Get the user who wrote a given review.
// BUG Not quite sure how to handle this.
// getUserById expects a string, but review.submittedby
// is an integer, which introduces a type conflict.
// May need to ask Shaffer about this.
export async function getAuthorOfReview(review: Review): Promise<User> {
	return getUserById(String(review.submittedBy));
}

// Get all reviews written about a given company.
export async function getReviewsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const transaction = async client => {
		let reviewResults = { rows: [] };
		let voteResults = {};

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
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
	};

	return execTransactionRO(transaction).then(processResultToReviews);
}

// Get the company that a given review is about.
export async function getCompanyOfReview(review: Review): Promise<Company> {
	return getCompanyByName(review.companyName);
}

// Get all of the reviews.
export async function getAllReviews(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const transaction = async client => {
		let reviewResults = { rows: [] };
		let voteResults = {};

		reviewResults = await client.query(
			"SELECT * FROM reviews OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
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
	};

	return execTransactionRO(transaction).then(processResultToReviews);
}

export function isReview(obj: any): boolean {
	// ReviewSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = ReviewSchema.newContext();
	context.validate(obj, {
		extendedCustomContext: {
			isNotASubmission: true,
		},
	});

	return context.isValid();
}

export async function submitReview(
	user: User,
	company: Company,
	reviewParams: mixed
): Review {
	throw new Error("Not implemented yet");
}

export async function editReview(id: ID, reviewChanges: mixed): Review {
	throw new Error("Not implemented yet");
}

export async function deleteReview(id: ID): Review {
	throw new Error("Not implemented yet");
}
