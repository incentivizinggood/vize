import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import { Company, JobAd, getCompanyById } from "src/models";
import { paginate } from "src/models/misc";

const attributes = sql.raw(
	[
		'jobadid AS "jobAdId"',
		'companyname AS "companyName"',
		'companyid AS "companyId"',
		'jobtitle AS "jobTitle"',
		'jobdescription AS "jobDescription"',
		"skills",
		'certificates_and_licences AS "certificatesAndLicences"',
		'contracttype AS "contractType"',
		'minimum_education AS "minimumEducation"',
		'minimum_english_proficiency AS "minimumEnglishProficiency"',
		"shifts",
		'salary_min AS "salaryMin"',
		'salary_max AS "salaryMax"',
		'salary_type AS "salaryType"',
		'external_job_post_URL AS "externalJobPostURL"',
		'is_archived AS "isArchived"',
		'dateadded AS "dateAdded"',
	].join(", ")
);
const baseQuery = sql`SELECT ${attributes} FROM jobads`;

// Get the job ad with a given id.
export async function getJobAdById(id: number): Promise<JobAd | null> {
	return simpleQuery1(sql`${baseQuery} WHERE jobadid=${id}`);
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<JobAd[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE companyname=${company.name}
		ORDER BY dateadded DESC
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	const company: Company | null = await getCompanyById(jobAd.companyId);

	if (company === null) {
		// In english: Error: There is no company associated with this job offer
		throw new Error(
			"Error: no hay ninguna empresa asociada a esta oferta de empleo"
		);
	}

	return company;
}

// Count the number of job ads posted by a given company.
export async function countJobAdsByCompany(company: Company): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(
		sql`SELECT COUNT(*) AS count FROM jobads WHERE companyname=${company.name}`
	);
	return count ? count.count : 0;
}

// return all job ads
// TODO: add search paramaters
export async function searchForJobAds(
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: JobAd[]; totalCount: number }> {
	return paginate<JobAd>(
		sql`
			${baseQuery}
			ORDER BY dateadded DESC
		`,
		pageNumber,
		pageSize
	);
}
