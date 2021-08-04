import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { postToSlack } from "src/connectors/slack-webhook";

import { locationInputSchema } from "./location";

type PhoneNumber = undefined | string;

const starRatingSchema = yup.number().integer().min(0).max(5).required();

const createReviewInputSchema = yup
	.object({
		companyName: yup.string().required(),
		reviewTitle: yup.string().required(),
		location: locationInputSchema,
		jobTitle: yup.string().required(),
		numberOfMonthsWorked: yup.number().min(0).required(),
		contractType: yup
			.string()
			.oneOf([
				"FULL_TIME",
				"PART_TIME",
				"INTERNSHIP",
				"TEMPORARY",
				"CONTRACTOR",
			])
			.required(),
		employmentStatus: yup.string().oneOf(["FORMER", "CURRENT"]).required(),
		pros: yup.string().required(),
		cons: yup.string().required(),
		wouldRecommendToOtherJobSeekers: yup.boolean().required(),
		healthAndSafety: starRatingSchema,
		managerRelationship: starRatingSchema,
		workEnvironment: starRatingSchema,
		benefits: starRatingSchema,
		overallSatisfaction: starRatingSchema,
		additionalComments: yup.string(),
		referredBy: yup.string(),
	})
	.required();

export async function createReview(
	input: unknown,
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
	} = await createReviewInputSchema.validate(input);

	const transaction: Transaction<number> = async (client) => {
		let phoneNumberReviewer: PhoneNumber = undefined;
		let phoneNumberReferredBy: PhoneNumber = undefined;
		let totalReviewsCount = 0;

		// Check if user is worker
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

		// Check if user has already written review for the company name input
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

		// check if phone number for user exists and if it does, use it for the slack hook
		{
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

				phoneNumberReviewer = phone_number;
			}
		}

		// check if phone number for referredBy user exists and if it does, use it for the slack hook
		{
			const { rows } = await client.query(
				sql`SELECT phone_number FROM reward_wrote_a_review WHERE user_id=${referredBy}`
			);
			if (rows.length > 0) {
				phoneNumberReferredBy = rows[0].phone_number;
			}
		}

		// count the number of reviews a user has written
		{
			const {
				rows: [{ count }],
			} = await client.query(
				sql`SELECT COUNT(submittedby) FROM reviews WHERE submittedby=${userId}`
			);

			totalReviewsCount = count;
		}

		const {
			rows: [{ reviewid }],
		} = await client.query(sql`
			INSERT INTO reviews
				(
					submittedby,
					companyname,
					reviewtitle,
					city,
					address,
					industrial_hub,
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
					${location.city},
					${location.address},
					${location.industrialHub},
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

*referredBy:* ${referredBy} - ${phoneNumberReferredBy}

*phoneNumber:* ${phoneNumberReviewer}

*reviewsCount:* ${totalReviewsCount}
		`);

		return reviewid;
	};

	return execTransactionRW(transaction);
}
