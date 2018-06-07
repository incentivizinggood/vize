import { Comments } from "../data/comments.js";

const defaultPageSize = 100;

const CommentModel = {
	// Get the comment with a given id.
	getById(id) {
		return Comments.findOne(id);
	},

	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheAuthor(comment) {
		throw new Error("Not implemented yet");
	},

	getByParent(parent, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
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
};

export default CommentModel;
