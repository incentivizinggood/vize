import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";
import * as dataModel from "src/models";

import { User, Article } from "src/models";

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
