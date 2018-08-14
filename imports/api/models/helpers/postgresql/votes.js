export default class PgVoteFunctions {
	static async getVoteByPrimaryKey(client, voteKeyFields) {
		let voteResults = { rows: [] };
		if (
			voteKeyFields.voteSubject !== "review" &&
			voteKeyFields.voteSubject !== "comment"
		)
			throw new Error("Illegal subject: table does not exist");

		voteResults = await client.query(
			"SELECT * FROM " +
				voteKeyFields.voteSubject +
				"_votes WHERE submittedby=$1 AND refersto=$2",
			[voteKeyFields.submittedBy, voteKeyFields.references]
		);

		return {
			subject: voteKeyFields.voteSubject,
			vote: voteResults.rows[0],
		};
	}

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
			subject: subject,
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
			subject: vote.voteSubject,
			vote: voteResults.rows[0],
		};
	}

	static processVoteResults(voteResults) {
		/*
			Argument can be:
			vote (singular) or
			*IGNORE...*
			votes (array) and subject,
			or reviewVotes and commentVotes
			*...TO HERE*
		*/
		if (
			voteResults.vote !== undefined &&
			(voteResults.subject === "review" ||
				voteResults.subject === "comment")
		) {
			const vote = voteResults.vote;
			return {
				submittedBy: Number(vote.submittedby),
				voteSubject: voteResults.subject,
				references: Number(vote.refersto),
				value: vote.value,
				dateAdded: vote.dateadded,
			};
		}

		// Just realized that the votes case is equivalent
		// to querying the object the votes are for and discarding
		// everything about the object except the votes,
		// which seems kind of pointless. Skipping for now,
		// and will ignore until we think of some actual use case.

		// Just realized that the reviewVotes/commentVotes case
		// goes through the views, just like the votes case.
		// Not sure how we would need to process the results,
		// because I'm not sure how it would be used. Skipping for now.

		return undefined;
	}

	//	getVoteById(id)
	//	removeVote
}
