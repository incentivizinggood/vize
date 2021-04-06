import * as yup from "yup";

import sql from "src/utils/sql-template";
import { pool } from "src/connectors/postgresql";
import {
	User,
	getUserByLogin,
	hashPassword,
	comparePassword,
} from "src/models";
import { postToSlack } from "src/connectors/slack-webhook";

import { attributes } from "../queries/user";
import { workExperienceInputSchema } from "./work-experience";

const createUserProfileInputSchema = yup
	.object({
		fullName: yup.string().required(),
		phoneNumber: yup.string().required(),
		city: yup.string().required(),
		neighborhood: yup.string().required(),
		address: yup.string().required(),
		workExperiences: yup.array().of(workExperienceInputSchema),
		salaryMin: yup.number().required(),
		salaryMax: yup.number().required(),
		skills: yup.array().of(yup.string()),
		certificatesAndLicences: yup.array().of(yup.string()),
		highestLevelOfEducation: yup
			.string()
			.oneOf([
				"SOME_HIGH_SCOOL",
				"HIGH_SCHOOL",
				"SOME_COLLEGE",
				"COLLEGE_DEGREE",
			])
			.required(),
		availability: yup
			.array()
			.required()
			.min(1)
			.of(yup.string()),
		availabilityComments: yup.string(),
		longTermGoal: yup.string(),
	})
	.required();

export async function createJobAd(
	input: unknown,
	userId: number
): Promise<number> {
	const {
		jobTitle,
		locations,
		salaryMin,
		salaryMax,
		salaryType,
		contractType,
		jobDescription,
		responsibilities,
		qualifications,
		startTime,
		endTime,
		startDay,
		endDay,
	} = await createJobAdInputSchema.validate(input);

	if (salaryMin > salaryMax) {
		// Error in English: salaryMin must be less than or equal to salaryMax
		throw new Error(
			"El salario minimo debe de ser menos que el salario maximo."
		);
	}

	const transaction: Transaction<number> = async client => {
		const {
			rows: [{ role, companyid }],
		} = await client.query(
			sql`SELECT role, companyid FROM users WHERE userid=${userId}`
		);

		if (role !== "company-unverified" && role !== "company") {
			// Error in English: Only employers may create a company. You must create an employer account.
			throw new Error(
				"Solo los empleadores pueden crear una empresa. Tienes que crear una cuenta de empleador."
			);
		}

		if (companyid === null) {
			// Error in English: "You must create a company profile before posting job ads. Navigate to My Company to create a profile"
			throw new Error(
				'Tienes que crear un perfil para la empresa antes de publicar ofertas de empleo. Navega a "Mi Empresa" en la barra de navegación y llena la encuesta para crear el perfil.'
			);
		}

		const {
			rows: [{ jobadid }],
		} = await client.query(sql`
			INSERT INTO jobads
				(
					companyid,
					jobtitle,
					salary_min,
					salary_max,
					salary_type,
					contracttype,
					jobdescription,
					responsibilities,
					qualifications,
					start_time,
					end_time,
					start_day,
					end_day
				)
			VALUES
				(
					${companyid},
					${jobTitle},
					${salaryMin},
					${salaryMax},
					${salaryType},
					${contractType},
					${jobDescription},
					${responsibilities},
					${qualifications},
					${startTime},
					${endTime},
					${startDay},
					${endDay}
				)
			RETURNING jobadid
		`);

		await client.query(sql`
			INSERT INTO job_locations
				(jobadid, city, address, industrial_hub)
			VALUES
				${locations
					.map(
						l =>
							sql`(
								${jobadid},
								${l.city},
								${l.address},
								${l.industrialHub}
							)`
					)
					.reduce((a, c) => sql`${a}, ${c}`)}
		`);

		return jobadid;
	};

	return execTransactionRW(transaction);
}
