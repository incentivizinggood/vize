import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";
import { postToSlack } from "imports/api/connectors/slack-webhook";

import CreateSalaryInput from "imports/lib/inputs/salary";

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

		// Since salary can only be created from review form,
		// only post income type and income amount since other info is redundant
		// TODO: add other fields to be posted on slack

		postToSlack(`The user with ID \`${userId}\` posted a salary.

*Salary ID:* ${salaryid}

*Income Type:* ${incomeType}

*Income Amount:* ${incomeAmount}
		`);

		return salaryid;
	};

	return execTransactionRW(transaction);
}
