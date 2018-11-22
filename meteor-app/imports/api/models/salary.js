// @flow
import type { SalaryId, CompanyId, UserId, Location, Company, User } from ".";

export type Salary = {|
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
|};
