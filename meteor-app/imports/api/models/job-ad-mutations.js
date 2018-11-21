// @flow
import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ID, Company, JobAd } from ".";

export async function postJobAd(company: Company, jobAdParams: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function editJobAd(id: ID, jobAdChanges: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function deleteJobAd(id: ID): JobAd {
	throw new Error("Not implemented yet");
}
