import { ArticleResolvers } from "generated/graphql-resolvers";
import * as dataModel from "src/models";

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

	author: (obj, _args, _context, _info) => {
		return dataModel.getArticleAuthorById(obj.authorId);
	},
};
