import {
	SalaryId,
	CompanyId,
	UserId,
	LocationString,
} from "imports/api/models";

export type Salary = {
	salaryId: SalaryId;
	submittedBy: UserId;
	companyName: string;
	companyId: CompanyId | null;
	location: LocationString;
	jobTitle: string;
	incomeType: string;
	incomeAmount: number;
	dateAdded: Date;
};
