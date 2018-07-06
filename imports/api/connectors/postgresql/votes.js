import pool from "./connection-pool.js";

export default class VoteConnector {
	// this goes through the view under the hood,
	// rather than making the caller aggregate the data
	static async getAllVotes(skip, limit) {
		const client = await pool.connect();
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewVoteResults = await client.query(
				"SELECT * FROM review_vote_counts OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			commentVoteResults = await client.query(
				"SELECT * FROM comment_vote_counts OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	}

	// ditto
	static async getVotesForSubject(subject, refersto, skip, limit) {
		const client = await pool.connect();
		let voteResults = { rows: [] };
		try {
			if (subject !== "review" && subject !== "comment")
				throw "Illegal subject: table does not exist";
			await client.query("START TRANSACTION READ ONLY");

			voteResults = await client.query(
				"SELECT * FROM " +
					subject +
					"_vote_counts WHERE " +
					"refersto=$1 OFFSET $2 LIMIT $3",
				[refersto, skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			votes: voteResults.rows[0],
		};
	}

	static async getVotesByAuthor(id, skip, limit) {
		const client = await pool.connect();
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };
		try {
			await client.query("START TRANSACTION READ ONLY");

			reviewVoteResults = await client.query(
				"SELECT * FROM review_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);

			commentVoteResults = await client.query(
				"SELECT * FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	}

	static async castVote(vote) {}

	//	getVoteById(id) -> currently not possible, does it even make sense or would it even be remotely useful?

	//	removeVote
}
