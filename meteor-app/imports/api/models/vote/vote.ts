import {
	CommentId,
	ReviewId,
	UserPId,
	Comment,
	Review,
} from "imports/api/models";

export type CommentVote = {
	submittedBy: UserPId;
	subjectType: "comment";
	refersTo: CommentId;
	isUpvote: boolean;
};

export type ReviewVote = {
	submittedBy: UserPId;
	subjectType: "review";
	refersTo: ReviewId;
	isUpvote: boolean;
};

export type Vote = ReviewVote | CommentVote;

export type VoteSubject = Comment | Review;

// Get the foreign key that a vote cast on this subject would have.
export function getVoteSubjectRef(
	subject: VoteSubject
):
	| { subjectType: "comment"; refersTo: CommentId }
	| { subjectType: "review"; refersTo: ReviewId } {
	if ((<Review>subject).reviewId) {
		return { subjectType: "review", refersTo: (<Review>subject).reviewId };
	} else if ((<Comment>subject)._id) {
		return { subjectType: "comment", refersTo: (<Comment>subject)._id };
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}
}
