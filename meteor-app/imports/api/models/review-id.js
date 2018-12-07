// @flow

import type { PgId } from ".";

export opaque type ReviewId = PgId;

export function reviewIdToString(id: ReviewId): string {
	return String(id);
}

export function stringToReviewId(id: string): ReviewId {
	return Number(id);
}
