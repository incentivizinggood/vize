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
	static async getCommentById(id) {
		const client = await pool.connect();
		let commentResults = { rows: [] };
		let voteResults = { rows: [] };
		try {
			await client.query("START TRANSACTION READ ONLY");

			commentResults = await client.query(
				"SELECT * FROM review_comments WHERE commentid=$1",
				[id]
			);

			voteResults = await client.query(
				"SELECT * FROM comment_vote_counts WHERE refersto=$1",
				[id]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			comment: commentResults.rows[0],
			votes: voteResults.rows[0],
		};
	}

	static async getAllComments(skip, limit) {
		const client = await pool.connect();
		let commentResults = { rows: [] };
		let voteResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			commentResults = await client.query(
				"SELECT * FROM review_comments OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			for (let comment of commentResults.rows) {
				let votes = await client.query(
					"SELECT * FROM comment_vote_counts WHERE refersto=$1",
					[comment.commentid]
				);

				voteResults[comment.commentid] = votes.rows[0];
			}

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			comments: commentResults.rows,
			votes: voteResults,
		};
	}

	static async getCommentsByAuthor(id, skip, limit) {
		const client = await pool.connect();
		let commentResults = { rows: [] };
		let voteResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			commentResults = await client.query(
				"SELECT * FROM review_comments WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);

			for (let comment of commentResults.rows) {
				let votes = await client.query(
					"SELECT * FROM comment_vote_counts WHERE refersto=$1",
					[comment.commentid]
				);

				voteResults[comment.commentid] = votes.rows[0];
			}

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			comments: commentResults.rows,
			votes: voteResults,
		};
	}

	static async writeComment(comment) {
		// assumes that the comment follows a SimplSchema-esque
		// JSON format, and that it has no flags, upvotes, or
		// downvotes yet
		const client = await pool.connect();
		let newComment = { rows: [] };
		try {
			await client.query("START TRANSACTION");

			newComment = await client.query(
				"INSERT INTO review_comments (reviewid,submittedby,content)" +
					"VALUES ($1,$2,$3) RETURNING *",
				[comment.reviewId, comment.submittedBy, comment.content]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			comment: newComment.rows[0],
		};
	}

	//	editComment

	//	deleteComment
}
