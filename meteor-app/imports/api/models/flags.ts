import * as yup from "yup";

import { sendEmail } from "imports/api/connectors/email";
import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { User } from ".";

const flagReviewInputSchema = yup.object({
	reviewId: yup
		.string()
		.trim()
		.required(),
	reason: yup
		.string()
		.trim()
		.required(),
	explanation: yup
		.string()
		.trim()
		.required(),
});

export async function flagReview(
	user: User | undefined | null,
	input: unknown
) {
	const {
		reviewId,
		reason,
		explanation,
	} = await flagReviewInputSchema.validate(input, {
		abortEarly: false,
	});

	const reviewInfo = await simpleQuery1<{
		reviewTitle: string;
		companyName: string;
	}>(sql`
			SELECT reviewtitle AS "reviewTitle", companies.name AS "companyName"
			FROM reviews
			JOIN companies ON reviews.companyid = companies.companyid
			WHERE reviewid = ${reviewId}
	`);

	if (reviewInfo === null) {
		throw new Error("That review does not exist.");
	}

	sendEmail({
		to: "incentivizinggood@gmail.com",
		subject: "Someone flagged a review",
		text: `${
			user ? `UserName: ${user.username}` : `No user was logged in.`
		}\nReason: ${reason}\nExplanation: ${explanation}\nReview Title: ${
			reviewInfo.reviewTitle
		}\nReview Id: ${reviewId}\nCompany Name: ${reviewInfo.companyName}`,
	});

	return true;
}
