import { PgId, Branded } from "imports/api/models";

export type ReviewId = Branded<PgId, "ReviewId">;

export function reviewIdToString(id: ReviewId): string {
	return String(id);
}

export function stringToReviewId(id: string): ReviewId {
	return Number(id) as ReviewId;
}
