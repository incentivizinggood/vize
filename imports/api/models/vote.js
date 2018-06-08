import { Votes } from "../data/votes.js";
import CommentModel from "/imports/api/models/comment.js";
import ReviewModel from "/imports/api/models/review.js";
import UserModel from "/imports/api/models/user.js";

const defaultPageSize = 100;

const VoteModel = {
	// Get the vote with a given id.
	getById(id) {
		return Votes.findOne(id);
	},

	// Get all votes cast by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Votes.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the user who cast a given vote.
	getTheAuthor(vote) {
		return UserModel.getById(vote.submittedBy);
	},

	// Get all votes that were cast on a given thing.
	getBySubject(subject, pageNumber = 0, pageSize = defaultPageSize) {
		let voteSubject;
		if (ReviewModel.isReview(subject)) {
			voteSubject = "review";
		} else if (CommentModel.isComment(subject)) {
			voteSubject = "comment";
		} else {
			throw new Error(
				"Could not determine the type of this vote subject."
			);
		}

		const cursor = Votes.find(
			{ voteSubject, references: subject._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the thing that a given vote was cast on.
	getTheSubject(vote) {
		if (vote.voteSubject === "review")
			return ReviewModel.getById(vote.references);

		if (vote.voteSubject === "comment")
			return CommentModel.getById(vote.references);

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
