import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	Company,
	Review,
	User,
	getUserPostgresId,
	getUserById,
	getCompanyByName,
} from "imports/api/models";

const attributes = sql.raw(
	[
		'reviewid AS "reviewId"',
		'submittedby AS "submittedBy"',
		'companyname AS "companyName"',
		'companyid AS "companyId"',
		'reviewlocation AS "location"',
		'reviewtitle AS "title"',
		'jobtitle AS "jobTitle"',
		'nummonthsworked AS "numberOfMonthsWorked"',
		"pros",
		"cons",
		'wouldrecommend AS "wouldRecommend"',
		'healthandsafety AS "healthAndSafety"',
		'managerrelationship AS "managerRelationship"',
		'workenvironment AS "workEnvironment"',
		"benefits",
		'overallsatisfaction AS "overallSatisfaction"',
		'additionalcomments AS "additionalComments"',
		'dateadded AS "dateAdded"',
		"upvotes",
		"downvotes",
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM reviews JOIN review_vote_counts
	ON review_vote_counts.refersto = reviews.reviewid
`;

// Get the review with a given id.
export async function getReviewById(id: number): Promise<Review | null> {
	return simpleQuery1(sql`${baseQuery} WHERE reviewid=${id}`);
}

// Get all reviews written by a given user.
export async function getReviewsByAuthor(
	user: User,
	pageNumber: number,
	pageSize: number
): Promise<Review[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	return simpleQuery(sql`
		${baseQuery}
		WHERE submittedby=${authorPostgresId}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the user who wrote a given review.
export async function getAuthorOfReview(review: Review): Promise<User> {
	return getUserById(review.submittedBy);
}

// Get all reviews written about a given company.
export async function getReviewsByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<Review[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE companyname=${company.name}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}


// Get the company that a given review is about.
export async function getCompanyOfReview(review: Review): Promise<Company | null> {
	const company: Company | null = await getCompanyByName(review.companyName);

	return company;
}
