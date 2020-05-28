import * as dataModel from "src/models";

import { JobAdResolvers } from "generated/graphql-resolvers";

export const JobAd: JobAdResolvers = {
	id: (obj, _args, _context, _info) => String(obj.jobAdId),

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByJobAd(obj),
	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfJobAd(obj),
};
