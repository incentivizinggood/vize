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
		"SELECT companylocation FROM company_locations WHERE companyid=$1",
		company.companyId
	).then(results =>
		results.map(loc => parseLocationString(loc.companylocation))
	);
}

export async function getLocationsByJobAd(jobAd: JobAd): Promise<Location[]> {
	return simpleQuery<{ joblocation: string }>(
		"SELECT joblocation FROM job_locations WHERE jobadid=$1",
		jobAd.jobAdId
	).then(results => results.map(loc => parseLocationString(loc.joblocation)));
}
