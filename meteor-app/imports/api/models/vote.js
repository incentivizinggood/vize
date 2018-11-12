// @flow
import type { ID } from "./common.js";
import type { Comment } from "./comment.js";
import type { Review } from "./review.js";
import type { User } from "./user.js";

import {
	isReview,
	isComment,
	getUserPostgresId,
	getUserById,
	getReviewById,
	getCommentById,
} from ".";

import {
	execTransactionRO,
	execTransactionRW,
} from "../connectors/postgresql.js";
import { VoteSchema } from "../data/votes.js";

const defaultPageSize = 100;

export type Vote = {
	_id: ID,
	submittedBy: ID,
	voteSubject: "review" | "comment",
	references: ID,
	value: boolean,
};

export type VoteSubject = Comment | Review;

// Get the vote with a given id.
// BUG not completely sure what the
// best way to do this is going to be
export async function getVoteById(id: ID): Promise<Vote> {
	// requires ID to be a JSON.parse-able
	// string with the fields/types:
	// voteSubject: "review" or "comment"
	// submittedBy: integer
	// references: integer
	const voteKeyFields = JSON.parse(id);
	const transaction = async client => {
		let voteResults = { rows: [] };
		if (
			voteKeyFields.voteSubject !== "review" &&
			voteKeyFields.voteSubject !== "comment"
		)
			throw new Error("Illegal subject: table does not exist");

		voteResults = await client.query(
			"SELECT * FROM " +
				voteKeyFields.voteSubject +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[voteKeyFields.submittedBy, voteKeyFields.references]
		);

		return {
			subject: voteKeyFields.voteSubject,
			vote: voteResults.rows[0],
		};
	};

	return execTransactionRO(transaction).then(processVoteResults);
}

// Get the vote cast by a given user on a given thing.
export async function getVoteByAuthorAndSubject(
	user: User,
	subject: VoteSubject
): Promise<Vote> {
	let subjectOfVote;

	if (isReview(subject)) {
		subjectOfVote = "review";
	} else if (isComment(subject)) {
		subjectOfVote = "comment";
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}

	const authorPostgresId = await getUserPostgresId(user._id);

	const voteKeyFields = {
		submittedBy: authorPostgresId,
		voteSubject: subjectOfVote,
		references: subject._id,
	};

	const transaction = async client => {
		let voteResults = { rows: [] };
		if (
			voteKeyFields.voteSubject !== "review" &&
			voteKeyFields.voteSubject !== "comment"
		)
			throw new Error("Illegal subject: table does not exist");

		voteResults = await client.query(
			"SELECT * FROM " +
				voteKeyFields.voteSubject +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[voteKeyFields.submittedBy, voteKeyFields.references]
		);

		return {
			subject: voteKeyFields.voteSubject,
			vote: voteResults.rows[0],
		};
	};

	return execTransactionRO(transaction).then(processVoteResults);
}

// Get all votes cast by a given user.
export async function getVotesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Vote]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	// result has reviewVotes and commentVotes,
	// two arrays of votes by the author for
	// the respective voteSubjects.
	const transaction = async client => {
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };

		reviewVoteResults = await client.query(
			"SELECT * FROM review_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
		);
		commentVoteResults = await client.query(
			"SELECT * FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
		);

		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	};

	return execTransactionRO(transaction);
}

// Get the user who cast a given vote.
export async function getAuthorOfVote(vote: Vote): Promise<User> {
	return getUserById(String(vote.submittedBy));
}

// Get all votes that were cast on a given thing.
export async function getVotesBySubject(
	subject: VoteSubject,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Vote]> {
	let voteSubject;
	if (isReview(subject)) {
		voteSubject = "review";
	} else if (isComment(subject)) {
		voteSubject = "comment";
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}

	// result has subject (string "review" or "comment")
	// and votes, the query results from the underlying
	// vote counting view for that item. Although pageNumber
	// and pageSize are indeed use (for offset and limit)
	// in the underlying query, they don't have much meaning
	// as each such query should yield exactly 1 or 0 results.

	const transaction = async client => {
		let voteResults = { rows: [] };
		if (voteSubject !== "review" && voteSubject !== "comment")
			throw new Error("Illegal subject: table does not exist");

		voteResults = await client.query(
			"SELECT * FROM " +
				voteSubject +
				"_vote_counts WHERE " +
				"refersto=$1 OFFSET $2 LIMIT $3",
			[subject._id, pageNumber * pageSize, pageSize]
		);

		return {
			subject: voteSubject,
			votes: voteResults.rows[0],
		};
	};

	return execTransactionRO(transaction);
}

// Get the thing that a given vote was cast on.
export async function getSubjectOfVote(vote: Vote): Promise<?VoteSubject> {
	if (vote.voteSubject === "review")
		return getReviewById(String(vote.references));

	if (vote.voteSubject === "comment")
		return getCommentById(String(vote.references));

	throw new Error("vote.voteSubject is not a valid value");
}

// Get all of the votes.
export async function getAllVotes(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Vote]> {
	// result has reviewVotes and commentVotes,
	// two arrays of votes which contain all the
	// vote counts for every review and comment respectively.

	const transaction = async client => {
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };

		reviewVoteResults = await client.query(
			"SELECT * FROM review_vote_counts OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);
		commentVoteResults = await client.query(
			"SELECT * FROM comment_vote_counts OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	};

	return execTransactionRO(transaction);
}

export function isVote(obj: any): boolean {
	// VoteSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = VoteSchema.newContext();
	context.validate(obj);
	return context.isValid();
}

// Create a new vote or, if the subject was already voted on, change the vote.
export async function castVote(
	user: User,
	subject: VoteSubject,
	isUpvote: boolean
): Vote {
	throw new Error("Not implemented yet");
}

// Remove a vote. If there is no vote, do nothing.
export async function removeVote(user: User, subject: VoteSubject): Vote {
	throw new Error("Not implemented yet");
}
