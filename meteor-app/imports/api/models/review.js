// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { ReviewSchema } from "/imports/api/data/reviews.js";

import { castToNumberIfDefined } from "/imports/api/models/helpers/postgresql/misc.js";
import type {
	ID,
	Location,
	StarRatings,
	Company,
	User,
} from "/imports/api/models";
import {
	getUserPostgresId,
	getUserById,
	getCompanyByName,
} from "/imports/api/models";

const defaultPageSize = 100;

export type Review = {
	reviewid: number,

	submittedby: number,
	companyname: string,
	companyid: number | null,
	reviewlocation: string,
	reviewtitle: string,
	jobtitle: string,
	nummonthsworked: number,
	pros: string,
	cons: string,
	wouldrecommend: boolean,

	healthandsafety: number,
	managerrelationship: number,
	workenvironment: number,
	benefits: number,
	overallsatisfaction: number,

	additionalcomments: string | null,
	dateadded: Date,
	upvotes: number,
	downvotes: number,
};

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
			...reviewResults.rows[0],
			upvotes: voteResults.rows[0].upvotes,
			downvotes: voteResults.rows[0].downvotes,
		};
	};

	return execTransactionRO(transaction);
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

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
		);

		let finalResults = [];
		for (let review of reviewResults.rows) {
			let votes = await client.query(
				"SELECT * FROM review_vote_counts WHERE refersto=$1",
				[review.reviewid]
			);

			finalResults.push({
				...review,
				upvotes: votes.rows[0].upvotes,
				downvotes: votes.rows[0].downvotes,
			});
		}

		return finalResults;
	};

	return execTransactionRO(transaction);
}

// Get the user who wrote a given review.
// BUG Not quite sure how to handle this.
// getUserById expects a string, but review.submittedby
// is an integer, which introduces a type conflict.
// May need to ask Shaffer about this.
export async function getAuthorOfReview(review: Review): Promise<User> {
	return getUserById(String(review.submittedby));
}

// Get all reviews written about a given company.
export async function getReviewsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const transaction = async client => {
		let reviewResults = { rows: [] };

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
		);

		let finalResults = [];
		for (let review of reviewResults.rows) {
			let votes = await client.query(
				"SELECT * FROM review_vote_counts WHERE refersto=$1",
				[review.reviewid]
			);

			finalResults.push({
				...review,
				upvotes: votes.rows[0].upvotes,
				downvotes: votes.rows[0].downvotes,
			});
		}

		return finalResults;
	};

	return execTransactionRO(transaction);
}

// Get the company that a given review is about.
export async function getCompanyOfReview(review: Review): Promise<Company> {
	return getCompanyByName(review.companyname);
}

// Get all of the reviews.
export async function getAllReviews(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const transaction = async client => {
		let reviewResults = { rows: [] };

		reviewResults = await client.query(
			"SELECT * FROM reviews OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		let finalResults = [];
		for (let review of reviewResults.rows) {
			const votes = await client.query(
				"SELECT * FROM review_vote_counts WHERE refersto=$1",
				[review.reviewid]
			);

			finalResults.push({
				...review,
				upvotes: votes.rows[0].upvotes,
				downvotes: votes.rows[0].downvotes,
			});
		}

		return finalResults;
	};

	return execTransactionRO(transaction);
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
