import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";

import { locationInputSchema } from "./input-schemas";

const createSalaryInputSchema = yup
	.object({
		companyName: yup.string().required(),
		location: locationInputSchema,
		jobTitle: yup.string().required(),
		incomeType: yup
			.string()
			.oneOf([
				"Yearly Salary",
				"Monthly Salary",
				"Weekly Salary",
				"Daily Salary",
				"Hourly Wage",
			])
			.required(),
		incomeAmount: yup.number().min(0).required(),
		gender: yup.string().oneOf(["Male", "Female"]),
	})
	.required();

export async function createSalary(
	input: unknown,
	userId: number
): Promise<number> {
	const {
		companyName,
		location,
		jobTitle,
		incomeType,
		incomeAmount,
		gender,
	} = await createSalaryInputSchema.validate(input);

	const transaction: Transaction<number> = async (client) => {
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
					city,
					address,
					industrial_hub,
					jobtitle,
					incometype,
					incomeamount,
					gender
				)
			VALUES
				(
					${userId},
					${companyName},
					${location.city},
					${location.address},
					${location.industrialHub},
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
