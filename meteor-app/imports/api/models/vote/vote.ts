import {
	CommentId,
	ReviewId,
	UserPId,
	Comment,
	Review,
} from "imports/api/models";

export type CommentVote = {
	submittedby: UserPId;
	subjecttype: "comment";
	refersto: CommentId;
	value: boolean;
	dateadded: Date;
};

export type ReviewVote = {
	submittedby: UserPId;
	subjecttype: "review";
	refersto: ReviewId;
	value: boolean;
	dateadded: Date;
};

export type Vote = ReviewVote | CommentVote;

export type VoteSubject = Comment | Review;

// Get the foreign key that a vote cast on this subject would have.
export function getVoteSubjectRef(
	subject: VoteSubject
):
	| { subjectType: "comment"; refersTo: CommentId }
	| { subjectType: "review"; refersTo: ReviewId } {
	if ((<Review>subject).reviewid) {
		return { subjectType: "review", refersTo: (<Review>subject).reviewid };
	} else if ((<Comment>subject)._id) {
		return { subjectType: "comment", refersTo: (<Comment>subject)._id };
	} else {
		throw new Error("Could not determine the type of this vote subject.");
	}
}
