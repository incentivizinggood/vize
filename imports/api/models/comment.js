import { Comments } from "../data/comments.js";
import UserModel from "./user.js";

const defaultPageSize = 100;

const CommentModel = {
	// Get the comment with a given id.
	getById(id) {
		return Comments.findOne(id);
	},

	// Get all comments written by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Comments.find(
			{ username: user.username },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the user who wrote a given comment.
	getTheAuthor(comment) {
		return UserModel.getByUsername(comment.username);
	},

	// Get all comments that are about a given thing.
	getByParent(parent, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	getTheParent(comment) {
		throw new Error("Not implemented yet");
	},

	// Get all of the comments.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Comments.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},

	isComment(obj) {
		throw new Error("Not implemented yet");
	},
};

export default CommentModel;
