// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import { PgId, Branded } from "imports/api/models";

export type CommentId = Branded<PgId, "CommentId">;

export function commentIdToString(id: CommentId): string {
	return String(id);
}

export function stringToCommentId(id: string): CommentId {
	return Number(id) as CommentId;
}
