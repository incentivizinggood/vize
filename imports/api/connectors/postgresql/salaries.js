import pool from "./connection-pool.js";

export default class SalaryConnector {
	static async getSalaryById(id) {
		const client = await pool.connect();
		let salaryResults = { rows: [] };

		try {
			await client.query("START TRANSACTION READ ONLY");

			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE salaryid=$1",
				[id]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			salary: salaryResults.rows[0],
		};
	}

	static async getAllSalaries(skip, limit) {
		const client = await pool.connect();
		let salaryResults = { rows: [] };

		try {
			await client.query("START TRANSACTION READ ONLY");

			salaryResults = await client.query(
				"SELECT * FROM salaries OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			salaries: salaryResults.rows,
		};
	}

	static async getSalariesByAuthor(id, skip, limit) {
		const client = await pool.connect();
		let salaryResults = { rows: [] };

		try {
			await client.query("START TRANSACTION READ ONLY");

			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			salaries: salaryResults.rows,
		};
	}

	static async getSalariesForCompany(name, skip, limit) {
		const client = await pool.connect();
		let salaryResults = { rows: [] };

		try {
			await client.query("START TRANSACTION READ ONLY");

			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
				[name, skip, limit]
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			salaries: salaryResults.rows,
		};
	}

	static async submitSalary(salary) {
		// assumes salary is formatted for SimplSchema conformity
		const client = await pool.connect();
		let newSalary = { rows: [] };

		try {
			await client.query("START TRANSACTION");
			newSalary = await client.query(
				"INSERT INTO salaries " +
					"(submittedby,companyname,companyid,salarylocation," +
					"jobtitle,incometype,incomeamount,gender) " +
					"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
					"RETURNING *",
				[
					salary.submittedBy,
					salary.companyName,
					salary.companyId,
					salary.location,
					salary.jobTitle,
					salary.incomeType,
					salary.incomeAmount,
					salary.gender,
				]
			);
			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			salary: newSalary.rows[0],
		};
	}

	//	editSalary

	//	deleteSalary
}
