export default class PgVoteFunctions {
	// this goes through the view under the hood,
	// rather than making the caller aggregate the data
	static async getAllVotes(client, skip, limit) {
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };
		reviewVoteResults = await client.query(
			"SELECT * FROM review_vote_counts OFFSET $1 LIMIT $2",
			[skip, limit]
		);
		commentVoteResults = await client.query(
			"SELECT * FROM comment_vote_counts OFFSET $1 LIMIT $2",
			[skip, limit]
		);
		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	}

	// ditto
	static async getVotesForSubject(client, subject, refersto, skip, limit) {
		let voteResults = { rows: [] };
		if (subject !== "review" && subject !== "comment")
			throw new Error("Illegal subject: table does not exist");
		voteResults = await client.query(
			"SELECT * FROM " +
				subject +
				"_vote_counts WHERE " +
				"refersto=$1 OFFSET $2 LIMIT $3",
			[refersto, skip, limit]
		);
		return {
			votes: voteResults.rows[0],
		};
	}

	static async getVotesByAuthor(client, id, skip, limit) {
		let reviewVoteResults = { rows: [] };
		let commentVoteResults = { rows: [] };
		reviewVoteResults = await client.query(
			"SELECT * FROM review_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[id, skip, limit]
		);
		commentVoteResults = await client.query(
			"SELECT * FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[id, skip, limit]
		);
		return {
			reviewVotes: reviewVoteResults.rows,
			commentVotes: commentVoteResults.rows,
		};
	}

	static async castVote(client, vote) {
		let voteResults = { rows: [] };
		if (vote.voteSubject !== "review" && vote.voteSubject !== "comment")
			throw new Error("Illegal subject: table does not exist");
		const tblName = vote.voteSubject + "_votes";
		voteResults = await client.query(
			"INSERT INTO " +
			tblName +
			" (refersto,submittedby,value) " +
			"VALUES ($1,$2,$3) " +
			"ON CONFLICT (submittedby,refersto) DO UPDATE SET value=$3 " + // I love PostgreSQL
				"RETURNING *",
			[vote.references, vote.submittedBy, vote.value]
		);
		return {
			vote: voteResults.rows[0],
		};
	}

	//	getVoteById(id)
	//	removeVote
}
