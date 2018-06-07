import { Comments } from "../data/comments.js";

const CommentModel = {
	// Get the comment with a given id.
	getById(id) {
		return Comments.findOne(id);
	},

	// Get all of the comments.
	getAll(pageNumber = 0, pageSize = 100) {
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
