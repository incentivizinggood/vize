// @flow
import type { ID } from "./common.js";
import type { User } from "./user.js";
import type { Review } from "./review.js";
import { getUserPostgresId, getUserById } from ".";

import PgCommentFunctions from "./helpers/postgresql/comments.js";
import PostgreSQL from "../graphql/connectors/postgresql.js";
import { CommentSchema } from "../data/comments.js";

const defaultPageSize = 100;

export type Comment = {
	_id: ID,
	submittedBy: ID,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

// Get the comment with a given id.
export async function getCommentById(id: ID): Promise<?Comment> {
	if (!Number.isNaN(Number(id)))
		return PgCommentFunctions.processCommentResults(
			await PostgreSQL.executeQuery(
				PgCommentFunctions.getCommentById,
				Number(id)
			)
		);
	return undefined;
}

// Get all comments written by a given user.
export async function getCommentsByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Comment]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	return PgCommentFunctions.processCommentResults(
		await PostgreSQL.executeQuery(
			PgCommentFunctions.getCommentsByAuthor,
			authorPostgresId,
			pageNumber * pageSize,
			pageSize
		)
	);
}

// Get the user who wrote a given comment.
export async function getAuthorOfComment(comment: Comment): Promise<User> {
	return getUserById(String(comment.submittedBy));
}

// Get all comments that are about a given thing.
export async function getCommentsByParent(
	parent: CommentParent,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): [Comment] {
	throw new Error("Not implemented yet");
}

// Get the thing that a given comment is about or the comment that a given comment is responding to.
export async function getParentOfComment(comment: Comment): CommentParent {
	throw new Error("Not implemented yet");
}

// Get all of the comments.
export async function getAllComments(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Comment]> {
	return PgCommentFunctions.processCommentResults(
		await PostgreSQL.executeQuery(
			PgCommentFunctions.getAllComments,
			pageNumber * pageSize,
			pageSize
		)
	);
}

export function isComment(obj: any): boolean {
	// CommentSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = CommentSchema.newContext();
	context.validate(obj);
	return context.isValid();
}

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
