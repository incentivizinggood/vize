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
		jobTitle: yup.string().required(),
		companyId: yup.string().required(),
		numReviews: yup.number().required(),
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
		jobTitle,
		fullName,
		email: applicantEmail,
		phoneNumber,
		coverLetter,
		companyId,
		numReviews,
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

		const employerEmailOptions = {
			to: companyEmail,
			subject: `¡${fullName} aplico a su oferta de empleo en Vize!`,
			text: `
Para los que están en ${companyName},

¡Felicitaciones, acaban de recibir una solicitud de empleo nueva! Esta solicitud fue para la oferta de trabajo con el título del empleo "${jobTitle}". Puedes ver la oferta de trabajo con este enlace: www.vize.mx/trabajo/${jobAdId}

Aquí les proporcionamos la información del solicitante: 
Nombre completo: ${fullName} 
Email: ${applicantEmail} 
Número de teléfono: ${phoneNumber} 
Carta de presentación/Comentarios adicionales: ${coverLetter}

¿Ya llenaste esta vacante? Responde a este email para hacernos saber. Nosotros quitaremos la oferta de la plataforma y le avisaremos a los solicitantes.

¿Quieres editar la información en esta oferta de trabajo? Responde a este email con los cambios que quieras hacer.

¿Tienes más vacantes? Nos puedes mandar la información de la oferta de trabajo y nosotros podemos publicar la oferta. Si prefieres, también puedes iniciar una sesión con tu cuenta aqui: https://www.vize.mx/iniciar-sesion y despues puedes llenar esta encuesta para crear la oferta de empleo: https://www.vize.mx/publicar-una-oferta

Si tienes algún problema o una sugerencia de cómo mejorar este proceso, por favor háganoslo saber. ¡Esperamos que encuentren empleados excepcionales para su empresa!

También me puedes contactar por WhatsApp para cualquier cosa: +52(664)748-0001 (https://wa.me/5216647480001)

Todo lo mejor,
Julian Alvarez`.trim(),
		};

		const spaceIndex = fullName.indexOf(" ");
		const firstName =
			spaceIndex === -1 ? fullName : fullName.substr(0, spaceIndex);

		const readReview =
			numReviews > 0
				? `Lee evaluaciones escritas por empleados que han trabajado en ${companyName} para obtener más información sobre cómo es la experiencia de trabajar en esta fábrica: https://www.vize.mx/perfil-de-la-empresa/${companyId}`
				: "";

		const applicantEmailOptions = {
			to: applicantEmail,
			subject: `¡Tu solicitud a ${companyName} se envió con éxito!`,
			text: `
Hola ${firstName},

Tu solicitud para el puesto "${jobTitle}" se envió con éxito a ${companyName}.

${companyName} se comunicará contigo pronto si hay algún interés. Te informaremos cuando se llenen las vacantes para este empleo.

Por favor mandanos un mensaje por WhatsApp o responde a este email si tienes alguna pregunta, problema, o duda. Nos encantaría escuchar de tu experiencia para poder mejorar la plataforma: +52(664)748-0001 (https://wa.me/5216647480001)

${readReview}

Puedes encontrar más empleos para postularte aquí: https://www.vize.mx/trabajos

¿Conoces a alguien que esté buscando empleo en una fábrica? Comparte este enlace con ellos para que puedan encontrar un buen trabajo. https://www.vize.mx/trabajos

Todo lo mejor,
Julian Alvarez
`.trim(),
		};

		await sendEmail(applicantEmailOptions);
		await sendEmail(employerEmailOptions);

		return true;
	};

	return execTransactionRW(transaction);
}
