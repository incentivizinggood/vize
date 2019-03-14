// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import { CommentId, Comment, CommentParent, User } from ".";

export async function writeComment(
	user: User,
	parent: CommentParent,
	commentParams: unknown
) {
	throw new Error("Not implemented yet");
}

export async function editComment(id: CommentId, commentChanges: unknown) {
	throw new Error("Not implemented yet");
}

export async function deleteComment(id: CommentId) {
	throw new Error("Not implemented yet");
}
