import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { sendEmail } from "src/connectors/email";
import { postToSlack } from "src/connectors/slack-webhook";

import { locationInputSchema } from "./location";

const createJobAdInputSchema = yup
	.object({
		jobTitle: yup.string().required(),
		locations: yup
			.array()
			.required()
			.min(1)
			.of(locationInputSchema),
		salaryMin: yup.number().required(),
		salaryMax: yup.number().required(),
		salaryType: yup
			.string()
			.oneOf([
				"YEARLY_SALARY",
				"MONTHLY_SALARY",
				"WEEKLY_SALARY",
				"DAILY_SALARY",
				"HOURLY_WAGE",
			])
			.required(),
		contractType: yup
			.string()
			.oneOf([
				"FULL_TIME",
				"PART_TIME",
				"INTERNSHIP",
				"TEMPORARY",
				"CONTRACTOR",
			])
			.required(),
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
		// TODO: Should we check for a valid time format here? The database ensures this for now.
		startTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
		endTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
		startDay: yup
			.number()
			.integer()
			.min(0)
			.max(6),
		endDay: yup
			.number()
			.integer()
			.min(0)
			.max(6),
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

const createApplyToJobAdInputSchema = yup
	.object({
		jobAdId: yup.string().required(),
		fullName: yup.string().required(),
		email: yup
			.string()
			.email()
			.required(),
		phoneNumber: yup.string().required(),
		coverLetter: yup.string(),
	})
	.required();

export async function applyToJobAd(input: unknown): Promise<boolean> {
	const {
		jobAdId,
		fullName,
		email: applicantEmail,
		phoneNumber,
		coverLetter,
	} = await createApplyToJobAdInputSchema.validate(input);

	const transaction: Transaction<boolean> = async client => {
		const {
			rows: [
				{
					companyid: companyId,
					name: companyName,
					contactemail: companyEmail,
				},
			],
		} = await client.query(
			sql`SELECT companies.companyid, name, contactemail FROM companies JOIN jobads ON companies.companyid = jobads.companyid WHERE jobadid=${jobAdId}`
		);

		await client.query(sql`
			INSERT INTO job_applications
				(
					full_name,
					phone_number,
					email,
					cover_letter,
					jobadid,
					companyid
				)
			VALUES
				(
					${fullName},
					${phoneNumber},
					${applicantEmail},
					${coverLetter},
					${jobAdId},
					${companyId}
				)
		`);

		postToSlack(
			`The user with the email ${applicantEmail} and the phone number ${phoneNumber} has applied to the job with id=${jobAdId} for the company ${companyName}. The company's email is ${companyEmail}`
		);

		const emailOptions = {
			to: companyEmail,
			from: "postmaster@incentivizinggood.com",
			cc: applicantEmail,
			subject: `VIZE ${fullName} ha respondido a su anuncio de trabajo`,
			text: `
Para los que están en ${companyName},

	Felicitaciones, ¡acaban de recibir una nueva solicitud de empleo! Un usuario de Vize, ${fullName}, ha respondido a su puesto de trabajo (que recibió el id = ${jobAdId}). Proporcionaron la información de contacto a continuación, siéntanse libres de contactarlos directamente.

	Si tiene algún problema con este proceso, háganoslo saber. Si contrata a este empleado, envíenos un mensaje indicándonos lo que piensa de nuestro servicio. ¡Esperamos que haya encontrado el empleado perfecto para su empresa y el puesto!

Le deseamos lo mejor,

	El equipo de VIZE

INFORMACIÓN DEL SOLICITANTE
Nombre completo: ${fullName}
Email: ${applicantEmail}
Número de teléfono: ${phoneNumber}
carta de presentacion/Comentarios adicionales:
${coverLetter}
`.trim(),
		};

		await sendEmail(emailOptions);

		return true;
	};

	return execTransactionRW(transaction);
}
