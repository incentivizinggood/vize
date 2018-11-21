// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ID, Company, Review, User } from ".";

export async function submitReview(
	user: User,
	company: Company,
	reviewParams: mixed
): Review {
	throw new Error("Not implemented yet");
}

export async function editReview(id: ID, reviewChanges: mixed): Review {
	throw new Error("Not implemented yet");
}

export async function deleteReview(id: ID): Review {
	throw new Error("Not implemented yet");
}
