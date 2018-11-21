// @flow
import { execTransactionRO } from "/imports/api/connectors/postgresql.js";
import type { Company } from "/imports/api/models";

export type Location = {
	city: string,
	address: string,
	industrialHub: ?string,
};

export async function getLocationsByCompany(
	company: Company
): Promise<Location[]> {
	const transaction = async client => {
		let locationResults = { rows: [] };

		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[company._id]
		);

		return locationResults.rows.map(loc => JSON.parse(loc.companylocation));
	};

	return execTransactionRO(transaction);
}
