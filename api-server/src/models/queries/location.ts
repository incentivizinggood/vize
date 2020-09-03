import sql from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";

import { Location, Company, JobAd } from "src/models/types";

export async function getLocationsByCompany(
	company: Company
): Promise<Location[]> {
	return simpleQuery(
		sql`
			SELECT city, address, industrial_hub AS "industrialHub"
			FROM company_locations
			WHERE companyid=${company.companyId}
		`
	);
}

export async function getLocationsByJobAd(jobAd: JobAd): Promise<Location[]> {
	return simpleQuery(
		sql`
			SELECT city, address, industrial_hub AS "industrialHub"
			FROM job_locations
			WHERE jobadid=${jobAd.jobAdId}
		`
	);
}
