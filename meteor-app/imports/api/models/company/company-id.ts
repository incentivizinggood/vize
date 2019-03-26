import { PgId, Branded } from "imports/api/models";

export type CompanyId = Branded<PgId, "CompanyId">;

export function companyIdToString(id: CompanyId): string {
	return String(id);
}

export function stringToCompanyId(id: string): CompanyId {
	return Number(id) as CompanyId;
}
