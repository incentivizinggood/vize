// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.ts";

import type { CompanyId, Company } from ".";

export async function createCompany(companyParams: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function editCompany(
	id: CompanyId,
	companyChanges: mixed
): Company {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: CompanyId): Company {
	throw new Error("Not implemented yet");
}
