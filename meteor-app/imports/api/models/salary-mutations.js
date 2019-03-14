// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.ts";

import type { SalaryId, Company, Salary, User } from ".";

export async function submitSalary(
	user: User,
	company: Company,
	salaryParams: mixed
): Salary {
	throw new Error("Not implemented yet");
}

export async function editSalary(id: SalaryId, salaryChanges: mixed): Salary {
	throw new Error("Not implemented yet");
}

export async function deleteSalary(id: SalaryId): Salary {
	throw new Error("Not implemented yet");
}
