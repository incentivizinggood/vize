import * as dataModel from "imports/api/models";

import { CommentParentResolvers } from "./resolvers-types";

export const CommentParent: CommentParentResolvers = {
	// WARNING: Comments have not been fully implemented yet. The code for
	// them is a half done mess. Keep that in mind when working with it.
	__resolveType(obj, _context, _info) {
		// In order to determine what type obj actualy is, we test for the
		// existance of fields that are unique to each of the types that obj
		// could be. Example: If obj has things that only comments have,
		// then obj is a comment. We also use type assertions to double
		// check that each of these tests are correct. See Flow's docs on
		// "type refinement" for more _info.
		if (dataModel.isComment(obj)) {
			return "Comment";
		}

		if (dataModel.isReview(obj)) {
			return "Review";
		}

		// It should be imposible to get here.
		throw new Error("NOT_ANY_TYPE_OF_COMMENT_PARENT");
	},
};
