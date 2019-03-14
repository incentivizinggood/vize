import { parsePhoneNumber } from "libphonenumber-js/max";

import {
	execTransactionRO,
	execTransactionRW,
} from "imports/api/connectors/postgresql";

import { User, getReviewsByAuthor, getUserPostgresId } from ".";

export type RewardStatus = "CAN_EARN" | "CAN_CLAIM" | "CLAIMED" | "INELEGABLE";

export type PaymentMethod = "PAYPAL" | "XOOM";

export async function wroteAReviewStatus(user: User): Promise<RewardStatus> {
	if (user.role !== "worker") return "INELEGABLE";

	const transaction = async client => {
		const userPId = await getUserPostgresId(user._id);

		const results = await client.query(
			"SELECT * FROM reward_wrote_a_review WHERE user_id=$1",
			[userPId]
		);

		if (results.rows.length > 0) return "CLAIMED";

		if ((await getReviewsByAuthor(user)).length > 0) return "CAN_CLAIM";

		return "CAN_EARN";
	};

	return execTransactionRO(transaction);
}

export async function claimWroteAReview(
	user: User,
	phoneNumber: string,
	paymentMethod: PaymentMethod
): Promise<RewardStatus> {
	// Check if the user can claim this reward.
	switch (await wroteAReviewStatus(user)) {
		case "CAN_EARN":
			throw Error("NOT_EARNED");
		case "CLAIMED":
			throw Error("ALREADY_CLAIMED");
		case "INELEGABLE":
			throw Error("INELEGABLE");
		default:
	}

	// Check if the phone number is valid.
	const phoneNumberInfo = parsePhoneNumber(phoneNumber);
	// We only accept mexico phone numbers to prevent fake numbers from services
	// like Google Voice.
	if (phoneNumberInfo.country !== "MX") throw Error("NON_MEXICO_NUMBER");

	const transaction = async client => {
		// Check if the phone number has already been used.
		if (
			(await client.query(
				"SELECT * FROM reward_wrote_a_review WHERE phone_number=$1",
				[phoneNumber]
			)).rows.length > 0
		)
			throw Error("PHONENUMBER_ALREADY_USED");

		// All checks have passed. We now give the user their reward.

		// TODO: Call paypal/xoom connector to send the reward.

		const userPId = await getUserPostgresId(user._id);
		await client.query(
			"INSERT INTO reward_wrote_a_review (user_id, phone_number, payment_method) VALUES ($1, $2, $3)",
			[userPId, phoneNumber, paymentMethod]
		);
	};

	return execTransactionRW(transaction).then(() =>
		// Send the new status of the reward as the return value.
		// Should always be "CLAIMED"
		wroteAReviewStatus(user)
	);
}
