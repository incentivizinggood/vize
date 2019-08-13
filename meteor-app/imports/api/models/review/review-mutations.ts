import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";

import CreateReviewInput from "imports/lib/inputs/review";

import { ReviewId, Review, UserPId } from "imports/api/models";

export async function createReview(
	input: CreateReviewInput,
	userId: UserPId
): Promise<ReviewId> {
	const {
		companyName,
		reviewTitle,
		location,
		jobTitle,
		numberOfMonthsWorked,
		pros,
		cons,
		wouldRecommendToOtherJobSeekers,
		healthAndSafety,
		managerRelationship,
		workEnvironment,
		benefits,
		overallSatisfaction,
		additionalComments,
	}: CreateReviewInput = await CreateReviewInput.schema.validate(input);

	const transaction: Transaction<ReviewId> = async client => {
		{
			const {
				rows: [{ role }],
			} = await client.query(
				sql`SELECT role FROM users WHERE userid=${userId}`
			);

			if (role !== "worker") {
				throw new Error("Only employees may review companies.");
			}
		}

		{
			const { rows } = await client.query(
				sql`SELECT reviewid FROM reviews WHERE submittedby=${userId} AND companyname=${companyName}
				LIMIT 1`
			);

			if (rows.length > 0) {
				throw new Error(
					"You may not write more than one review for a company."
				);
			}
		}

		const {
			rows: [{ reviewid }],
		} = await client.query(sql`
			INSERT INTO reviews
				(
					submittedby,
					companyname,
					reviewtitle,
					reviewlocation,
					jobtitle,
					nummonthsworked,
					pros,
					cons,
					wouldrecommend,
					healthandsafety,
					managerrelationship,
					workenvironment,
					benefits,
					overallsatisfaction,
					additionalcomments
				)
			VALUES
				(
					${userId},
					${companyName},
					${reviewTitle},
					${location},
					${jobTitle},
					${numberOfMonthsWorked},
					${pros},
					${cons},
					${wouldRecommendToOtherJobSeekers},
					${healthAndSafety},
					${managerRelationship},
					${workEnvironment},
					${benefits},
					${overallSatisfaction},
					${additionalComments}
				)
			RETURNING reviewid
		`);

		return reviewid;
	};

	return execTransactionRW(transaction);
}

export async function editReview(
	id: ReviewId,
	reviewChanges: unknown
): Promise<Review> {
	throw new Error("Not implemented yet");
}

export async function deleteReview(id: ReviewId): Promise<Review> {
	throw new Error("Not implemented yet");
}
