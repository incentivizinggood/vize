import { Votes } from "../data/votes.js";

const defaultPageSize = 100;

const VoteModel = {
	// Get the vote with a given id.
	getById(id) {
		return Votes.findOne(id);
	},

	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheAuthor(vote) {
		throw new Error("Not implemented yet");
	},

	getBySubject(subject, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheSubject(vote) {
		throw new Error("Not implemented yet");
		if (vote.voteSubject === "review")
			return Reviews.findOne(vote.references);

		// It should be imposible to get here.
		// TODO throw a more informative error message.
		return null;
	},

	// Get all of the votes.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Votes.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},
};

export default VoteModel;
