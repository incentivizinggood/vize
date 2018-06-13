const defaultPageSize = 100;

export default class VoteModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ commentModel, reviewModel, userModel }) {
		this.commentModel = commentModel;
		this.reviewModel = reviewModel;
		this.userModel = userModel;
	}

	// Get the vote with a given id.
	getVoteById(id) {
		return this.connector.findOne(id);
	}

	// Get all votes cast by a given user.
	getVotesByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the user who cast a given vote.
	getAuthorOfVote(vote) {
		return this.userModel.getUserById(vote.submittedBy);
	}

	// Get all votes that were cast on a given thing.
	getVotesBySubject(subject, pageNumber = 0, pageSize = defaultPageSize) {
		let voteSubject;
		if (this.reviewModel.isReview(subject)) {
			voteSubject = "review";
		} else if (this.commentModel.isComment(subject)) {
			voteSubject = "comment";
		} else {
			throw new Error(
				"Could not determine the type of this vote subject."
			);
		}

		const cursor = this.connector.find(
			{ voteSubject, references: subject._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the thing that a given vote was cast on.
	getSubjectOfVote(vote) {
		if (vote.voteSubject === "review")
			return this.reviewModel.getReviewById(vote.references);

		if (vote.voteSubject === "comment")
			return this.commentModel.getCommentById(vote.references);

		// It should be imposible to get here.
		// TODO throw a more informative error message.
		return null;
	}

	// Get all of the votes.
	getAllVotes(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	// Create a new vote or, if the subject was already voted on, change the vote.
	castVote(user, subject, isUpvote) {
		throw new Error("Not implemented yet");
	}

	// Remove a vote. If there is no vote, do nothing.
	removeVote(user, subject) {
		throw new Error("Not implemented yet");
	}
}
