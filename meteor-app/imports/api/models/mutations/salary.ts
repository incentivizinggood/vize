import sql from "imports/lib/sql-template";
import {
	execTransactionRW,
	Transaction,
} from "imports/api/connectors/postgresql";

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
				throw new Error("Only employees may submit salaries.");
			}
		}

		{
			const { rows } = await client.query(
				sql`SELECT salaryid FROM salaries WHERE submittedby=${userId} AND companyname=${companyName}
				LIMIT 1`
			);

			if (rows.length > 0) {
				throw new Error(
					"You may not submit more than one salary for a company."
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
