import pool from "./connection-pool.js";

export default class CommentConnector {
	static async getCommentById(id) {}

	static async getAllComments(skip, limit) {}

	static async getCommentsByAuthor(id, skip, limit) {}

	static async writeComment(comment) {}

	//	editComment

	//	deleteComment
}
