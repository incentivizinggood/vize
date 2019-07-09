const queryRoutes = {
	companies: "companies",
	companyProfile: "companyprofile",
	writeReview: "write-review",
	submitSalaryData: "submit-salary-data",
	applyForJob: "apply-for-job",
	user: "user",
};

// exporting commonly-used URL generators
// in order to reduce the risk of typos
// and reduce the use of magic strings
const vizeProfileUrl = function(companyId) {
	return `/${queryRoutes.companyProfile}/?id=${companyId}`;
};
const vizeReviewUrl = function(companyId) {
	return `/${queryRoutes.writeReview}/?id=${companyId}`;
};
const vizeSalaryUrl = function(companyId) {
	return `/${queryRoutes.submitSalaryData}/?id=${companyId}`;
};
const vizeApplyForJobUrl = function(jobId) {
	return `/${queryRoutes.applyForJob}/?id=${jobId}`;
};

const urlGenerators = {
	vizeProfileUrl,
	vizeReviewUrl,
	vizeSalaryUrl,
	vizeApplyForJobUrl,
};

export { queryRoutes, urlGenerators };
