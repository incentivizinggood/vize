// @flow

import type { CommentId, ReviewId, UserId, Vote } from ".";

export opaque type VoteId = string;

export function voteIdToString(id: VoteId): string {
	return id;
}

export function stringToVoteId(id: string): VoteId {
	return id;
}

/* VoteId's are strings that encode JSON data. This is done because the database
   uses (submittedby,refersto) as the primary key of votes. Because refersto is
   a foreign key we need separate tables for votes on comments and votes on
   reviews. subjectType tells us which table this vote is in. */

export function getIdOfVote(vote: Vote): VoteId {
	return JSON.stringify({
		submittedBy: vote.submittedby,
		subjectType: vote.subjecttype,
		refersTo: vote.refersto,
	});
}

export function unpackVoteId(
	id: VoteId
):
	| {| subjectType: "comment", refersTo: CommentId, submittedBy: UserId |}
	| {| subjectType: "review", refersTo: ReviewId, submittedBy: UserId |} {
	// We do no validation here, but if all other code treats VoteIds as opaque
	// strings, then this should be fine.
	return JSON.parse(id);
	// If we find it neesisary to double check, we can use this code.
	// if (subjectType !== "review" && subjectType !== "comment")
	//	throw new Error("Illegal subject: table does not exist");
}
