export default class PgCompanyFunctions {
	static async getCompanyByName(client, name) {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);

		if (companyResults.rows.length > 0) {
			locationResults = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[companyResults.rows[0].companyid]
			);
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[name]
			);
		}

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async getCompanyById(client, id) {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[id]
		);

		if (companyResults.rows.length > 0) {
			locationResults = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[id]
			);
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[companyResults.rows[0].name]
			);
		}

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
		let newStats = { rows: [] };

		// assumes that company has the well-known format
		// from the schema in imports/api/data/companies.js
		newCompany = await client.query(
			"INSERT INTO companies (name,yearEstablished,industry,contactPhoneNumber,descriptionOfCompany,numEmployees,contactEmail,websiteURL) " +
				"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", // I love PostgreSQL
			[
				company.name,
				company.yearEstablished,
				company.industry,
				company.contactPhoneNumber,
				company.descriptionOfCompany,
				company.numEmployees,
				company.contactEmail,
				company.websiteURL,
			]
		);

		if (newCompany.rows.length > 0) {
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
				"INSERT INTO company_locations (companyid,companylocation) " +
					"VALUES " +
					insertValueString +
					" RETURNING *",
				insertValues
			);
		}

		return {
			company: newCompany.rows[0],
			locations: newLocations.rows,
			/*
					Alas, PostgreSQL does not truly support
					"READ UNCOMMITTED" transactions, which
					prevents one from getting the review stats
					as well if there were already reviews for
					a company with the name of the new company,
					but I still want to prevent this function
					being yet another exception case for the
					purposes of results-processing, so we give
					back dummy, default values
				*/
			reviewStats: {
				name: newCompany.rows.length > 0 ? newCompany.rows[0].name : "",
				numreviews: 0,
				avgnummonthsworked: 0,
				percentrecommended: 0,
				healthandsafety: 0,
				managerrelationship: 0,
				workenvironment: 0,
				benefits: 0,
				overallsatisfaction: 0,
			},
		};
	}

	static processCompanyResults(companyResults) {
		/*
			Translate directly from model function results
			to Mongo SimplSchema format

			expects object with fields:
			company or companies -> singular company, or array of companies
			locations -> object with arrays indexed by company name
			optional reviewStats -> object with objects indexed by company name
			return array of companies, or dictionary of companies indexed by name?
			-> array is easier to iterate through
			-> companies should be in the same order they are given,
					assumes already sorted
		*/

		/*
			This function is super ugly but it works. If someone knows
			a better more functional-programming way to do this,
			please let me know or else feel free to fix it yourself.
		*/

		// singular company
		if (companyResults.company !== undefined) {
			return {
				_id: Number(companyResults.company.companyid),
				name: companyResults.company.name,
				contactEmail: companyResults.company.contactemail,
				yearEstablished: companyResults.company.yearestablished,
				numEmployees: companyResults.company.numemployees,
				industry: companyResults.company.industry,
				locations: companyResults.locations.map(loc =>
					JSON.parse(loc.companylocation)
				),
				contactPhoneNumber: companyResults.company.contactphonenumber,
				websiteURL: companyResults.company.websiteurl,
				descriptionOfCompany:
					companyResults.company.descriptionofcompany,
				dateJoined: companyResults.company.dateadded,
				numFlags: Number(companyResults.company.numflags),
				numReviews: Number(companyResults.reviewStats.numreviews),
				healthAndSafety: Number(
					companyResults.reviewStats.healthandsafety
				),
				managerRelationship: Number(
					companyResults.reviewStats.managerrelationship
				),
				workEnvironment: Number(
					companyResults.reviewStats.workenvironment
				),
				benefits: Number(companyResults.reviewStats.benefits),
				overallSatisfaction: Number(
					companyResults.reviewStats.overallsatisfaction
				),
				percentRecommended: Number(
					companyResults.reviewStats.percentrecommended
				),
				avgNumMonthsWorked: Number(
					companyResults.reviewStats.avgnummonthsworked
				),
			};
		}
		// array of companies
		else if (companyResults.companies !== undefined) {
			return companyResults.companies.map(company => {
				return {
					_id: Number(company.companyid),
					name: company.name,
					contactEmail: company.contactemail,
					yearEstablished: company.yearestablished,
					numEmployees: company.numemployees,
					industry: company.industry,
					locations: companyResults.locations[company.name].map(loc =>
						JSON.parse(loc.companylocation)
					),
					contactPhoneNumber: company.contactphonenumber,
					websiteURL: company.websiteurl,
					descriptionOfCompany: company.descriptionofcompany,
					dateJoined: company.dateadded,
					numFlags: Number(company.numflags),
					numReviews: Number(
						companyResults.reviewStats[company.name].numreviews
					),
					healthAndSafety: Number(
						companyResults.reviewStats[company.name].healthandsafety
					),
					managerRelationship: Number(
						companyResults.reviewStats[company.name]
							.managerrelationship
					),
					workEnvironment: Number(
						companyResults.reviewStats[company.name].workenvironment
					),
					benefits: Number(
						companyResults.reviewStats[company.name].benefits
					),
					overallSatisfaction: Number(
						companyResults.reviewStats[company.name]
							.overallsatisfaction
					),
					percentRecommended: Number(
						companyResults.reviewStats[company.name]
							.percentrecommended
					),
					avgNumMonthsWorked: Number(
						companyResults.reviewStats[company.name]
							.avgnummonthsworked
					),
				};
			});
		}
		return undefined;
	}

	// static async editCompany(company) {}
	// static async deleteCompany(name) {}
}
