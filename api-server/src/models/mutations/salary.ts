import sql from "src/utils/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "src/connectors/postgresql";
import { postToSlack } from "src/connectors/slack-webhook";

import CreateSalaryInput from "src/utils/inputs/salary";

export async function createSalary(
	input: CreateSalaryInput,
	userId: number
): Promise<number> {
	const {
		companyName,
		location,
		jobTitle,
		incomeType,
		incomeAmount,
		gender,
	}: CreateSalaryInput = await CreateSalaryInput.schema.validate(input);

	const transaction: Transaction<number> = async client => {
		{
			const {
				rows: [{ role }],
			} = await client.query(
				sql`SELECT role FROM users WHERE userid=${userId}`
			);

			if (role !== "worker") {
				// Error: Only employees may submit salaries.
				throw new Error("Solo los empleados pueden agregar salarios");
			}
		}

		{
			const { rows } = await client.query(
				sql`SELECT salaryid FROM salaries WHERE submittedby=${userId} AND companyname=${companyName}
				LIMIT 1`
			);

			if (rows.length > 0) {
				// Error: "You may not submit more than one salary for a company."
				throw new Error(
					"No puedes agregar más de un salario para una empresa"
				);
			}
		}

		const {
			rows: [{ salaryid }],
		} = await client.query(sql`
			INSERT INTO salaries
				(
					submittedby,
					companyname,
					salarylocation,
					jobtitle,
					incometype,
					incomeamount,
					gender
				)
			VALUES
				(
					${userId},
					${companyName},
					${location},
					${jobTitle},
					${incomeType},
					${incomeAmount},
					${gender}
				)
			RETURNING salaryid
		`);

		return salaryid;
	};

	return execTransactionRW(transaction);
}
