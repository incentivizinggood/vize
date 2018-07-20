import { Meteor } from "meteor/meteor";
import { LivePg } from "meteor/numtel:pg";

/* ----------------------------

	POSTGRESQL PUBLICATIONS

	Apparently LivePg is only defined on the server,
	so trying to import it on the client causes the
	client to crash. But that kind of makes sense,
	and I guess this sort of thing should really only
	be on the server anyway, and most of the instructions
	specify things like "On the server side of your
	application..."

	Current Mongo publications, so we have an idea
	of what we're trying to replace:
	Companies:
	Meteor.publish("CompanyProfiles", function() {
		return Companies.find({});
	});
	Reviews:
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
	JobAds:
	Meteor.publish("JobAds", function() {
		return JobAds.find({});
	});
	Salaries:
	Meteor.publish("Salaries", function() {
		return Salaries.find({});
	});
	Comments:
	Meteor.publish("Comments", function() {
		return Comments.find({});
	});
	Votes:
	Meteor.publish("Votes", function() {
		return Votes.find({});
	});

	...so basically, the only publication that restricts
	its fields is the only publication that would still
	be using Mongo to do so: Meteor.Users

	However, votes and locations make this a bit more complicated.
	We can certainly subscribe to views, and we can certainly use
	the subscribe functions to process the results.

	...I guess we would also need a good idea of what kind
	of subscriptions we're trying to replace. Here are some
	data needs from around the block:
	- count of job posts by company
	- count of salaries posted for a company
	- individual companies (processed)
	- all reviews for a company (processed)
	- all job ads by a company (processed)
	- all salaries for a company (processed)
	- votes by a certain user on reviews for a certain company

	export default withTracker(({ company })) => {
		const jobAdCountSub = PgSubscription("CompanyJobAdCounts", company.name);
		const salaryCountSub = PgSubscription("CompanySalaryCounts", company.name);

		return {
			jobads: jobAdCountSub[0].count // process?
			salaries: salaryCountSub[0].count // process?
		};
	}

	export default withTracker(() => {
		const jobAdSub = PgSubscription("JobAds");

		return {
			isReady: jobAdSub.ready(),
			jobads: jobAdSub.map(...process),
			numberofjobs: jobAdSub.length, // Again, PgSubscription extends array
		};
	})(ShowJobs);

	export default withTracker(({ companyId }) => {
		const companyByIdSub = PgSubscription("CompanyProfilesById",companyId);
		const reviewsForCompanySub = PgSubscription("ReviewsForCompanyById",companyId);
		const jobAdsForCompanySub = PgSubscription("JobAdsForCompanyById",companyId);
		const salariesForCompanySub = PgSubscription("SalariesForCompanyById",companyId);
		const votesByUserForReviewsOnCompanySub = PgSubscription(
			"VotesByUserForReviewsOnCompany",
			Meteor.userId()
		});

		return {
			isReady:
				companyByIdSub.ready() &&
				reviewsForCompanySub.ready() &&
				jobAdsForCompanySub.ready() &&
				salariesForCompanySub.ready() &&
				votesByUserForReviewsOnCompanySub.ready(),
			company: companyByIdSub[0] // process,
			reviews: reviewForCompanySub.map(...process),
			jobAds: jobAdsForCompanySub.map(...process),
			jobsCount: jobAdsForCompanySub.length,
			salaries: salariesForCompanySub.map(...process),
			salariesCount: salariesForCompanySub.length,

			// not sure what to do about this last one
			userVotes: Votes, // the fetch thing doesn't suit my needs - Josh
		};
	})(CompanyProfile);

 ------------------------------ */

const PG_CONNECTION_STRING = `postgresql://${process.env.PGUSER}:${
	process.env.PGPASSWORD
}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const PG_CHANNEL_NAME = "vize_app_pg_clients";

const liveDb = new LivePg(PG_CONNECTION_STRING, PG_CHANNEL_NAME);

const closeAndExit = function() {
	liveDb.cleanup(process.exit);
};

process.on("SIGTERM", closeAndExit);
process.on("SIGINT", closeAndExit);
