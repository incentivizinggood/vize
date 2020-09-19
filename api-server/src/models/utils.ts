import Hashids from "hashids";

import {
	VoteId,
	Vote,
	VoteSubject,
	SubjectRef,
	Comment,
	Review,
	isComment,
	isReview,
} from "src/models";

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
