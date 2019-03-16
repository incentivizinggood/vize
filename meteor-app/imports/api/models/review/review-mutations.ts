import { execTransactionRW } from "imports/api/connectors/postgresql";

import { ReviewId, Company, Review, User } from "imports/api/models";

export async function submitReview(
	user: User,
	company: Company,
	reviewParams: unknown
): Promise<Review> {
	throw new Error("Not implemented yet");
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
