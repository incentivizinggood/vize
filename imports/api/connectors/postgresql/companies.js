import { pool } from "./connection-pool.js";

export default class CompanyConnector {
	static async getCompanyByName(name) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);
		const locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[companyResults.rows[0].companyid]
		);
		const statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async getCompanyById(id) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[id]
		);
		const locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[id]
		);
		const statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[companyResults.rows[0].name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async companyNameRegexSearch(name, skip, limit) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
			["%" + name + "%", skip, limit]
		);

		const locationResults = {};
		const statResults = {};
		for (let company of companyResults.rows) {
			let locations = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[company.companyid]
			);
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			locationResults[company.name] = locations.rows;
			statResults[company.name] = stats.rows[0];
		}

		await client.query("COMMIT");
		client.release();

		return {
			matchingCompanies: companyResults.rows,
			matchingCompanyLocations: locationResults,
			matchingCompanyReviewStats: statResults,
		};
	}

	static async getAllCompanies(skip, limit) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies OFFSET $1 LIMIT $2",
			[skip, limit]
		);

		const locationResults = {};
		const statResults = {};
		for (let company of companyResults.rows) {
			let locations = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[company.companyid]
			);
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			locationResults[company.name] = locations.rows;
			statResults[company.name] = stats.rows[0];
		}

		await client.query("COMMIT");
		client.release();

		return {
			matchingCompanies: companyResults.rows,
			matchingCompanyLocations: locationResults,
			matchingCompanyReviewStats: statResults,
		};
	}

	static async createCompany(company) {
		const client = await pool.connect();
		await client.query("START TRANSACTION");

		// assumes that company has the well-known format
		// from the schema in imports/api/data/companies.js
		const newCompany = await client.query(
			"INSERT INTO companies (name,dateEstablished,industry,otherContactInfo,descriptionOfCompany,numEmployees,contactEmail,websiteURL) " +
				"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", // I love PostgreSQL
			[
				company.name,
				company.dateEstablished,
				company.industry,
				company.otherContactInfo,
				company.descriptionOfCompany,
				company.numEmployees,
				company.contactEmail,
				company.websiteURL,
			]
		);

		// screw functional programming
		const id = newCompany.rows[0].companyid;
		let insertValues = [];
		let insertValueString = "";
		let index = 0;
		for (location of company.locations) {
			insertValues.push(id, location);
			insertValueString =
				insertValueString +
				"($" +
				(index + 1) +
				",$" +
				(index + 2) +
				"),";
			index += 2;
		}
		insertValueString = insertValueString.slice(0, -1);

		const newLocations = await client.query(
			"INSERT INTO company_locations (companyid,locationname) " +
				"VALUES " +
				insertValueString +
				" RETURNING *",
			insertValues
		);

		await client.query("COMMIT");
		client.release();

		return {
			company: newCompany.rows[0],
			locations: newLocations.rows,
		};
	}

	// static async editCompany(company) {}
	// static async deleteCompany(name) {}
}
