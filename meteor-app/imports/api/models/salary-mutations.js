// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ID, Company, Salary, User } from ".";

export async function submitSalary(
	user: User,
	company: Company,
	salaryParams: mixed
): Salary {
	throw new Error("Not implemented yet");
}

export async function editSalary(id: ID, salaryChanges: mixed): Salary {
	throw new Error("Not implemented yet");
}

export async function deleteSalary(id: ID): Salary {
	throw new Error("Not implemented yet");
}
