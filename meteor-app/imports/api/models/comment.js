// @flow
// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import type { CommentId, UserId, Review } from ".";

export type Comment = {|
	_id: CommentId,
	submittedBy: UserId,
	datePosted: ?Date,
	content: string,
|};

export type CommentParent = Comment | Review;
