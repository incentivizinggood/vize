// @flow
import { SalarySchema } from "/imports/api/data/salaries.js";

import type { ID, Location, Company, User } from ".";

export type Salary = {
	salaryid: number,
	submittedby: number,
	companyname: string,
	companyid: number | null,
	salarylocation: string,
	jobtitle: string,
	incometype: string,
	incomeamount: number,
	gender: null | "Male" | "Female",
	dateadded: Date,
};

export function isSalary(obj: any): boolean {
	// SalarySchema
	// 	.newContext()
	// 	.validate(obj);
	const context = SalarySchema.newContext();
	context.validate(obj, {
		extendedCustomContext: {
			isNotASubmission: true,
		},
	});

	return context.isValid();
}
