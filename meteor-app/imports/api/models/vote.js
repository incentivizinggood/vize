// @flow
import { VoteSchema } from "/imports/api/data/votes.js";

import type { ID, Comment, Review, User } from ".";
import { isReview, isComment } from ".";

export type Vote = {
	submittedby: number,
	subjecttype: "review" | "comment",
	refersto: number,
	value: boolean,
	dateadded: Date,
};

export type VoteSubject = Comment | Review;

// Get the foreign key that a vote cast on this subject would have.
export function unpackSubjectInfo(
	subject: VoteSubject
): { subjectType: "review" | "comment", refersTo: number | ID } {
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
