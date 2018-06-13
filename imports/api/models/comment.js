const defaultPageSize = 100;

export default class CommentModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ userModel }) {
		this.userModel = userModel;
	}

	// Get the comment with a given id.
	getCommentById(id) {
		return this.connector.findOne(id);
	}

	// Get all comments written by a given user.
	getCommentsByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
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
	getAuthorOfComment(comment) {
		return this.userModel.getUserByUsername(comment.username);
	}

	// Get all comments that are about a given thing.
	getCommentsByParent(parent, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	}
	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	getParentOfComment(comment) {
		throw new Error("Not implemented yet");
	}

	// Get all of the comments.
	getAllComments(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	isComment(obj) {
		throw new Error("Not implemented yet");
	}

	writeComment(user, parent, commentParams) {
		throw new Error("Not implemented yet");
	}

	editComment(id, commentChanges) {
		throw new Error("Not implemented yet");
	}

	deleteComment(id) {
		throw new Error("Not implemented yet");
	}
}
