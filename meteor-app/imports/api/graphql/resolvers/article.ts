import { ArticleResolvers } from "imports/gen/graphql-resolvers";

export const Article: ArticleResolvers = {
	id: (obj, _args, _context, _info) => obj.slug,
};
