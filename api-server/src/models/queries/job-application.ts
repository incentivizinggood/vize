import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import {
	Company,
	JobApplication,
	JobAd,
	getCompanyById,
	getJobAdById,
} from "src/models";

const attributes = sql.raw(
	[
		'application_id AS "applicationId"',
		'full_name AS "fullName"',
		'phone_number AS "phoneNumber"',
		"email",
		'cover_letter AS "coverLetter"',
		'jobadid AS "jobAdId"',
		'companyid AS "companyId"',
	].join(", ")
);
const baseQuery = sql`SELECT ${attributes} FROM job_applications`;

// Get the job application from a given id
export async function getJobApplicationById(
	jobId: number,
	companyId: number | null
): Promise<JobApplication | null> {
	const jobApplication: JobApplication | null = await simpleQuery1(
		sql`${baseQuery} WHERE application_id=${jobId}`
	);
	if (!jobApplication) {
		throw new Error("Job Application Id is invalid");
	}
	if (jobApplication.companyId !== companyId) {
		throw new Error("You do not have permission to view this information");
	}
	return jobApplication;
}

// Get the company that posted a given job application
export async function getCompanyOfJobApplication(
	jobApplication: JobApplication
): Promise<Company> {
	const company: Company | null = await getCompanyById(
		jobApplication.companyId
	);

	if (company === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return company;
}

// Get the Job Ad assocaited to the job application.
export async function getJobAdOfJobApplication(
	jobApplication: JobApplication
): Promise<JobAd> {
	const jobAd: JobAd | null = await getJobAdById(jobApplication.companyId);

	if (jobAd === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return jobAd;
}
