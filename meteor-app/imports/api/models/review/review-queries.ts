import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	ReviewId,
	Company,
	Review,
	User,
	getUserPostgresId,
	getUserById,
	getCompanyByName,
} from "imports/api/models";

const defaultPageSize = 100;

const attributes = [
	"reviewid",
	"submittedby",
	"companyname",
	"companyid",
	"reviewlocation",
	"reviewtitle",
	"jobtitle",
	"nummonthsworked",
	"pros",
	"cons",
	"wouldrecommend",
	"healthandsafety",
	"managerrelationship",
	"workenvironment",
	"benefits",
	"overallsatisfaction",
	"additionalcomments",
	"dateadded",
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
	return getUserById(review.submittedby);
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
	return getCompanyByName(review.companyname);
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
