import * as dataModel from "src/models";

import { JobApplicationResolvers } from "generated/graphql-resolvers";

export const JobApplication: JobApplicationResolvers = {
	id: (obj, _args, _context, _info) => String(obj.applicationId),

	fullName: (obj, _args, _context, _info) => obj.fullName,

	email: (obj, _args, _context, _info) => obj.email,

	phoneNumber: (obj, _args, _context, _info) => obj.phoneNumber,

	coverLetter: (obj, _args, _context, _info) => {
		if (obj.coverLetter) {
			return obj.coverLetter;
		}
		return null;
	},

	company: (obj, _args, _context, _info) =>
		dataModel.getCompanyOfJobApplication(obj),

	jobAd: (obj, _args, _context, _info) =>
		dataModel.getJobAdOfJobApplication(obj),
};
