import sql from "imports/lib/sql-template";
import { parsePhoneNumber } from "libphonenumber-js/max";

import {
	execTransactionRO,
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";
import { postToSlack } from "imports/api/connectors/slack-webhook";

import { User, getReviewsByAuthor, getUserPostgresId } from ".";

export type RewardStatus = "CAN_EARN" | "CAN_CLAIM" | "CLAIMED" | "INELIGIBLE";

export type PaymentMethod = "PAYPAL" | "XOOM";

export async function wroteAReviewStatus(user: User): Promise<RewardStatus> {
	if (user.role !== "worker") return "INELIGIBLE";

	const transaction: Transaction<RewardStatus> = async client => {
		const userPId = await getUserPostgresId(user._id);

		const results = await client.query(
			sql`
				SELECT * FROM reward_wrote_a_review
				WHERE user_id=${userPId}
			`
		);

		if (results.rows.length > 0) return "CLAIMED";

		if ((await getReviewsByAuthor(user, 0, 1)).length > 0)
			return "CAN_CLAIM";

		return "CAN_EARN";
	};

	return execTransactionRO(transaction);
}

export async function claimWroteAReview(
	user: User,
	phoneNumber: string,
	paymentMethod: PaymentMethod,
	howYouHeardAboutUs?: string | null | undefined
): Promise<RewardStatus> {
	// Check if the user can claim this reward.
	switch (await wroteAReviewStatus(user)) {
		case "CAN_EARN":
			throw Error("NOT_EARNED");
		case "CLAIMED":
			throw Error("ALREADY_CLAIMED");
		case "INELIGIBLE":
			throw Error("INELIGIBLE");
		default:
	}

	// Check if the phone number is valid.
	const phoneNumberInfo = parsePhoneNumber(phoneNumber);
	// We only accept mexico phone numbers to prevent fake numbers from services
	// like Google Voice.
	if (phoneNumberInfo.country !== "MX") throw Error("NON_MEXICO_NUMBER");

	const transaction: Transaction<void> = async client => {
		// Check if the phone number has already been used.
		if (
			(await client.query(
				sql`
					SELECT * FROM reward_wrote_a_review
					WHERE phone_number=${phoneNumber}
				`
			)).rows.length > 0
		)
			throw Error("PHONENUMBER_ALREADY_USED");

		// All checks have passed. We now give the user their reward.

		// TODO: Call paypal/xoom connector to send the reward.

		const userPId = await getUserPostgresId(user._id);
		await client.query(
			sql`
				INSERT INTO reward_wrote_a_review
					(user_id, phone_number, payment_method)
					VALUES (${userPId}, ${phoneNumber}, ${paymentMethod})
			`
		);

		// An optional message to post on slack about how the user heard about us.
		let heardAboutUsMessage = null;
		if (
			howYouHeardAboutUs &&
			/^radio|facebook|google|referral|other$/.test(howYouHeardAboutUs)
		) {
			await client.query(
				sql`
					INSERT INTO how_you_heard_about_us
						(user_id, how)
						VALUES (${userPId}, ${howYouHeardAboutUs})
				`
			);
			heardAboutUsMessage = ` How they heard about us was ${howYouHeardAboutUs}.`;
		} else if (
			howYouHeardAboutUs !== null &&
			howYouHeardAboutUs !== undefined
		) {
			// Silently ignore this error for a better UX.
			// Report it to the server's log only.
			console.warn(
				"The value for howYouHeardAboutUs (",
				howYouHeardAboutUs,
				") is not valid. Silently ignoring this error."
			);
		}

		postToSlack(
			`The user with id \`${userPId}\` and phone number ${phoneNumberInfo.formatInternational()} has claimed a reward. They asked to be paid via ${paymentMethod}.${heardAboutUsMessage ||
				""}`
		);
	};

	return execTransactionRW(transaction).then(() =>
		// Send the new status of the reward as the return value.
		// Should always be "CLAIMED"
		wroteAReviewStatus(user)
	);
}
