import { ArticleAuthorResolvers } from "imports/gen/graphql-resolvers";

export const ArticleTopic: ArticleAuthorResolvers = {
	id: (obj, _args, _context, _info) => String(obj.authorId),
};
