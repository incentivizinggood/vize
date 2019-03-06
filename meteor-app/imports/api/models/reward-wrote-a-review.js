// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";

import type { User } from ".";
import { getReviewsByAuthor, getUserPostgresId } from ".";

export type RewardStatus = "CAN_EARN" | "CAN_CLAIM" | "CLAIMED" | "INELIGIBLE";

export type ClaimWroteAReviewResult =
	| "OK"
	| "NOT_EARNED"
	| "ALREADY_CLAIMED"
	| "INELIGIBLE"
	| "PHONENUMBER_INVALID"
	| "PHONENUMBER_ALREADY_USED";

export type PaymentMethod = "PAYPAL" | "XOOM";

export async function wroteAReviewStatus(user: User): Promise<RewardStatus> {
	if (user.role !== "worker") return "INELIGIBLE";

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
): Promise<ClaimWroteAReviewResult> {
	// Check if the user can claim this reward.
	switch (await wroteAReviewStatus(user)) {
		case "CAN_EARN":
			return "NOT_EARNED";
		case "CLAIMED":
			return "ALREADY_CLAIMED";
		case "INELIGIBLE":
			return "INELIGIBLE";
		default:
	}

	// Check if the phone number is valid.

	const transaction = async client => {
		// Check if the phone number has already been used.
		if (
			(await client.query(
				"SELECT * FROM reward_wrote_a_review WHERE phone_number=$1",
				[phoneNumber]
			)).rows.length > 0
		)
			return "PHONENUMBER_ALREADY_USED";

		// All checks have passed. We now give the user their reward.

		// TODO: Call paypal/xoom connector to send the reward.

		const userPId = await getUserPostgresId(user._id);
		await client.query(
			"INSERT INTO reward_wrote_a_review (user_id, phone_number, payment_method) VALUES ($1, $2, $3)",
			[userPId, phoneNumber, paymentMethod]
		);

		return "OK";
	};

	return execTransactionRW(transaction);
}
