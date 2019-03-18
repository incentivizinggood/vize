import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	ReviewId,
	Company,
	Review,
	User,
	getUserPostgresId,
	getUserById,
	getCompanyByName,
	defaultPageSize,
} from "imports/api/models";

const attributes = [
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
];
const baseQuery = `SELECT ${attributes.join(", ")}
                   FROM reviews JOIN review_vote_counts
                   ON review_vote_counts.refersto = reviews.reviewid`;

// Get the review with a given id.
export async function getReviewById(id: ReviewId): Promise<Review | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1(`${baseQuery} WHERE reviewid=$1`, Number(id));
}

// Get all reviews written by a given user.
export async function getReviewsByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	return simpleQuery(
		`${baseQuery} WHERE submittedby=$1 OFFSET $2 LIMIT $3`,
		authorPostgresId,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the user who wrote a given review.
export async function getAuthorOfReview(review: Review): Promise<User> {
	return getUserById(review.submittedBy);
}

// Get all reviews written about a given company.
export async function getReviewsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	return simpleQuery(
		`${baseQuery} WHERE companyname=$1 OFFSET $2 LIMIT $3`,
		company.name,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the company that a given review is about.
export async function getCompanyOfReview(review: Review): Promise<Company> {
	const company: Company | null = await getCompanyByName(review.companyName);

	if (company === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return company;
}

// Get all of the reviews.
export async function getAllReviews(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Review[]> {
	return simpleQuery(
		`${baseQuery} OFFSET $1 LIMIT $2`,
		pageNumber * pageSize,
		pageSize
	);
}
