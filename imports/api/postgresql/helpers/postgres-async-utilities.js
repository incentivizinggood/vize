/*
	Justification for this file and associated
	functions and classes:

	node-pg relies on asynchronous functions,
	and I have found that the easiest way to use them
	is through async/await. However, this requires functions
	to be declared async, and it seems easier to
	create a container class where all the functions
	can be async rather than trying to shoehorn
	that behavior into the existing GraphQL model code,
	especially since Meteor tends to be unpredictable
	about how it executes such code.

	Moreover, it keeps all the node-pg connection management
	code in one place, which make it much easier both to
	debug and to add features to, and isolates it for testing.

	Models can now worry solely about taking the results
	and packaging them into whatever the schema expects,
	and this class only worries about querying the database.
*/

const { Pool } = require("pg");

const pool = new Pool();

const closeAndExit = function() {
	pool.end();
	process.exit();
};

process.on("SIGTERM", closeAndExit());
process.on("SIGINT", closeAndExit());

export default class PosgresAsyncUtilities {
	/*
		NOTE: can take an object as an argument,
		and if one or another field is defined then
		use that field, gives a bit more freedom

		-- Basic query functions --

		getCompanyByName(name)
		getCompanyById(id)
		getCompanyLocations({id,name})
		getCompanyStats({id,name})
		companyNameRegexSearch(skip,limit)

		getReviewById(id)
		getReviewsByAuthor(id,skip,limit)

		getCommentById(id)

		getJobAdById(id)

		getSalaryById

		getVoteById(id) -> currently not possible, does it even make sense?

		-- Composite query functions --

		getAllCompanies(skip,limit) -> gets all companies, and assembles all
							location and stat info as appropriate

		getAllReviews(skip,limit) -> gets all reviews, and assembles all
							location and voting info
		getReviewsForCompany(name,skip,limit) -> gets all reviews for company,
							assembles all voting and location info

		getAllComments(skip,limit)
		getCommentsByAuthor(id,skip,limit)

		getAllJobAds(skip,limit)
		getJobAdsByCompany(companyName,skip,limit)

		getAllSalaries(skip,limit)
		getSalariesByAuthor(id,skip,limit)
		getSalariesForCompany(name,skip,limit)

		getAllVotes(skip,limit)
		getVotesByAuthor(id,skip,limit)
		getVotesForSubject(subject,refersto,skip,limit)

		-- Basic DML functions --

		createCompany -> creates company and inserts company locations as well
		editCompany -> will need to be diligent about handling updated to company locations
		deleteCompany -> should simple delete cascade?

		submitReview
		editReview
		deleteReview

		writeComment
		editComment
		deleteComment

		postJobAd
		editJobAd
		deleteJobAd

		submitSalary
		editSalary
		deleteSalary

		castVote
		removeVote
	*/

	// temporary example of syntax
	static async asdf() {}
}
