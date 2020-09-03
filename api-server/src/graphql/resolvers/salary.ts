import * as dataModel from "src/models";

import { SalaryResolvers } from "generated/graphql-resolvers";

export const Salary: SalaryResolvers = {
	id: (obj, _args, _context, _info) => String(obj.salaryId),

	location: (obj, _args, _context, _info) => ({
		city: obj.city,
		address: obj.address,
		industrialHub: obj.industrialHub,
	}),

	incomeType: ({ incomeType }, _args, _context, _info) =>
		incomeType === "Yearly Salary"
			? "YEARLY_SALARY"
			: incomeType === "Monthly Salary"
			? "MONTHLY_SALARY"
			: incomeType === "Weekly Salary"
			? "WEEKLY_SALARY"
			: incomeType === "Daily Salary"
			? "DAILY_SALARY"
			: "HOURLY_WAGE",

	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfSalary(obj),
};
