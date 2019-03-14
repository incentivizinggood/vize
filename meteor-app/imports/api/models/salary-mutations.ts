import { execTransactionRW } from "/imports/api/connectors/postgresql";

import { SalaryId, Company, Salary, User } from ".";

export async function submitSalary(
	user: User,
	company: Company,
	salaryParams: unknown
): Salary {
	throw new Error("Not implemented yet");
}

export async function editSalary(id: SalaryId, salaryChanges: unknown): Salary {
	throw new Error("Not implemented yet");
}

export async function deleteSalary(id: SalaryId): Salary {
	throw new Error("Not implemented yet");
}
