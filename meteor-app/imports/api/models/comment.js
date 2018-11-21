// @flow
// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import { CommentSchema } from "/imports/api/data/comments.js";

import type { ID, Review } from ".";

export type Comment = {
	_id: ID,
	submittedBy: ID,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

// Determine if obj is a valid comment. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
export function isComment(obj: any): boolean {
	// CommentSchema
	// 	.newContext()
	// 	.validate(obj);
	// const context = CommentSchema.newContext();
	// context.validate(obj);
	// return context.isValid();
	return false;
}
