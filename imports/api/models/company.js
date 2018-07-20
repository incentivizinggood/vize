// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, StarRatings, AllModels } from "./common.js";

import PgCompanyFunctions from "./helpers/postgresql/companies.js";

const defaultPageSize = 100;

export type Company = {
	_id: ID,
	name: string,

	contactEmail: string,
	dateEstablished: ?Date,
	numEmployees: ?(
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+"
	),
	industry: ?string,
	locations: [string],
	otherContactInfo: ?string,
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

export default class CompanyModel {
	connector: Object;

	constructor(connector: Object) {
		this.connector = connector; // forget this (should be PostgreSQL)
	}

	init({  }: AllModels) {
		// This does not need any references to other models.
	}

	// Get the company with a given id.
	async getCompanyById(id: ID): Company {
		// id is a string for now, and company id's
		// are integers, so I think this should be fine
		// for now
		if (!Number.isNaN(Number(id)))
			return PgCompanyFunctions.processCompanyResults(
				await this.connector.executeQuery(
					PgCompanyFunctions.getCompanyById,
					Number(id)
				)
			);
		return undefined;
	}

	// Get the company with a given name.
	async getCompanyByName(name: string): Company {
		return PgCompanyFunctions.processCompanyResults(
			await this.connector.executeQuery(
				PgCompanyFunctions.getCompanyByName,
				name
			)
		);
	}

	// Get all of the companies.
	async getAllCompanies(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Company] {
		return PgCompanyFunctions.processCompanyResults(
			await this.connector.executeQuery(
				PgCompanyFunctions.getAllCompanies,
				pageNumber,
				pageSize
			)
		);
	}

	async searchForCompanies(
		searchText: string,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Company] {
		return PgCompanyFunctions.processCompanyResults(
			await this.connector.executeQuery(
				PgCompanyFunctions.companyNameRegexSearch,
				searchText,
				pageNumber,
				pageSize
			)
		);
	}

	createCompany(companyParams: mixed): Company {
		throw new Error("Not implemented yet");
	}

	editCompany(id: ID, companyChanges: mixed): Company {
		throw new Error("Not implemented yet");
	}

	deleteCompany(id: ID): Company {
		throw new Error("Not implemented yet");
	}
}
