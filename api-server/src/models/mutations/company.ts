import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { locationInputSchema } from "./location";

const createCompanyInputSchema = yup
	.object({
		name: yup.string().required(),
		contactEmail: yup
			.string()
			.email("El correo electrónico debe ser válido")
			.required(),
		yearEstablished: yup.number(),
		numEmployees: yup
			.string()
			.oneOf([
				"1 - 50",
				"51 - 500",
				"501 - 2000",
				"2001 - 5000",
				"5000+",
			]),
		industry: yup.string(),
		locations: yup.array().required().min(1).of(locationInputSchema),
		contactPhoneNumber: yup.string(),
		websiteURL: yup.string().url(),
		descriptionOfCompany: yup.string(),
	})
	.required();

export async function createCompany(
	input: unknown,
	userId: number
): Promise<number> {
	const transaction: Transaction<number> = async (client) => {
		{
			const {
				rows: [{ role, companyid }],
			} = await client.query(
				sql`SELECT role, companyid FROM users WHERE userid=${userId}`
			);

			if (role !== "company-unverified" && role !== "company") {
				throw new Error("Only employers may create a company.");
			}

			if (companyid !== null) {
				throw new Error("You may not create another company");
			}
		}

		const {
			name,
			contactEmail,
			yearEstablished,
			numEmployees,
			industry,
			locations,
			contactPhoneNumber,
			websiteURL,
			descriptionOfCompany,
		} = await createCompanyInputSchema.validate(input);

		const {
			rows: [{ companyid }],
		} = await client.query(sql`
			INSERT INTO companies
				(
					name, yearEstablished, industry,
					contactPhoneNumber, descriptionOfCompany, numEmployees,
					contactEmail, websiteURL
				)
			VALUES
				(
					${name}, ${yearEstablished}, ${industry},
					${contactPhoneNumber}, ${descriptionOfCompany}, ${numEmployees},
					${contactEmail}, ${websiteURL}
				)
			RETURNING companyid
		`);

		await client.query(sql`
			UPDATE users
			SET companyid=${companyid}
			WHERE userid=${userId}
		`);

		await client.query(sql`
			INSERT INTO company_locations
				(companyid, city, address, industrial_hub)
			VALUES
				${locations
					.map(
						(l) =>
							sql`(
								${companyid},
								${l.city},
								${l.address},
								${l.industrialHub}
							)`
					)
					.reduce((a, c) => sql`${a}, ${c}`)}
		`);

		return companyid;
	};

	return execTransactionRW(transaction);
}
