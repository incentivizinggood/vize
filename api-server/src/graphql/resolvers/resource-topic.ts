import { ResourceTopicResolvers } from "generated/graphql-resolvers";

export const ResourceTopic: ResourceTopicResolvers = {
	id: (obj, _args, _context, _info) => obj.topicName,
};
