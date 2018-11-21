// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { CompanySchema } from "/imports/api/data/companies.js";

import type { ID } from "/imports/api/models";

const defaultPageSize = 100;

export type Company = {
	_id: ID,
	name: string,

	contactEmail: string,
	yearEstablished: ?number,
	numEmployees: ?(
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+"
	),
	industry: ?string,
	contactPhoneNumber: ?string,
	websiteURL: ?string,
	descriptionOfCompany: ?string,
	dateJoined: ?Date,
	numFlags: ?number,

	healthAndSafety: ?number,
	managerRelationship: ?number,
	workEnvironment: ?number,
	benefits: ?number,
	overallSatisfaction: ?number,

	numReviews: number,
	percentRecommended: ?number,
	avgNumMonthsWorked: ?number,
};

type CompanyData = {
	[string]: string,
	numemployees: ?(
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+"
	),
};
type ReviewStatsData = { [string]: string };

function processResultsToCompany(
	company: CompanyData,
	reviewStats: ReviewStatsData
): Company {
	return {
		_id: company.companyid,
		name: company.name,
		contactEmail: company.contactemail,
		yearEstablished: Number(company.yearestablished),
		numEmployees: company.numemployees,
		industry: company.industry,
		contactPhoneNumber: company.contactphonenumber,
		websiteURL: company.websiteurl,
		descriptionOfCompany: company.descriptionofcompany,
		dateJoined: new Date(company.dateadded),
		numFlags: Number(company.numflags),
		numReviews: Number(reviewStats.numreviews),
		healthAndSafety: Number(reviewStats.healthandsafety),
		managerRelationship: Number(reviewStats.managerrelationship),
		workEnvironment: Number(reviewStats.workenvironment),
		benefits: Number(reviewStats.benefits),
		overallSatisfaction: Number(reviewStats.overallsatisfaction),
		percentRecommended: Number(reviewStats.percentrecommended),
		avgNumMonthsWorked: Number(reviewStats.avgnummonthsworked),
	};
}

function processResultsToCompanies(
	companies: CompanyData[],
	reviewStats: { [string]: ReviewStatsData }
): Company[] {
	return companies.map(company =>
		processResultsToCompany(company, reviewStats[company.name])
	);
}

// Get the company with a given id.
export async function getCompanyById(id: ID): Promise<Company> {
	// id is a string for now, and company id's
	// are integers, so I think this should be fine
	// for now
	if (Number.isNaN(Number(id))) throw Error("not a valid company id");

	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[Number(id)]
		);

		if (companyResults.rows.length > 0) {
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[companyResults.rows[0].name]
			);
		}

		return processResultsToCompany(
			companyResults.rows[0],
			statResults.rows[0]
		);
	};

	return execTransactionRO(transaction);
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);

		if (companyResults.rows.length > 0) {
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[name]
			);
		}

		return processResultsToCompany(
			companyResults.rows[0],
			statResults.rows[0]
		);
	};

	return execTransactionRO(transaction);
}

// Get all of the companies.
export async function getAllCompanies(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		for (let company of companyResults.rows) {
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			statResults[company.name] = stats.rows[0];
		}

		return processResultsToCompanies(companyResults.rows, statResults);
	};

	return execTransactionRO(transaction);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
			["%" + searchText + "%", pageNumber * pageSize, pageSize]
		);

		for (let company of companyResults.rows) {
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			statResults[company.name] = stats.rows[0];
		}

		return processResultsToCompanies(companyResults.rows, statResults);
	};

	return execTransactionRO(transaction);
}

export function isCompany(obj: any): boolean {
	// CompanySchema
	// 	.newContext()
	// 	.validate(obj);
	const context = CompanySchema.newContext();
	context.validate(obj);
	return context.isValid();
}

export async function createCompany(companyParams: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function editCompany(id: ID, companyChanges: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: ID): Company {
	throw new Error("Not implemented yet");
}
