// WARNING: Comments have not been fully implemented yet. This code is a half
// done mess. Keep that in mind when working with it.
import { CommentId, UserId, Review } from "imports/api/models";

export type Comment = {
	_id: CommentId;
	submittedBy: UserId;
	datePosted: Date | null;
	content: string;
};

export type CommentParent = Comment | Review;
