import * as dataModel from "src/models";

import { SalaryResolvers } from "generated/graphql-resolvers";

export const Salary: SalaryResolvers = {
	id: (obj, _args, _context, _info) => String(obj.salaryId),

	location: (obj, _args, _context, _info) =>
		dataModel.parseLocationString(obj.location),

	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfSalary(obj),
};
