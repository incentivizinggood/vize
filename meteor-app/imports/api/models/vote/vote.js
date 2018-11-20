// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { VoteSchema } from "/imports/api/data/votes.js";

import type { ID, Comment, Review, User } from "/imports/api/models";
import {
	isReview,
	isComment,
	getUserPostgresId,
	getUserById,
	getReviewById,
	getCommentById,
} from "/imports/api/models";

const defaultPageSize = 100;

export type Vote = {
	id: ID,
	submittedBy: ID,
	subjectType: "review" | "comment",
	refersTo: ID,
	isUpvote: boolean,
	created: Date,
};

export type VoteSubject = Comment | Review;

type VoteData = {
	submittedby: number,
	subjecttype: "review" | "comment",
	refersto: number,
	value: boolean,
	dateadded: Date,
};

function processResultsToVote(voteResult: VoteData): Vote {
	console.log(`voteResult is`);
	console.log(voteResult);
	Object.entries(voteResult).forEach(([k, v]) => {
		console.log(k, ":", typeof v);
	});
	return {
		id: JSON.stringify({
			submittedBy: voteResult.submittedby,
			subjectType: voteResult.subjecttype,
			refersTo: voteResult.refersto,
		}),
		submittedBy: String(voteResult.submittedby),
		subjectType: voteResult.subjecttype,
		refersTo: String(voteResult.refersto),
		isUpvote: voteResult.value,
		created: new Date(voteResult.dateadded),
	};
}

function processResultsToVotes(voteResults: VoteData[]): Vote[] {
	return voteResults.map(processResultsToVote);
}

// Get the vote with a given id.
// BUG not completely sure what the
// best way to do this is going to be
export async function getVoteById(id: ID): Promise<Vote> {
	// requires ID to be a JSON.parse-able
	// string with the fields/types:
	// subjectType: "review" or "comment"
	// submittedBy: integer
	// refersTo: integer
	const { subjectType, submittedBy, refersTo } = JSON.parse(id);
	if (subjectType !== "review" && subjectType !== "comment")
		throw new Error("Illegal subject: table does not exist");

	const transaction = async client => {
		let voteResults = { rows: [] };

		voteResults = await client.query(
			"SELECT * FROM " +
				subjectType +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[submittedBy, refersTo]
		);

		return {
			...voteResults.rows[0],
			subjecttype: subjectType,
		};
	};

	return execTransactionRO(transaction).then(processResultsToVote);
}

// Get the vote cast by a given user on a given thing.
export async function getVoteByAuthorAndSubject(
	user: User,
	subject: VoteSubject
): Promise<Vote | null> {
	let subjectType;

	if (isReview(subject)) {
		subjectType = "review";
	} else if (isComment(subject)) {
		subjectType = "comment";
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}

	const submittedBy = await getUserPostgresId(user._id);

	const refersTo = subject._id;

	const transaction = async client => {
		let voteResults = { rows: [] };

		voteResults = await client.query(
			"SELECT * FROM " +
				subjectType +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[submittedBy, refersTo]
		);
		console.log("voteResults is ");
		console.log(voteResults);

		if (voteResults.rowCount == 0) return null;

		return processResultsToVote({
			...voteResults.rows[0],
			subjecttype: subjectType,
		});
	};

	return execTransactionRO(transaction);
}

// Get all votes cast by a given user.
export async function getVotesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	const submittedBy = await getUserPostgresId(user._id);

	const transaction = async client => {
		let voteResults = { rows: [] };

		voteResults = await client.query(
			"SELECT *, 'review' AS subjecttype FROM review_votes WHERE submittedby=$1 UNION ALL SELECT *, 'comment' AS subjecttype  FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[submittedBy, pageNumber * pageSize, pageSize]
		);

		return voteResults.rows;
	};

	return execTransactionRO(transaction).then(processResultsToVotes);
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
): Promise<Vote[]> {
	let subjectType;
	if (isReview(subject)) {
		subjectType = "review";
	} else if (isComment(subject)) {
		subjectType = "comment";
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

		voteResults = await client.query(
			"SELECT * FROM " +
				subjectType +
				"_votes WHERE " +
				"refersto=$1 OFFSET $2 LIMIT $3",
			[subject._id, pageNumber * pageSize, pageSize]
		);

		return voteResults.rows.map(vote => ({
			...vote,
			subjecttype: subjectType,
		}));
	};

	return execTransactionRO(transaction).then(processResultsToVotes);
}

// Get the thing that a given vote was cast on.
export async function getSubjectOfVote(vote: Vote): Promise<VoteSubject> {
	if (vote.subjectType === "review") return getReviewById(vote.refersTo);

	if (vote.subjectType === "comment") return getCommentById(vote.refersTo);

	throw new Error("vote.subjectType is not a valid value");
}

// Get all of the votes.
export async function getAllVotes(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	const transaction = async client => {
		let voteResults = { rows: [] };

		voteResults = await client.query(
			"SELECT *, 'review' AS subjecttype FROM review_votes UNION ALL SELECT *, 'comment' AS subjecttype FROM comment_votes OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return voteResults.rows;
	};

	return execTransactionRO(transaction).then(processResultsToVotes);
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
