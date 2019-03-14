// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.ts";

import type { JobAdId, Company, JobAd } from ".";

export async function postJobAd(company: Company, jobAdParams: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function editJobAd(id: JobAdId, jobAdChanges: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function deleteJobAd(id: JobAdId): JobAd {
	throw new Error("Not implemented yet");
}
