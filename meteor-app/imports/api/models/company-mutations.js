// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ID, Company } from ".";

export async function createCompany(companyParams: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function editCompany(id: ID, companyChanges: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: ID): Company {
	throw new Error("Not implemented yet");
}
