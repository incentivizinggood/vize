import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import * as dataModel from "imports/api/models";

import { User } from "imports/api/models";

/** Create a new vote or, if the subject was already voted on, change the vote.
 * If isUpvote is null then remove the vote.
 */
export async function articleLike(
	user: User,
	articleSlug: string,
	isLiked: boolean
): Promise<Article | null> {
	if (!isLiked) {
		return simpleQuery1(sql`
			INSERT INTO article_likes (user_id, article_slug)
			VALUES (${user.userId}, ${articleSlug})
		`).then(() => dataModel.getArticleBySlug(articleSlug));
	} else {
		return simpleQuery1(sql`
			DELETE FROM article_likes
			WHERE user_id=${user.userId} AND article_slug=${articleSlug}
		`).then(() => dataModel.getArticleBySlug(articleSlug));
	}
}
