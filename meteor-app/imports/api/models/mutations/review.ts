import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";
import { postToSlack } from "imports/api/connectors/slack-webhook";

import CreateReviewInput from "imports/lib/inputs/review";

type PhoneNumber = undefined | string;

export async function createReview(
	input: CreateReviewInput,
	userId: number
): Promise<number> {
	const {
		companyName,
		reviewTitle,
		location,
		jobTitle,
		numberOfMonthsWorked,
		contractType,
		employmentStatus,
		pros,
		cons,
		wouldRecommendToOtherJobSeekers,
		healthAndSafety,
		managerRelationship,
		workEnvironment,
		benefits,
		overallSatisfaction,
		additionalComments,
		referredBy,
	}: CreateReviewInput = await CreateReviewInput.schema.validate(input);

	const transaction: Transaction<number> = async client => {
		var phoneNumber: PhoneNumber = undefined;
		{
			const {
				rows: [{ role }],
			} = await client.query(
				sql`SELECT role FROM users WHERE userid=${userId}`
			);

			if (role !== "worker") {
				// Enlish Error: Only employees may review companies.
				throw new Error("Solo los empleados pueden evaluar empresas.");
			}
		}

		{
			const { rows } = await client.query(
				sql`SELECT reviewid FROM reviews WHERE submittedby=${userId} AND companyname=${companyName}
				LIMIT 1`
			);

			if (rows.length > 0) {
				// Error in English: "You may not write more than one review for a company."
				throw new Error(
					"No puedes escribir más de una evaluación para una empresa."
				);
			}
		}
		{
			// check if phone number for user exists and if it does, use it for the slack hook
			const {
				rows: [{ count }],
			} = await client.query(
				sql`SELECT COUNT(user_id) FROM reward_wrote_a_review WHERE user_id=${userId}`
			);
			if (count == 1) {
				const {
					rows: [{ phone_number }],
				} = await client.query(
					sql`SELECT phone_number FROM reward_wrote_a_review WHERE user_id=${userId}`
				);
				phoneNumber = phone_number;
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
					contracttype,
					employmentstatus,
					pros,
					cons,
					wouldrecommend,
					healthandsafety,
					managerrelationship,
					workenvironment,
					benefits,
					overallsatisfaction,
					additionalcomments,
					referredby
				)
			VALUES
				(
					${userId},
					${companyName},
					${reviewTitle},
					${location},
					${jobTitle},
					${numberOfMonthsWorked},
					${contractType},
					${employmentStatus},
					${pros},
					${cons},
					${wouldRecommendToOtherJobSeekers},
					${healthAndSafety},
					${managerRelationship},
					${workEnvironment},
					${benefits},
					${overallSatisfaction},
					${additionalComments},
					${referredBy}
				)
			RETURNING reviewid
		`);

		postToSlack(`The user with ID \`${userId}\` posted a review.

*Review ID:* ${reviewid}

*Review title:* ${reviewTitle}

*Company name:* ${companyName}

*Job title:* ${jobTitle}

*City:* ${location.city}

*Number of months worked:* ${numberOfMonthsWorked}

*Contract type:* ${contractType}

*Employment Status:* ${employmentStatus}

*Pros:* ${pros}

*Cons:* ${cons}

*Would recommend to other job seekers:* ${wouldRecommendToOtherJobSeekers}

*Health and safety:* ${healthAndSafety}

*Manager relationship:* ${managerRelationship}

*Work environment:* ${workEnvironment}

*Benefits*: ${benefits}

*Overall satisfaction:* ${overallSatisfaction}

*Additional comments:* ${additionalComments}

*referredBy:* ${referredBy}

*phoneNumber:* ${phoneNumber}
		`);

		return reviewid;
	};

	return execTransactionRW(transaction);
}
