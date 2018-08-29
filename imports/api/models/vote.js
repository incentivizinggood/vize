// @flow
import type { ID, AllModels } from "./common.js";
import type CommentModel, { Comment } from "./comment.js";
import type ReviewModel, { Review } from "./review.js";
import type UserModel, { User } from "./user.js";

import PgVoteFunctions from "./helpers/postgresql/votes.js";
import Votes from "../data/votes.js";

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
	connector: Object;
	commentModel: CommentModel;
	reviewModel: ReviewModel;
	userModel: UserModel;

	constructor(connector: Object) {
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
	async getVoteById(id: ID): Vote {
		// requires ID to be a JSON.parse-able
		// string with the fields/types:
		// voteSubject: "review" or "comment"
		// submittedBy: integer
		// references: integer
		return PgVoteFunctions.processVoteResults(
			await this.connector.executeQuery(
				PgVoteFunctions.getVoteByPrimaryKey,
				JSON.parse(id)
			)
		);
	}

	// Get the vote cast by a given user on a given thing.
	async getVoteByAuthorAndSubject(user: User, subject: VoteSubject): Vote {
		let subjectOfVote;
		if (this.reviewModel.isReview(subject)) {
			subjectOfVote = "review";
		} else if (this.commentModel.isComment(subject)) {
			subjectOfVote = "comment";
		} else {
			throw new Error(
				"Could not determine the type of this vote subject."
			);
		}

		const authorPostgresId = await this.userModel.getUserPostgresId(
			user._id
		);

		return PgVoteFunctions.processVoteResults(
			await this.connector.executeQuery(
				PgVoteFunctions.getVoteByPrimaryKey,
				{
					submittedBy: authorPostgresId,
					voteSubject: subjectOfVote,
					references: subject._id,
				}
			)
		);
	}

	// Get all votes cast by a given user.
	async getVotesByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Vote] {
		const authorPostgresId = await this.userModel.getUserPostgresId(
			user._id
		);

		// result has reviewVotes and commentVotes,
		// two arrays of votes by the author for
		// the respective voteSubjects.
		return this.connector.executeQuery(
			PgVoteFunctions.getVotesByAuthor,
			authorPostgresId,
			pageNumber * pageSize,
			pageSize
		);
	}

	// Get the user who cast a given vote.
	async getAuthorOfVote(vote: Vote): User {
		return this.userModel.getUserById(String(vote.submittedBy));
	}

	// Get all votes that were cast on a given thing.
	async getVotesBySubject(
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

		// result has subject (string "review" or "comment")
		// and votes, the query results from the underlying
		// vote counting view for that item. Although pageNumber
		// and pageSize are indeed use (for offset and limit)
		// in the underlying query, they don't have much meaning
		// as each such query should yield exactly 1 or 0 results.

		return this.connector.executeQuery(
			PgVoteFunctions.getVotesForSubject,
			voteSubject,
			subject._id,
			pageNumber * pageSize,
			pageSize
		);
	}

	// Get the thing that a given vote was cast on.
	async getSubjectOfVote(vote: Vote): VoteSubject {
		if (vote.voteSubject === "review")
			return this.reviewModel.getReviewById(String(vote.references));

		if (vote.voteSubject === "comment")
			return this.commentModel.getCommentById(String(vote.references));

		throw new Error("vote.voteSubject is not a valid value");
	}

	// Get all of the votes.
	async getAllVotes(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Vote] {
		// result has reviewVotes and commentVotes,
		// two arrays of votes which contain all the
		// vote counts for every review and comment respectively.

		return this.connector.executeQuery(
			PgVoteFunctions.getAllVotes,
			pageNumber * pageSize,
			pageSize
		);
	}

	isVote(obj: any): boolean {
		return Votes.schema
			.newContext()
			.validate(obj)
			.isValid();
	}

	// Create a new vote or, if the subject was already voted on, change the vote.
	async castVote(user: User, subject: VoteSubject, isUpvote: boolean): Vote {
		throw new Error("Not implemented yet");
	}

	// Remove a vote. If there is no vote, do nothing.
	async removeVote(user: User, subject: VoteSubject): Vote {
		throw new Error("Not implemented yet");
	}
}
