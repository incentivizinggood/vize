// @flow
import type { ID, AllModels } from "./common.js";
import type UserModel, { User } from "./user.js";
import type ReviewModel, { Review } from "./review.js";

import PgCommentFunctions from "./helpers/postgresql/comments.js";
import { Comments } from "../data/comments.js";

const defaultPageSize = 100;

export type Comment = {
	_id: ID,
	username: string,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

export default class CommentModel {
	connector: Object;
	reviewModel: ReviewModel;
	userModel: UserModel;

	constructor(connector: Object) {
		this.connector = connector;
	}

	init({ reviewModel, userModel }: AllModels) {
		this.reviewModel = reviewModel;
		this.userModel = userModel;
	}

	// Get the comment with a given id.
	async getCommentById(id: ID): Comment {
		if (!Number.isNaN(Number(id)))
			return PgCommentFunctions.processCommentResults(
				await this.connector.executeQuery(
					PgCommentFunctions.getCommentById,
					Number(id)
				)
			);
		return undefined;
	}

	// Get all comments written by a given user.
	async getCommentsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		const authorPostgresId = await this.userModel.getUserPostgresId(
			user._id
		);

		return PgCommentFunctions.processCommentResults(
			await this.connector.executeQuery(
				PgCommentFunctions.getCommentsByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	// Get the user who wrote a given comment.
	async getAuthorOfComment(comment: Comment): User {
		return this.userModel.getUserById(String(comment.submittedBy));
	}

	// Get all comments that are about a given thing.
	async getCommentsByParent(
		parent: CommentParent,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		throw new Error("Not implemented yet");
	}

	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	async getParentOfComment(comment: Comment): CommentParent {
		throw new Error("Not implemented yet");
	}

	// Get all of the comments.
	async getAllComments(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		return PgCommentFunctions.processCommentResults(
			await this.connector.executeQuery(
				PgCommentFunctions.getAllComments,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	isComment(obj: any): boolean {
		// Comments.simpleSchema()
		// 	.newContext()
		// 	.validate(obj);
		const context = Comments.simpleSchema().newContext();
		context.validate(obj);
		return context.isValid();
	}

	async writeComment(
		user: User,
		parent: CommentParent,
		commentParams: mixed
	) {
		throw new Error("Not implemented yet");
	}

	async editComment(id: ID, commentChanges: mixed) {
		throw new Error("Not implemented yet");
	}

	async deleteComment(id: ID) {
		throw new Error("Not implemented yet");
	}
}
