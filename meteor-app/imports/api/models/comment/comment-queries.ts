// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import {
	CommentId,
	Comment,
	CommentParent,
	User,
	getUserById,
} from "imports/api/models";

// Get the comment with a given id.
export async function getCommentById(id: CommentId): Promise<Comment> {
	throw new Error("Not implemented yet");
}

// Get all comments written by a given user.
export async function getCommentsByAuthor(
	user: User,
	pageNumber: number,
	pageSize: number
): Promise<Comment[]> {
	throw new Error("Not implemented yet");
}

// Get the user who wrote a given comment.
export async function getAuthorOfComment(comment: Comment): Promise<User> {
	return getUserById(comment.submittedBy);
}

// Get all comments that are about a given thing.
export async function getCommentsByParent(
	parent: CommentParent,
	pageNumber: number,
	pageSize: number
): Promise<Comment[]> {
	throw new Error("Not implemented yet");
}

// Get the thing that a given comment is about or the comment that a given comment is responding to.
export async function getParentOfComment(
	comment: Comment
): Promise<CommentParent> {
	throw new Error("Not implemented yet");
}
