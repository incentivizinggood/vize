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

// Determine if obj is a valid job ad. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
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

// Determine if obj is a valid job application. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
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
