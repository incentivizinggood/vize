import pool from "./connection-pool.js";

export default class VoteConnector {
	// this goes through the view under the hood,
	// rather than making the caller aggregate the data
	static async getAllVotes(skip, limit) {}

	// ditto
	static async getVotesForSubject(subject, refersto, skip, limit) {}

	static async getVotesByAuthor(id, skip, limit) {}

	static async castVote(vote) {}

	//	getVoteById(id) -> currently not possible, does it even make sense or would it even be remotely useful?

	//	removeVote
}
