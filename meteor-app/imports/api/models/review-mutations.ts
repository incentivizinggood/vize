import { execTransactionRW } from "/imports/api/connectors/postgresql";

import { ReviewId, Company, Review, User } from ".";

export async function submitReview(
	user: User,
	company: Company,
	reviewParams: unknown
): Review {
	throw new Error("Not implemented yet");
}

export async function editReview(id: ReviewId, reviewChanges: unknown): Review {
	throw new Error("Not implemented yet");
}

export async function deleteReview(id: ReviewId): Review {
	throw new Error("Not implemented yet");
}
