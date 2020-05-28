import sql from "src/utils/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "src/connectors/postgresql";

import CreateCompanyInput from "src/utils/inputs/company";

export async function createCompany(
	input: CreateCompanyInput,
	userId: number
): Promise<number> {
	const transaction: Transaction<number> = async client => {
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
		}: CreateCompanyInput = await CreateCompanyInput.schema.validate(input);

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

		const locationValues = locations
			.map(l => sql`(${companyid}, ${JSON.stringify(l)})`)
			.reduce((a, c) => sql`${a}, ${c}`);
		await client.query(sql`
			INSERT INTO company_locations
				(companyid, companylocation)
			VALUES
				${locationValues}
		`);

		return companyid;
	};

	return execTransactionRW(transaction);
}
