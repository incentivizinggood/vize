import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { User, Vote, ReviewId, getUserPostgresId } from "imports/api/models";

import { attributes } from "../queries/vote";

/** Create a new vote or, if the subject was already voted on, change the vote.
 * If isUpvote is null then remove the vote.
 */
export async function castVote(
	user: User,
	subjectId: ReviewId,
	isUpvote: boolean | null
): Promise<Vote | null> {
	const userPId = await getUserPostgresId(user._id);

	if (isUpvote !== null) {
		return simpleQuery1<Vote>(sql`
			INSERT INTO review_votes (refersto,submittedby,value)
			VALUES (${subjectId},${userPId},${isUpvote})
			ON CONFLICT (submittedby,refersto) DO UPDATE SET value=${isUpvote}
			RETURNING ${attributes}, 'review' AS "subjectType"
		`);
	} else {
		return simpleQuery1<Vote>(
			sql`
				DELETE FROM review_votes
				WHERE submittedby=${userPId} AND refersto=${subjectId}
			`
		).then(
			(): Vote => ({
				submittedBy: userPId,
				isUpvote: null,
				subjectType: "review",
				refersTo: subjectId,
			})
		);
	}
}
