import sql from "imports/lib/sql-template";
import { simpleQuery } from "imports/api/connectors/postgresql";

import {
	Location,
	Company,
	JobAd,
	parseLocationString,
} from "imports/api/models";

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
