import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { ArticleAuthor } from "imports/api/models";

const attributes = sql.raw(
	[
		'author_id AS "authorId"',
		'author_name AS "authorName"',
		'author_company_name AS "authorCompanyName"',
		'author_image_url AS "authorImageURL"',
		'author_bio AS "authorBio"',
		'contact_phone_number AS "contactPhoneNumber"',
		'contact_email AS "contactEmail"',
		'website_url AS "websiteURL"',
		"location",
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM article_authors
`;

export async function getArticleAuthorById(
	id: number
): Promise<ArticleAuthor | null> {
	return simpleQuery1(sql`
		${baseQuery}
		WHERE author_id=${id}
	`);
}
