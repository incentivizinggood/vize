import { execTransactionRW } from "imports/api/connectors/postgresql";

import { VoteId, User, Vote, VoteSubject } from ".";

// Create a new vote or, if the subject was already voted on, change the vote.
export async function castVote(
	user: User,
	subject: VoteSubject,
	isUpvote: boolean
): Promise<Vote> {
	throw new Error("Not implemented yet");
}

// Remove a vote. If there is no vote, do nothing.
export async function removeVote(
	user: User,
	subject: VoteSubject
): Promise<Vote> {
	throw new Error("Not implemented yet");
}
