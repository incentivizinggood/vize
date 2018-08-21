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
import castToNumberIfDefined from "./misc.js";

export default class PgCommentFunctions {
	static async getCommentById(client, id) {
		let commentResults = { rows: [] };
		let voteResults = { rows: [] };

		try {
			commentResults = await client.query(
				"SELECT * FROM review_comments WHERE commentid=$1",
				[id]
			);

			voteResults = await client.query(
				"SELECT * FROM comment_vote_counts WHERE refersto=$1",
				[id]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				comment: commentResults.rows[0],
				votes: voteResults.rows[0],
			};
		}
	}

	static async getAllComments(client, skip, limit) {
		let commentResults = { rows: [] };
		let voteResults = {};

		try {
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
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				comments: commentResults.rows,
				votes: voteResults,
			};
		}
	}

	static async getCommentsByAuthor(client, id, skip, limit) {
		let commentResults = { rows: [] };
		let voteResults = {};

		try {
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
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				comments: commentResults.rows,
				votes: voteResults,
			};
		}
	}

	static async writeComment(client, comment) {
		// assumes that the comment follows a SimplSchema-esque
		// JSON format, and that it has no flags, upvotes, or
		// downvotes yet
		try {
			let newComment = { rows: [] };
			newComment = await client.query(
				"INSERT INTO review_comments (reviewid,submittedby,content)" +
					"VALUES ($1,$2,$3) RETURNING *",
				[comment.reviewId, comment.submittedBy, comment.content]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				comment: newComment.rows[0],
				votes: {
					refersto: newComment.commentid,
					upvotes: 0,
					downvotes: 0,
				},
			};
		}
	}

	static processCommentResults(commentResults) {
		/*
			Expects argument to have fields:
			comment (singular) or comments(array)
			and votes (singular or array, depending
			on comment or comments)
		*/
		if (commentResults.comment !== undefined) {
			const comment = commentResults.comment;
			return {
				_id: Number(comment.commentid),
				datePosted: comment.dateadded,
				content: comment.content,
				refersto: Number(comment.reviewid),
				submittedBy: castToNumberIfDefined(comment.submittedby),
				upvotes: Number(commentResults.votes.upvotes),
				downvotes: Number(commentResults.votes.downvotes),
			};
		} else if (commentResults.comments !== undefined) {
			return commentResults.comments.map(comment => {
				return {
					_id: Number(comment.commentid),
					datePosted: comment.dateadded,
					content: comment.content,
					refersto: Number(comment.reviewid),
					submittedBy: castToNumberIfDefined(comment.submittedby),
					upvotes: Number(
						commentResults.votes[comment.commentid].upvotes
					),
					downvotes: Number(
						commentResults.votes[comment.commentid].downvotes
					),
				};
			});
		}
		return undefined;
	}

	//	editComment
	//	deleteComment
}
