// @flow
import { execTransactionRO } from "/imports/api/connectors/postgresql.js";
import type { Company, JobAd } from ".";

export type Location = {|
	city: string,
	address: string,
	industrialHub: ?string,
|};

export async function getLocationsByCompany(
	company: Company
): Promise<Location[]> {
	const transaction = async client => {
		let locationResults = { rows: [] };

		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[company.companyid]
		);

		return locationResults.rows.map(loc => JSON.parse(loc.companylocation));
	};

	return execTransactionRO(transaction);
}

export async function getLocationsByJobAd(jobAd: JobAd): Promise<Location[]> {
	const transaction = async client => {
		let locationResults = { rows: [] };

		locationResults = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobAd.jobadid]
		);

		return locationResults.rows.map(loc => JSON.parse(loc.joblocation));
	};

	return execTransactionRO(transaction);
}
