import * as dataModel from "imports/api/models";

import { CommentResolvers } from "imports/gen/graphql-resolvers";

export const Comment: CommentResolvers = {
	// WARNING: Comments have not been fully implemented yet. The code for
	// them is a half done mess. Keep that in mind when working with it.
	id: (obj, _args, _context, _info) => String(obj._id),

	created: (obj, _args, _context, _info) => obj.datePosted,

	author: (obj, _args, _context, _info) => dataModel.getAuthorOfComment(obj),

	parent: (obj, _args, _context, _info) => dataModel.getParentOfComment(obj),

	children: (obj, args, _context, _info) =>
		dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),

	votes: (obj, args, _context, _info) =>
		dataModel.getVotesBySubject(obj, args.pageNum, args.pageSize),
};
