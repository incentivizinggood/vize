// @flow
import type { ID } from "./common.js";
import type UserModel, { User } from "./user.js";
import type ReviewModel, { Review } from "./review.js";

import PgCommentFunctions from "./helpers/postgresql/comments.js";
import type PostgreSQL from "../graphql/connectors/postgresql.js";
import { CommentSchema } from "../data/comments.js";

const defaultPageSize = 100;

export type Comment = {
	_id: ID,
	submittedBy: ID,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

const commentModel = (dataModel, postgreSQL: PostgreSQL) => ({
	// Get the comment with a given id.
	async getCommentById(id: ID): Promise<?Comment> {
		if (!Number.isNaN(Number(id)))
			return PgCommentFunctions.processCommentResults(
				await postgreSQL.executeQuery(
					PgCommentFunctions.getCommentById,
					Number(id)
				)
			);
		return undefined;
	},

	// Get all comments written by a given user.
	async getCommentsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Comment]> {
		const authorPostgresId = await dataModel.getUserPostgresId(user._id);

		return PgCommentFunctions.processCommentResults(
			await postgreSQL.executeQuery(
				PgCommentFunctions.getCommentsByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	// Get the user who wrote a given comment.
	async getAuthorOfComment(comment: Comment): Promise<User> {
		return dataModel.getUserById(String(comment.submittedBy));
	},

	// Get all comments that are about a given thing.
	async getCommentsByParent(
		parent: CommentParent,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		throw new Error("Not implemented yet");
	},

	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	async getParentOfComment(comment: Comment): CommentParent {
		throw new Error("Not implemented yet");
	},

	// Get all of the comments.
	async getAllComments(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Comment]> {
		return PgCommentFunctions.processCommentResults(
			await postgreSQL.executeQuery(
				PgCommentFunctions.getAllComments,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	isComment(obj: any): boolean {
		// CommentSchema
		// 	.newContext()
		// 	.validate(obj);
		const context = CommentSchema.newContext();
		context.validate(obj);
		return context.isValid();
	},

	async writeComment(
		user: User,
		parent: CommentParent,
		commentParams: mixed
	) {
		throw new Error("Not implemented yet");
	},

	async editComment(id: ID, commentChanges: mixed) {
		throw new Error("Not implemented yet");
	},
	async deleteComment(id: ID) {
		throw new Error("Not implemented yet");
	},
});

export default commentModel;
