import * as dataModel from "imports/api/models";

import { JobAdResolvers } from "imports/gen/graphql-resolvers";

export const JobAd: JobAdResolvers = {
	id: (obj, _args, _context, _info) => dataModel.jobAdIdToString(obj.jobAdId),

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByJobAd(obj),
	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfJobAd(obj),
};
