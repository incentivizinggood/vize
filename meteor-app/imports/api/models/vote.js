// @flow
import { VoteSchema } from "/imports/api/data/votes.js";

import type { CommentId, ReviewId, UserPId, Comment, Review, User } from ".";
import { isReview, isComment } from ".";

export type CommentVote = {
	submittedby: UserPId,
	subjecttype: "comment",
	refersto: CommentId,
	value: boolean,
	dateadded: Date,
};

export type ReviewVote = {
	submittedby: UserPId,
	subjecttype: "review",
	refersto: ReviewId,
	value: boolean,
	dateadded: Date,
};

export type Vote = ReviewVote | CommentVote;

export type VoteSubject = Comment | Review;

// Get the foreign key that a vote cast on this subject would have.
export function getVoteSubjectRef(
	subject: VoteSubject
): { subjectType: "review" | "comment", refersTo: CommentId | ReviewId } {
	if (isReview(subject)) {
		return { subjectType: "review", refersTo: subject.reviewid };
	} else if (isComment(subject)) {
		return { subjectType: "comment", refersTo: subject._id };
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}
}

// Determine if obj is a valid vote. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
export function isVote(obj: any): boolean {
	// VoteSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = VoteSchema.newContext();
	context.validate(obj);
	return context.isValid();
}
