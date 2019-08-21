import * as dataModel from "imports/api/models";

import { SalaryResolvers } from "imports/gen/graphql-resolvers";

export const Salary: SalaryResolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.salaryIdToString(obj.salaryId),

	location: (obj, _args, _context, _info) =>
		dataModel.parseLocationString(obj.location),

	incomeType: ({ incomeType }, _args, _context, _info) =>
		incomeType === "Yearly Salary"
			? "YEARLY_SALARY"
			: incomeType === "Monthly Salary"
			? "MONTHLY_SALARY"
			: "HOURLY_WAGE",

	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfSalary(obj),
};
