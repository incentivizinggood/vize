import * as dataModel from "imports/api/models";

import { SalaryResolvers } from "./resolvers-types";

export const Salary: SalaryResolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.salaryIdToString(obj.salaryId),

	location: (obj, _args, _context, _info) =>
		dataModel.parseLocationString(obj.location),
	created: (obj, _args, _context, _info) => obj.dateAdded,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfSalary(obj),
};
