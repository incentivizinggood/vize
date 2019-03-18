import Hashids from "hashids";

import {
	CommentId,
	ReviewId,
	UserPId,
	Vote,
	Branded,
} from "imports/api/models";

export type VoteId = Branded<
	| { subjectType: "comment"; refersTo: CommentId; submittedBy: UserPId }
	| { subjectType: "review"; refersTo: ReviewId; submittedBy: UserPId },
	"VoteId"
>;

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
