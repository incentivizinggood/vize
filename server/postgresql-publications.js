// import { Meteor } from "meteor/meteor";
// import { LivePg } from "meteor/numtel:pg";
//
// /* ----------------------------
//
// 	POSTGRESQL PUBLICATIONS
//
// 	Apparently LivePg is only defined on the server,
// 	so trying to import it on the client causes the
// 	client to crash. But that kind of makes sense,
// 	and I guess this sort of thing should really only
// 	be on the server anyway, and most of the instructions
// 	specify things like "On the server side of your
// 	application..."
//
//  ------------------------------ */
//
// const PG_CONNECTION_STRING = `postgresql://${process.env.PGUSER}:${
// 	process.env.PGPASSWORD
// }@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
// const PG_CHANNEL_NAME = "vize_app_pg_clients";
//
// const liveDb = new LivePg(PG_CONNECTION_STRING, PG_CHANNEL_NAME);
//
// const closeAndExit = function() {
// 	liveDb.cleanup(process.exit);
// };
//
// process.on("SIGTERM", closeAndExit);
// process.on("SIGINT", closeAndExit);
//
// /*
// 	Publications, currently tailored to the specific
// 	needs of the frontend code. Not the best design,
// 	but it's only temporary.
// */
//
// // const companyByIdSub = PgSubscription("CompanyProfilesById",companyId);
// Meteor.publish("CompanyProfilesById", function(companyId) {
// 	return liveDb.select("SELECT * FROM companies WHERE companyid=$1", [
// 		companyId,
// 	]);
// });
//
// // const locationsForCompanySub = PgSubscription("LocationsForCompanyById",companyId);
// Meteor.publish("LocationsForCompanyById", function(companyId) {
// 	return liveDb.select("SELECT * FROM company_locations WHERE companyid=$1", [
// 		companyId,
// 	]);
// });
//
// // const reviewsForCompanySub = PgSubscription("ReviewsForCompanyById",companyId);
// Meteor.publish("ReviewsForCompanyById", function(companyId) {
// 	return liveDb.select(
// 		"SELECT * FROM reviews_with_vote_counts WHERE companyid=$1",
// 		[companyId]
// 	);
// });
//
// // const jobAdsForCompanySub = PgSubscription("JobAdsForCompanyById",companyId);
// Meteor.publish("JobAdsForCompanyById", function(companyId) {
// 	return liveDb.select("SELECT * FROM jobads WHERE companyid=$1", [
// 		companyId,
// 	]);
// });
//
// // const locationsForJobAdsByCompanySub = PgSubscription("JobAdLocationsForCompanyByCompanyId",companyId);
// Meteor.publish("JobAdLocationsForCompanyByCompanyId", function(companyId) {
// 	return liveDb.select(
// 		"SELECT * FROM job_locations WHERE jobadid IN (SELECT jobadid FROM jobads WHERE companyid=$1)",
// 		[companyId]
// 	);
// });
//
// // const salariesForCompanySub = PgSubscription("SalariesForCompanyById",companyId);
// Meteor.publish("SalariesForCompanyById", function(companyId) {
// 	return liveDb.select("SELECT * FROM salaries WHERE companyid=$1", [
// 		companyId,
// 	]);
// });
//
// // const votesByUserForReviewsOnCompanySub = PgSubscription(
// // 	"VotesByUserForReviewsOnCompany",
// // 	Meteor.userId()
// // });
// Meteor.publish("VotesByUserForReviewsOnCompany", function(userMongoId) {
// 	return liveDb.select(
// 		"SELECT * FROM review_votes WHERE submittedBy IN (SELECT userid AS submittedBy FROM users WHERE usermongoid=$1)",
// 		[userMongoId]
// 	);
// });
//
// // const jobAdCountSub = PgSubscription("CompanyJobAdCounts", company.name);
// Meteor.publish("CompanyJobAdCounts", function(companyName) {
// 	return liveDb.select("SELECT * FROM job_post_counts WHERE companyname=$1", [
// 		companyName,
// 	]);
// });
//
// // const salaryCountSub = PgSubscription("CompanySalaryCounts", company.name);
// Meteor.publish("CompanySalaryCounts", function(companyName) {
// 	return liveDb.select("SELECT * FROM salary_counts WHERE companyname=$1", [
// 		companyName,
// 	]);
// });
