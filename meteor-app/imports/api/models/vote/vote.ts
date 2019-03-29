import {
	CommentId,
	ReviewId,
	UserPId,
	Comment,
	Review,
	isComment,
	isReview,
} from "imports/api/models";

/** A reference to the subject of a vote. */
type SubjectRef =
	| { subjectType: "comment"; refersTo: CommentId }
	| { subjectType: "review"; refersTo: ReviewId };

export type Vote = SubjectRef & {
	submittedBy: UserPId;
	isUpvote: boolean | null;
};

export type VoteSubject = Comment | Review;

// Get the foreign key that a vote cast on this subject would have.
export function getVoteSubjectRef(subject: VoteSubject): SubjectRef {
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
