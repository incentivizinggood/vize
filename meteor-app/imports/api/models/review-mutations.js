// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ReviewId, Company, Review, User } from ".";

export async function submitReview(
	user: User,
	company: Company,
	reviewParams: mixed
): Review {
	throw new Error("Not implemented yet");
}

export async function editReview(id: ReviewId, reviewChanges: mixed): Review {
	throw new Error("Not implemented yet");
}

export async function deleteReview(id: ReviewId): Review {
	throw new Error("Not implemented yet");
}
