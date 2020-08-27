import * as dataModel from "src/models";

import { JobAdResolvers } from "generated/graphql-resolvers";

export const JobAd: JobAdResolvers = {
	id: (obj, _args, _context, _info) => String(obj.jobAdId),

	salaryType: ({ salaryType }, _args, _context, _info) =>
		salaryType === "Yearly Salary"
			? "YEARLY_SALARY"
			: salaryType === "Monthly Salary"
			? "MONTHLY_SALARY"
			: salaryType === "Weekly Salary"
			? "WEEKLY_SALARY"
			: salaryType === "Daily Salary"
			? "DAILY_SALARY"
			: "HOURLY_WAGE",

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByJobAd(obj),
	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfJobAd(obj),
};
