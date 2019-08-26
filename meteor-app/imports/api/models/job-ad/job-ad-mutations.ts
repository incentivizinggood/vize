import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";

import CreateJobAdInput from "imports/lib/inputs/job-ad";

import { JobAdId, UserPId } from "imports/api/models";

export async function createJobAd(
	input: CreateJobAdInput,
	userId: UserPId
): Promise<JobAdId> {
	const {
		jobTitle,
		locations,
		pesosPerHour,
		contractType,
		jobDescription,
		responsibilities,
		qualifications,
	}: CreateJobAdInput = await CreateJobAdInput.schema.validate(input);

	const transaction: Transaction<JobAdId> = async client => {
		const {
			rows: [{ role, companyid }],
		} = await client.query(
			sql`SELECT role, companyid FROM users WHERE userid=${userId}`
		);

		if (role !== "company-unverified" && role !== "company") {
			throw new Error("Only employers may create a company.");
		}

		if (companyid === null) {
			throw new Error(
				"You must create a company profile before posting job ads."
			);
		}

		const {
			rows: [{ jobadid }],
		} = await client.query(sql`
			INSERT INTO jobads
				(
					companyid,
					jobtitle,
					pesosperhour,
					contracttype,
					jobdescription,
					responsibilities,
					qualifications
				)
			VALUES
				(
					${companyid}, 
					${jobTitle}, 
					${pesosPerHour}, 
					${
						// TODO: change the database so that we do not need to convert these.
						contractType === "FULL_TIME"
							? "Full time"
							: contractType === "PART_TIME"
							? "Part time"
							: "Contractor"
					}, 
					${jobDescription}, 
					${responsibilities}, 
					${qualifications}
				)
			RETURNING jobadid
		`);

		const locationValues = locations
			.map(l => sql`(${jobadid}, ${JSON.stringify(l)})`)
			.reduce((a, c) => sql`${a}, ${c}`);
		await client.query(sql`
			INSERT INTO job_locations
				(jobadid, joblocation)
			VALUES
				${locationValues}
		`);

		return jobadid;
	};

	return execTransactionRW(transaction);
}
