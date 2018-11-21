// @flow
// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import type { ID, Comment, CommentParent, User } from ".";

export async function writeComment(
	user: User,
	parent: CommentParent,
	commentParams: mixed
) {
	throw new Error("Not implemented yet");
}

export async function editComment(id: ID, commentChanges: mixed) {
	throw new Error("Not implemented yet");
}

export async function deleteComment(id: ID) {
	throw new Error("Not implemented yet");
}
