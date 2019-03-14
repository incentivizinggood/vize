import { execTransactionRW } from "imports/api/connectors/postgresql";

import { CompanyId, Company } from ".";

export async function createCompany(companyParams: unknown): Promise<Company> {
	throw new Error("Not implemented yet");
}

export async function editCompany(
	id: CompanyId,
	companyChanges: unknown
): Promise<Company> {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: CompanyId): Promise<Company> {
	throw new Error("Not implemented yet");
}
