import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import { User, Vote } from "src/models";

import { voteAttributes } from "../queries/vote";

/** Create a new vote or, if the subject was already voted on, change the vote.
 * If isUpvote is null then remove the vote.
 */
export async function castVote(
	user: User,
	subjectId: number,
	isUpvote: boolean | null
): Promise<Vote | null> {
	if (isUpvote !== null) {
		return simpleQuery1<Vote>(sql`
			INSERT INTO review_votes (refersto, submittedby, value)
			VALUES (${subjectId}, ${user.userId}, ${isUpvote})
			ON CONFLICT (submittedby, refersto) DO UPDATE SET value=${isUpvote}
			RETURNING ${voteAttributes}, 'review' AS "subjectType"
		`);
	} else {
		return simpleQuery1<Vote>(
			sql`
				DELETE FROM review_votes
				WHERE submittedby=${user.userId} AND refersto=${subjectId}
			`
		).then(
			(): Vote => ({
				submittedBy: user.userId,
				isUpvote: null,
				subjectType: "review",
				refersTo: subjectId,
			})
		);
	}
}
