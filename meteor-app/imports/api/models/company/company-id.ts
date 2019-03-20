import { PgId } from "imports/api/models";

export type CompanyId = PgId;

export function companyIdToString(id: CompanyId): string {
	return String(id);
}

export function stringToCompanyId(id: string): CompanyId {
	return Number(id);
}
