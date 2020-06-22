import { ResourceResolvers } from "imports/gen/graphql-resolvers";
import * as dataModel from "imports/api/models";

export const Resource: ResourceResolvers = {
	id: (obj, _args, _context, _info) => obj.slug,

	numberOfLikes: (obj, _args, _context, _info) =>
		dataModel.getNumResourceLikes(obj.slug),

	isLikedByCurrentUser: (obj, _args, context, _info) => {
		if (!context.user) {
			return false;
		}

		return dataModel.isResourceLikedByUser(obj.slug, context.user);
	},

	author: (obj, _args, _context, _info) => {
		return dataModel
			.getResourceBySlug(obj.slug)
			.then(resource =>
				dataModel.getResourceAuthorById(resource.authorId)
			);
	},
};
