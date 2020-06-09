import { ResourceTopicResolvers } from "imports/gen/graphql-resolvers";

export const ResourceTopic: ResourceTopicResolvers = {
	id: (obj, _args, _context, _info) => obj.topicName,
};
