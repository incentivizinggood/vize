import {
	CommentId,
	ReviewId,
	UserPId,
	Comment,
	Review,
	isComment,
	isReview,
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
	if (isComment(subject)) {
		return {
			subjectType: "comment",
			refersTo: (subject as Comment)._id,
		};
	} else if (isReview(subject)) {
		return {
			subjectType: "review",
			refersTo: (subject as Review).reviewId,
		};
	} else {
		throw new Error("NOT_ANY_TYPE_OF_VOTE_SUBJECT");
	}
}
