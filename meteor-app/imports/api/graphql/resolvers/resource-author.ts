import { ResourceAuthorResolvers } from "imports/gen/graphql-resolvers";

export const ResourceTopic: ResourceAuthorResolvers = {
	id: (obj, _args, _context, _info) => String(obj.authorId),
};
