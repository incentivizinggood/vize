// @flow
import { execTransactionRO } from "/imports/api/connectors/postgresql.ts";

import type { VoteId, Comment, Review, User, Vote, VoteSubject } from ".";
import {
	getUserPostgresId,
	getUserById,
	getReviewById,
	getCommentById,
	getVoteSubjectRef,
	unpackVoteId,
} from ".";

const defaultPageSize = 100;

// Get the vote with a given id.
// BUG not completely sure what the
// best way to do this is going to be
export async function getVoteById(id: VoteId): Promise<Vote> {
	// requires VoteId to be a JSON.parse-able
	// string with the fields/types:
	// subjectType: "review" or "comment"
	// submittedBy: integer
	// refersTo: integer
	const { subjectType, submittedBy, refersTo } = unpackVoteId(id);

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

	return execTransactionRO(transaction);
}

// Get the vote cast by a given user on a given thing.
export async function getVoteByAuthorAndSubject(
	user: User,
	subject: VoteSubject
): Promise<Vote | null> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

	const submittedBy = await getUserPostgresId(user._id);

	const transaction = async client => {
		let voteResults = { rows: [] };

		voteResults = await client.query(
			"SELECT * FROM " +
				subjectType +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[submittedBy, refersTo]
		);

		if (voteResults.rowCount == 0) return null;

		return {
			...voteResults.rows[0],
			subjecttype: subjectType,
		};
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

	return execTransactionRO(transaction);
}

// Get the user who cast a given vote.
export async function getAuthorOfVote(vote: Vote): Promise<User> {
	return getUserById(vote.submittedby);
}

// Get all votes that were cast on a given thing.
export async function getVotesBySubject(
	subject: VoteSubject,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

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
			[refersTo, pageNumber * pageSize, pageSize]
		);

		return voteResults.rows.map(vote => ({
			...vote,
			subjecttype: subjectType,
		}));
	};

	return execTransactionRO(transaction);
}

// Get the thing that a given vote was cast on.
export async function getSubjectOfVote(vote: Vote): Promise<VoteSubject> {
	if (vote.subjecttype === "review") return getReviewById(vote.refersto);

	if (vote.subjecttype === "comment") return getCommentById(vote.refersto);

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

	return execTransactionRO(transaction);
}
