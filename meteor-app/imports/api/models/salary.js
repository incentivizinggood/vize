// @flow
import { SalarySchema } from "/imports/api/data/salaries.js";

import type { SalaryId, CompanyId, UserId, Location, Company, User } from ".";

export type Salary = {
	salaryid: SalaryId,
	submittedby: UserId,
	companyname: string,
	companyid: CompanyId | null,
	salarylocation: string,
	jobtitle: string,
	incometype: string,
	incomeamount: number,
	gender: null | "Male" | "Female",
	dateadded: Date,
};

// Determine if obj is a valid salary. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
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
