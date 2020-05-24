import { ArticleResolvers } from "imports/gen/graphql-resolvers";
import * as dataModel from "imports/api/models";

export const Article: ArticleResolvers = {
	id: (obj, _args, _context, _info) => obj.slug,

	numberOfLikes: (obj, _args, _context, _info) =>
		dataModel.getNumArticleLikes(obj.slug),

	isLikedByCurrentUser: (obj, _args, context, _info) => {
		if (!context.user) {
			return false;
		}

		return dataModel.isArticleLikedByUser(obj.slug, context.user);
	},
};
