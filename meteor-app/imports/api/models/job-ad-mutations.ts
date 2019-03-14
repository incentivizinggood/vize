import { execTransactionRW } from "/imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd } from ".";

export async function postJobAd(company: Company, jobAdParams: unknown): JobAd {
	throw new Error("Not implemented yet");
}

export async function editJobAd(id: JobAdId, jobAdChanges: unknown): JobAd {
	throw new Error("Not implemented yet");
}

export async function deleteJobAd(id: JobAdId): JobAd {
	throw new Error("Not implemented yet");
}
