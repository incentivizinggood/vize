// @flow
import type { PgId } from ".";

export opaque type JobAdId = PgId;

export function jobAdIdToString(id: JobAdId): string {
	return String(id);
}

export function stringToJobAdId(id: string): JobAdId {
	return Number(id);
}
