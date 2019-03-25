import { simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	VoteSubject,
	User,
	Vote,
	ReviewId,
	getUserPostgresId,
} from "imports/api/models";

import { attributes } from "./vote-queries";

// Create a new vote or, if the subject was already voted on, change the vote.
export async function castVote(
	user: User,
	subjectId: ReviewId,
	isUpvote: boolean | null
): Promise<{ vote: Vote } | null> {
	const userPId = await getUserPostgresId(user._id);

	if (isUpvote !== null) {
		return simpleQuery1<Vote>(
			`INSERT INTO review_votes (refersto,submittedby,value) VALUES ($1,$2,$3) ON CONFLICT (submittedby,refersto) DO UPDATE SET value=$3 RETURNING ${attributes.join(
				", "
			)}, 'review' AS "subjectType"`,
			subjectId,
			userPId,
			isUpvote
		).then(vote => (vote ? { vote } : null));
	} else {
		return simpleQuery1(
			`DELETE FROM review_votes WHERE submittedby=$1 AND refersto=$2`,
			userPId,
			subjectId
		).then(
			(): { vote: Vote } => ({
				vote: {
					submittedBy: userPId,
					isUpvote: null,
					subjectType: "review",
					refersTo: subjectId,
				},
			})
		);
	}
}

// Remove a vote. If there is no vote, do nothing.
export async function removeVote(
	user: User,
	subject: VoteSubject
): Promise<Vote> {
	throw new Error("Not implemented yet");
}
