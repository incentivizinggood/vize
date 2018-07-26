// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, AllModels } from "./common.js";
import type CommentModel, { Comment } from "./comment.js";
import type ReviewModel, { Review } from "./review.js";
import type UserModel, { User } from "./user.js";

const defaultPageSize = 100;

export type Vote = {
	_id: ID,
	submittedBy: ID,
	voteSubject: "review" | "comment",
	references: ID,
	value: boolean,
};

export type VoteSubject = Comment | Review;

export default class VoteModel {
	connector: Mongo.Collection;
	commentModel: CommentModel;
	reviewModel: ReviewModel;
	userModel: UserModel;

	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ commentModel, reviewModel, userModel }: AllModels) {
		this.commentModel = commentModel;
		this.reviewModel = reviewModel;
		this.userModel = userModel;
	}

	// Get the vote with a given id.
	// BUG not completely sure what the
	// best way to do this is going to be
	getVoteById(id: ID): Vote {
		return this.connector.findOne(id);
	}

	// Get all votes cast by a given user.
	getVotesByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Vote] {
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
	getAuthorOfVote(vote: Vote): User {
		return this.userModel.getUserById(vote.submittedBy);
	}

	// Get all votes that were cast on a given thing.
	getVotesBySubject(
		subject: VoteSubject,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Vote] {
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
	getSubjectOfVote(vote: Vote): VoteSubject {
		if (vote.voteSubject === "review")
			return this.reviewModel.getReviewById(vote.references);

		if (vote.voteSubject === "comment")
			return this.commentModel.getCommentById(vote.references);

		throw new Error("vote.voteSubject is not a valid value");
	}

	// Get all of the votes.
	getAllVotes(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Vote] {
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
	castVote(user: User, subject: VoteSubject, isUpvote: boolean): Vote {
		throw new Error("Not implemented yet");
	}

	// Remove a vote. If there is no vote, do nothing.
	removeVote(user: User, subject: VoteSubject): Vote {
		throw new Error("Not implemented yet");
	}
}
