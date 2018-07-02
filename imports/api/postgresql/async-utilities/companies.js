import { pool } from "../connection-pool.js";

export default class CompanyConnector {
	/*
		getCompanyByName(name)
		getCompanyById(id)
		getCompanyLocations({id,name})
		getCompanyStats({id,name})
		companyNameRegexSearch(skip,limit)

		getAllCompanies(skip,limit) -> gets all companies, and assembles all
							location and stat info as appropriate

		createCompany -> creates company and inserts company locations as well
		editCompany -> will need to be diligent about handling updated to company locations
		deleteCompany -> should simple delete cascade?
	*/
}
