import { Votes } from "../data/votes.js";

const VoteModel = {
	// Get the vote with a given id.
	getById(id) {
		return Votes.findOne(id);
	},

	// Get all of the votes.
	getAll(pageNumber = 0, pageSize = 100) {
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
