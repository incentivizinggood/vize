// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import { Comment, CommentParent, User, getUserById } from "src/models";

// Get the comment with a given id.
export async function getCommentById(_id: number): Promise<Comment> {
	throw new Error("Not implemented yet");
}

// Get all comments written by a given user.
export async function getCommentsByAuthor(
	_user: User,
	_pageNumber: number,
	_pageSize: number
): Promise<Comment[]> {
	throw new Error("Not implemented yet");
}

// Get the user who wrote a given comment.
export async function getAuthorOfComment(comment: Comment): Promise<User> {
	const user = await getUserById(comment.submittedBy);

	if (user === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return user;
}

// Get all comments that are about a given thing.
export async function getCommentsByParent(
	_parent: CommentParent,
	_pageNumber: number,
	_pageSize: number
): Promise<Comment[]> {
	throw new Error("Not implemented yet");
}

// Get the thing that a given comment is about or the comment that a given comment is responding to.
export async function getParentOfComment(
	_comment: Comment
): Promise<CommentParent> {
	throw new Error("Not implemented yet");
}
