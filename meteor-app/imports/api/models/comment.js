// @flow
import { CommentSchema } from "/imports/api/data/comments.js";

import type { ID, Review } from ".";

export type Comment = {
	_id: ID,
	submittedBy: ID,
	datePosted: ?Date,
	content: string,
};

export type CommentParent = Comment | Review;

export function isComment(obj: any): boolean {
	// CommentSchema
	// 	.newContext()
	// 	.validate(obj);
	// const context = CommentSchema.newContext();
	// context.validate(obj);
	// return context.isValid();
	return false;
}
