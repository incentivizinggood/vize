const defaultPageSize = 100;

export default class CommentModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ userModel }) {
		this.userModel = userModel;
	}

	// Get the comment with a given id.
	getById(id) {
		return this.connector.findOne(id);
	}

	// Get all comments written by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
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
	getTheAuthor(comment) {
		return this.userModel.getByUsername(comment.username);
	}

	// Get all comments that are about a given thing.
	getByParent(parent, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	}
	// Get the thing that a given comment is about or the comment that a given comment is responding to.
	getTheParent(comment) {
		throw new Error("Not implemented yet");
	}

	// Get all of the comments.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
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
}
