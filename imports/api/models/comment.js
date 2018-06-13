// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, AllModels } from "./common.js";
import type UserModel, { User } from "./user.js";
import type ReviewModel, { Review } from "./review.js";

const defaultPageSize = 100;

export type Comment = {
	_id: ID,
	username: string,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

export default class CommentModel {
	connector: Mongo.Collection;
	reviewModel: ReviewModel;
	userModel: UserModel;

	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ reviewModel, userModel }: AllModels) {
		this.reviewModel = reviewModel;
		this.userModel = userModel;
	}

	// Get the comment with a given id.
	getCommentById(id: ID): Comment {
		return this.connector.findOne(id);
	}

	// Get all comments written by a given user.
	getCommentsByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		const cursor = this.connector.find(
			{ username: user.username },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the user who wrote a given comment.
	getAuthorOfComment(comment: Comment): User {
		return this.userModel.getUserByUsername(comment.username);
	}

	// Get all comments that are about a given thing.
	getCommentsByParent(
		parent: CommentParent,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		throw new Error("Not implemented yet");
	}
	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	getParentOfComment(comment: Comment): CommentParent {
		throw new Error("Not implemented yet");
	}

	// Get all of the comments.
	getAllComments(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Comment] {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	isComment(obj: any): boolean {
		throw new Error("Not implemented yet");
	}

	writeComment(user: User, parent: CommentParent, commentParams) {
		throw new Error("Not implemented yet");
	}

	editComment(id: ID, commentChanges) {
		throw new Error("Not implemented yet");
	}

	deleteComment(id: ID) {
		throw new Error("Not implemented yet");
	}
}
