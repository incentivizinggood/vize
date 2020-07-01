import * as dataModel from "src/models";

import { VoteResolvers } from "generated/graphql-resolvers";

export const Vote: VoteResolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.voteIdToString(dataModel.getIdOfVote(obj)),

	author: (obj, _args, _context, _info) => dataModel.getAuthorOfVote(obj),

	subject: (obj, _args, _context, _info) => dataModel.getSubjectOfVote(obj),
};
