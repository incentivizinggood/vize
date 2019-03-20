import { PgId } from "imports/api/models";

export type JobAdId = PgId;

export function jobAdIdToString(id: JobAdId): string {
	return String(id);
}

export function stringToJobAdId(id: string): JobAdId {
	return Number(id);
}
