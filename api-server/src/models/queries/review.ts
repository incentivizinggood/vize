import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import {
	Company,
	Review,
	User,
	getUserById,
	getCompanyByName,
} from "src/models";

const reviewVoteCounts = sql`
select
    refersto as reviewid,
    count(*) filter (where value = true) as upvotes,
    count(*) filter (where value = false) as downvotes
from review_votes
group by refersto
`;

const attributes = sql.raw(
	[
		'reviewid AS "reviewId"',
		'submittedby AS "submittedBy"',
		'companyname AS "companyName"',
		'companyid AS "companyId"',
		"city",
		"address",
		'industrial_hub AS "industrialHub"',
		'reviewtitle AS "title"',
		'jobtitle AS "jobTitle"',
		'nummonthsworked AS "numberOfMonthsWorked"',
		'contracttype AS "contractType"',
		'employmentstatus AS "employmentStatus"',
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
	FROM reviews natural left join (${reviewVoteCounts}) vc
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
	return simpleQuery(sql`
		${baseQuery}
		WHERE submittedby=${user.userId}
		ORDER BY dateadded DESC
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the user who wrote a given review.
export async function getAuthorOfReview(review: Review): Promise<User> {
	const user = await getUserById(review.submittedBy);

	if (user === null) {
		throw new Error("User not found");
	}

	return user;
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
		ORDER BY dateadded DESC
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the company that a given review is about.
export async function getCompanyOfReview(
	review: Review
): Promise<Company | null> {
	const company: Company | null = await getCompanyByName(review.companyName);

	return company;
}
