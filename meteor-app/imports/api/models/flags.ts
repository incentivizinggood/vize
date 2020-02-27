import { sendEmail } from "imports/api/connectors/email";
import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { getUserById } from ".";

export async function flagAReview(
	reviewId: string,
	userId: number,
	reason: string,
	explanation: string
) {
	const reviewInfo = await simpleQuery1<{
		reviewTitle: string;
		companyName: string;
	}>(
		sql`
			SELECT reviewtitle AS "reviewTitle", companies.name AS "companyName"
			FROM reviews
			JOIN companies ON reviews.companyid = companies.companyid
			WHERE reviewid = ${reviewId}
		`
	);
	if (reviewInfo === null) {
		throw new Error("That review does not exist.");
	}

	const user = await getUserById(userId);

	sendEmail({
		to: "incentivizinggood@gmail.com",
		subject: "Someone flagged a review",
		text: `UserName: ${user.username}\nReason: ${reason}\nExplanation: ${explanation}\nReview Title: ${reviewInfo.reviewTitle}\nReview Id: ${reviewId}\nCompany Name: ${reviewInfo.companyName}`,
	});
}
