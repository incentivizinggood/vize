import { PgId } from "imports/api/models";

export type SalaryId = PgId;

export function salaryIdToString(id: SalaryId): string {
	return String(id);
}

export function stringToSalaryId(id: string): SalaryId {
	return Number(id);
}
