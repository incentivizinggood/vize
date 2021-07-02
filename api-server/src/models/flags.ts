import * as yup from "yup";

import { sendEmail } from "src/connectors/email";
import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";
import { User } from ".";

const flagReviewInputSchema = yup
	.object({
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
	})
	.required();

export async function flagReview(
	user: User | undefined | null,
	input: unknown
): Promise<boolean> {
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
		templateId: 5,
		params: {
			username: user ? user.username : null,
			reason,
			explanation,
			reviewTitle: reviewInfo.reviewTitle,
			reviewId,
			companyName: reviewInfo.companyName,
		},
	});

	return true;
}
