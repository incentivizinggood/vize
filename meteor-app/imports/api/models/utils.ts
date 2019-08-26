import Hashids from "hashids";

import { execTransactionRO } from "imports/api/connectors/postgresql";

import {
	UserId,
	VoteId,
	Vote,
	VoteSubject,
	SubjectRef,
	Comment,
	Review,
	isComment,
	isReview,
	Location,
} from "imports/api/models";

// Get the integer ID of a user's PostgreSQL entry
export async function getUserPostgresId(id: UserId): Promise<number> {
	if (typeof id === "number") {
		// The given id is a number.
		// Assume it is already a PostgreSQL id.
		return id;
	}

	const transaction = async client => {
		const userResult = await client.query(
			"SELECT * FROM users WHERE usermongoid=$1",
			[id]
		);

		return {
			user: userResult.rows[0],
		};
	};

	const pgUserResults = await execTransactionRO(transaction);
	return pgUserResults.user.userid;
}

// Get the string ID of a user's MongoDB document
export async function getUserMongoId(id: UserId): Promise<string> {
	if (typeof id === "string") {
		// The given id is a string.
		// Assume it is already a MongoDB id.
		return id;
	}

	const transaction = async client => {
		const userResult = await client.query(
			"SELECT * FROM users WHERE userid=$1",
			[Number(id)]
		);

		return {
			user: userResult.rows[0],
		};
	};

	const pgUserResults = await execTransactionRO(transaction);
	return pgUserResults.user.usermongoid;
}

/* VoteId's are strings that encode three numbers, [subjectType, submittedBy,
   refersTo]. This is done because the database uses (submittedby,refersto) as
   the primary key of votes. Because refersto is a foreign key we need separate
   tables for votes on comments and votes on reviews. subjectType tells us which
   table this vote is in; 1 for comment and 2 for review. */

const hashids = new Hashids("Vize (this is salt)", 4);

export function voteIdToString(id: VoteId): string {
	const { subjectType, submittedBy, refersTo } = id;
	return hashids.encode([
		subjectType === "comment" ? 1 : 2,
		submittedBy,
		refersTo,
	]);
}

export function stringToVoteId(id: string): VoteId {
	const [subjectType, submittedBy, refersTo] = hashids.decode(id);
	return {
		subjectType: subjectType === 1 ? "comment" : "review",
		submittedBy,
		refersTo,
	} as VoteId;
}

export function getIdOfVote(vote: Vote): VoteId {
	return {
		submittedBy: vote.submittedBy,
		subjectType: vote.subjectType,
		refersTo: vote.refersTo,
	} as VoteId;
}

// Get the foreign key that a vote cast on this subject would have.
export function getVoteSubjectRef(subject: VoteSubject): SubjectRef {
	if (isComment(subject)) {
		return {
			subjectType: "comment",
			refersTo: (subject as Comment)._id,
		};
	} else if (isReview(subject)) {
		return {
			subjectType: "review",
			refersTo: (subject as Review).reviewId,
		};
	} else {
		throw new Error("NOT_ANY_TYPE_OF_VOTE_SUBJECT");
	}
}

export function parseLocationString(str: string): Location {
	return JSON.parse(str);
}
