// @flow
import { JobAdSchema, JobApplicationSchema } from "/imports/api/data/jobads.js";

import type { ID, Location, Company } from ".";

const defaultPageSize = 100;

export type JobAd = {
	jobadid: number,

	companyname: string | null,
	companyid: string,

	jobtitle: string,
	pesosperhour: string,
	contracttype: string,
	jobdescription: string,
	responsibilities: string,
	qualifications: string,
	dateadded: Date,
};

export function isJobAd(obj: any): boolean {
	// JobAdSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = JobAdSchema.newContext();
	context.validate(obj, {
		extendedCustomContext: {
			isNotASubmission: true,
		},
	});
	return context.isValid();
}

export function isJobApplication(obj: any): boolean {
	// there's a strong chance that this validation
	// code is broken, but I'm not sure how to go about
	// fixing it because I don't know how/where it will be used
	// return JobApplicationSchema
	// 	.newContext()
	// 	.validate(obj)
	// 	.isValid();

	// here's something that's more likely to work
	const context = JobApplicationSchema.newContext();
	context.validate(obj);
	return context.isValid();
}
