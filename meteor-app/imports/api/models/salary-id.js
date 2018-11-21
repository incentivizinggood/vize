// @flow
import type { PgId } from ".";

export opaque type SalaryId = PgId;

export function salaryIdToString(id: SalaryId): string {
	return String(id);
}

export function stringToSalaryId(id: string): SalaryId {
	return Number(id);
}
