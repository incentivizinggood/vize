import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import {
	VoteId,
	User,
	Vote,
	VoteSubject,
	getUserById,
	getReviewById,
	getCommentById,
	getVoteSubjectRef,
} from "src/models";

export const voteAttributes = sql.raw(
	[
		'submittedby AS "submittedBy"',
		'refersto AS "refersTo"',
		'value AS "isUpvote"',
	].join(", ")
);

const baseQuery = (subjectType: "review" | "comment") =>
	sql`
		SELECT ${voteAttributes}, '${sql.raw(subjectType)}' AS "subjectType"
		FROM ${sql.raw(subjectType)}_votes
	`;

// Get the vote with a given id.
export async function getVoteById(id: VoteId): Promise<Vote | null> {
	const { subjectType, submittedBy, refersTo } = id;

	return simpleQuery1(sql`
		${baseQuery(subjectType)}
		WHERE submittedby=${submittedBy} AND refersto=${refersTo}
	`);
}

// Get the vote cast by a given user on a given thing.
export async function getVoteByAuthorAndSubject(
	user: User,
	subject: VoteSubject
): Promise<Vote | null> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

	const submittedBy = user.userId;

	return simpleQuery1<Vote>(
		sql`
			${baseQuery(subjectType)}
			WHERE submittedby=${submittedBy} AND refersto=${refersTo}
		`
	).then(vote =>
		vote !== null
			? vote
			: ({
					subjectType,
					refersTo,
					submittedBy,
					isUpvote: null,
			  } as Vote)
	);
}

// Get all votes cast by a given user.
export async function getVotesByAuthor(
	user: User,
	pageNumber: number,
	pageSize: number
): Promise<Vote[]> {
	const submittedBy = user.userId;

	return simpleQuery(sql`
		${baseQuery("review")} WHERE submittedby=${submittedBy}
		UNION ALL
		${baseQuery("comment")} WHERE submittedby=${submittedBy}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the user who cast a given vote.
export async function getAuthorOfVote(vote: Vote): Promise<User> {
	const user = await getUserById(vote.submittedBy);

	if (user === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return user;
}

// Get all votes that were cast on a given thing.
export async function getVotesBySubject(
	subject: VoteSubject,
	pageNumber: number,
	pageSize: number
): Promise<Vote[]> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

	// result has subject (string "review" or "comment")
	// and votes, the query results from the underlying
	// vote counting view for that item. Although pageNumber
	// and pageSize are indeed use (for offset and limit)
	// in the underlying query, they don't have much meaning
	// as each such query should yield exactly 1 or 0 results.

	return simpleQuery(sql`
		${baseQuery(subjectType)}
		WHERE refersto=${refersTo}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the thing that a given vote was cast on.
export async function getSubjectOfVote(vote: Vote): Promise<VoteSubject> {
	let subject: VoteSubject | null;

	if (vote.subjectType === "review") {
		subject = await getReviewById(vote.refersTo);
	} else if (vote.subjectType === "comment") {
		subject = await getCommentById(vote.refersTo);
	} else {
		throw new Error("vote.subjectType is not a valid value");
	}

	if (subject === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return subject;
}
