import sql from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";

import { Location, Company, JobAd } from "src/models/types";

import { parseLocationString } from "src/models/utils";

export async function getLocationsByCompany(
	company: Company
): Promise<Location[]> {
	return simpleQuery<{ companylocation: string }>(
		sql`
			SELECT companylocation
			FROM company_locations
			WHERE companyid=${company.companyId}
		`
	).then(results =>
		results.map(loc => parseLocationString(loc.companylocation))
	);
}

export async function getLocationsByJobAd(jobAd: JobAd): Promise<Location[]> {
	return simpleQuery<{ joblocation: string }>(
		sql`
			SELECT joblocation
			FROM job_locations
			WHERE jobadid=${jobAd.jobAdId}
		`
	).then(results => results.map(loc => parseLocationString(loc.joblocation)));
}
