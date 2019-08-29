import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";
import { sendEmail } from "imports/api/connectors/email";

import {
	CreateJobAdInput,
	CreateApplyToJobAdInput,
} from "imports/lib/inputs/job-ad";

export async function createJobAd(
	input: CreateJobAdInput,
	userId: number
): Promise<number> {
	const {
		jobTitle,
		locations,
		pesosPerHour,
		contractType,
		jobDescription,
		responsibilities,
		qualifications,
	}: CreateJobAdInput = await CreateJobAdInput.schema.validate(input);

	const transaction: Transaction<number> = async client => {
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

export async function applyToJobAd(
	input: CreateApplyToJobAdInput
): Promise<boolean> {
	const {
		jobAdId,
		fullName,
		email: applicantEmail,
		phoneNumber,
		coverLetter,
	}: CreateApplyToJobAdInput = await CreateApplyToJobAdInput.schema.validate(
		input
	);

	const transaction: Transaction<boolean> = async client => {
		const {
			rows: [{ name: companyName, contactemail: companyEmail }],
		} = await client.query(
			sql`SELECT name, contactemail FROM companies JOIN jobads ON companies.companyid = jobads.companyid WHERE jobadid=${jobAdId}`
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
