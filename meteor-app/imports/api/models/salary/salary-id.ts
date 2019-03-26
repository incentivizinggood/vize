import { PgId, Branded } from "imports/api/models";

export type SalaryId = Branded<PgId, "SalaryId">;

export function salaryIdToString(id: SalaryId): string {
	return String(id);
}

export function stringToSalaryId(id: string): SalaryId {
	return Number(id) as SalaryId;
}
