import { PgId, Branded } from "imports/api/models";

export type JobAdId = Branded<PgId, "JobAdId">;

export function jobAdIdToString(id: JobAdId): string {
	return String(id);
}

export function stringToJobAdId(id: string): JobAdId {
	return Number(id) as JobAdId;
}
