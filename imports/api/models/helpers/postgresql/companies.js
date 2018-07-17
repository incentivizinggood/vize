export default class PgCompanyFunctions {
	static async getCompanyByName(client, name) {
		let companyResults = { rows: [] };
		let locationResults = { rows: [] };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);
		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[companyResults.rows[0].companyid]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[name]
		);

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async getCompanyById(client, id) {
		let companyResults = { rows: [] };
		let locationResults = { rows: [] };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[id]
		);
		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[id]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[companyResults.rows[0].name]
		);

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async companyNameRegexSearch(client, name, skip, limit) {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
			["%" + name + "%", skip, limit]
		);

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

		return {
			companies: companyResults.rows,
			locations: locationResults,
			reviewStats: statResults,
		};
	}

	static async getAllCompanies(client, skip, limit) {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies OFFSET $1 LIMIT $2",
			[skip, limit]
		);

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

		return {
			companies: companyResults.rows,
			locations: locationResults,
			reviewStats: statResults,
		};
	}

	static async createCompany(client, company) {
		let newCompany = { rows: [] };
		let newLocations = { rows: [] };

		// assumes that company has the well-known format
		// from the schema in imports/api/data/companies.js
		newCompany = await client.query(
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
		for (let location of company.locations) {
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

		newLocations = await client.query(
			"INSERT INTO company_locations (companyid,locationname) " +
				"VALUES " +
				insertValueString +
				" RETURNING *",
			insertValues
		);

		return {
			company: newCompany.rows[0],
			locations: newLocations.rows,
		};
	}

	// static async editCompany(company) {}
	// static async deleteCompany(name) {}
}
