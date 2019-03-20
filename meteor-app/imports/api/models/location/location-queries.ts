import {
	execTransactionRO,
	Transaction,
} from "imports/api/connectors/postgresql";

import {
	Location,
	Company,
	JobAd,
	parseLocationString,
} from "imports/api/models";

export async function getLocationsByCompany(
	company: Company
): Promise<Location[]> {
	const transaction: Transaction<Location[]> = async client => {
		let locationResults = { rows: [] };

		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[company.companyid]
		);

		return locationResults.rows.map(loc =>
			parseLocationString(loc.companylocation)
		);
	};

	return execTransactionRO(transaction);
}

export async function getLocationsByJobAd(jobAd: JobAd): Promise<Location[]> {
	const transaction: Transaction<Location[]> = async client => {
		let locationResults = { rows: [] };

		locationResults = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobAd.jobadid]
		);

		return locationResults.rows.map(loc =>
			parseLocationString(loc.joblocation)
		);
	};

	return execTransactionRO(transaction);
}
