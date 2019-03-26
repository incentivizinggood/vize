import { execTransactionRW } from "imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd } from "imports/api/models";

export async function postJobAd(
	company: Company,
	jobAdParams: unknown
): Promise<JobAd> {
	throw new Error("Not implemented yet");
}

export async function editJobAd(
	id: JobAdId,
	jobAdChanges: unknown
): Promise<JobAd> {
	throw new Error("Not implemented yet");
}

export async function deleteJobAd(id: JobAdId): Promise<JobAd> {
	throw new Error("Not implemented yet");
}
