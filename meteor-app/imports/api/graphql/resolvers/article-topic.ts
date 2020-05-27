import { ArticleTopicResolvers } from "imports/gen/graphql-resolvers";

export const ArticleTopic: ArticleTopicResolvers = {
	id: (obj, _args, _context, _info) => obj.topicName,
};
