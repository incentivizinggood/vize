import pool from "./connection-pool.js";
/*
	I'm kind-of improvising this class until we figure
	out what the comments actually "look like", what
	their format is going to be, because the current
	SimplSchema is inadequate and I'm not sure if we
	need to support comments on comments as well as
	on reviews.

	Right now I'm assuming that we only have comments
	on reviews, and that each author is identified by their
	numeric PostgreSQL user id (represented as a serial
	in the not-yet-implemented users table). This is closer
	to the current PostgreSQL review_comments shema than
	to either the current SimplSchema or the Flow type
	in models/comment.js.
*/
export default class CommentConnector {
	static async getCommentById(id) {}

	static async getAllComments(skip, limit) {}

	static async getCommentsByAuthor(id, skip, limit) {}

	static async writeComment(comment) {}

	//	editComment

	//	deleteComment
}
