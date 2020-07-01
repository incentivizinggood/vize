import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";
import * as dataModel from "src/models";

import { User, Resource } from "src/models";

/** Create a new vote or, if the subject was already voted on, change the vote.
 * If isUpvote is null then remove the vote.
 */
export async function resourceLike(
	user: User,
	resourceSlug: string,
	isLiked: boolean
): Promise<Resource | null> {
	if (!isLiked) {
		return simpleQuery1(sql`
			INSERT INTO resource_likes (user_id, resource_slug)
			VALUES (${user.userId}, ${resourceSlug})
		`).then(() => dataModel.getResourceBySlug(resourceSlug));
	} else {
		return simpleQuery1(sql`
			DELETE FROM resource_likes
			WHERE user_id=${user.userId} AND resource_slug=${resourceSlug}
		`).then(() => dataModel.getResourceBySlug(resourceSlug));
	}
}
