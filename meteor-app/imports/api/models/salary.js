// @flow
import type { SalaryId, CompanyId, UserId, LocationString } from ".";

export type Salary = {|
	salaryid: SalaryId,
	submittedby: UserId,
	companyname: string,
	companyid: CompanyId | null,
	salarylocation: LocationString,
	jobtitle: string,
	incometype: string,
	incomeamount: number,
	gender: null | "Male" | "Female",
	dateadded: Date,
|};
