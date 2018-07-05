import pool from "./connection-pool.js";

export default class VoteConnector {
	static async getAllVotes(skip, limit) {}

	static async getVotesByAuthor(id, skip, limit) {}

	static async getVotesForSubject(subject, refersto, skip, limit) {}

	static async castVote(vote) {}

	//	getVoteById(id) -> currently not possible, does it even make sense?

	//	removeVote
}
