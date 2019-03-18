import * as dataModel from "imports/api/models";

import { VoteResolvers } from "./resolvers-types";

export const Vote: VoteResolvers.Resolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.voteIdToString(dataModel.getIdOfVote(obj)),
	isUpvote: (obj, _args, _context, _info) => obj.isUpvote,

	author: (obj, _args, _context, _info) => dataModel.getAuthorOfVote(obj),

	subject: (obj, _args, _context, _info) => dataModel.getSubjectOfVote(obj),
};
