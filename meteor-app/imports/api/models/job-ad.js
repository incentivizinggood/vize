// @flow
import type { JobAdId, CompanyId, Location, Company } from ".";

export type JobAd = {|
	jobadid: JobAdId,

	companyname: string | null,
	companyid: CompanyId,

	jobtitle: string,
	pesosperhour: string,
	contracttype: string,
	jobdescription: string,
	responsibilities: string,
	qualifications: string,
	dateadded: Date,
|};
