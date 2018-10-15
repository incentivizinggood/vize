// import { Meteor } from "meteor/meteor";
import * as yup from "yup";

// Stole this code from an answer to a StackOverflow question,
// to use for validating pros and cons (which must have >= 5 words each),
// not sure how good of a long-term solution it is but it seems fine for now.
// https://stackoverflow.com/questions/6543917/count-number-of-words-in-string-using-javascript

const wordCount = (inputString) => inputString.split(/\s+\b/).length;

// QUESTION Are the defaults acceptable for most validation
// error messages, or will we always need to define our own
// for the sake of i18n?

// QUESTION How will we handle default field values?
// NOTE Probably through mapPropsToValues...

// NOTE All error messages defined in this file are hereby
// declared temporary until we make sure that i18n is accounted
// for, at which point this comment will be removed.

const pesosPerHourRegex = /^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/;
const emailWithTldRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNumberRegex = /^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\.．]?[  \t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?$/i;
const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

export const LocationSchema = yup.object().shape({
	city: yup.string().max(300).required(),
	address: yup.string().max(300).required(),
	industrialHub: yup.string().max(300).notRequired(),
});

export const CommentSchema = yup.object().shape({
	_id: yup.number().integer().required(),
	submittedBy: yup.number().integer().required(),
	refersto: yup.number().integer().required(),
	datePosted: yup.date().notRequired(),
	content: yup.string().required(),
	// NOTE not sure if these last four fields
	// will ever be used...
	upvotes: yup.number().integer().notRequired(),
	downvotes: yup.number().integer().notRequired(),
	username: yup.string().notRequired(),
	screenname: yup.string().notRequired(),
});

export const CompanySchema = yup.object().shape({
	_id: yup.number().integer().notRequired(),
	name: yup.string().max(100).required().test('companyNameTest', 'test not yet implemented!', () => false),
	contactEmail: yup.string().max(100).required().matches(emailWithTldRegex),
	contactPhoneNumber: yup.string().max(20).notRequired().matches(phoneNumberRegex),
	yearEstablished: yup.number().integer().notRequired().oneOf(
		[
			// NOTE Legacy SimpleSchema code, which was also used to
			// populate a drop-down (hence the calls to filter and reverse)
			// + 1 to include current year
			...Array(new Date().getFullYear() + 1).keys(),
		]
		.filter(
				// 1800 seems like a good minimum year for when a company
				// could have been established
				i => i >= 1800
			)
		// Bryce and Julian want more recent years first
		.reverse()
	),
	numEmployees: yup.string().notRequired().oneOf([
		"1 - 50",
		"51 - 500",
		"501 - 2000",
		"2001 - 5000",
		"5000+",
	]),
	industry: yup.string().max(50).notRequired(),
	locations: yup.array().of(LocationSchema).required(),
	websiteURL: yup.string().max(250).notRequired().matches(urlRegex),
	descriptionOfCompany: yup.string().max(6000).notRequired(),
	// NOTE Legacy comment
	// All fields after this point are only
	// ever used "internally" by the app,
	// for calculations or for other things
	// that are not editable by users.
	// NOTE dateJoined refers to the date the company created
	// their Vize profile, i.e. when they "joined" the site
	dateJoined: yup.date().notRequired(),
	// NOTE Legacy comment, not even sure if it still applies
	// numFlags is the number of times this company has been
	// "flagged" for some reason, Vize IT is free to decrease
	// as issues are dealt with
	numFlags: yup.number().integer().min(0).notRequired(),
	// QUESTION Do you think we might one day refactor
	// the ratings system into its own thing, so we don't
	// have to repeat the code for both companies and reviews?
	healthAndSafety: yup.number().min(0).max(5).notRequired(),
	managerRelationship: yup.number().min(0).max(5).notRequired(),
	workEnvironment: yup.number().min(0).max(5).notRequired(),
	benefits: yup.number().min(0).max(5).notRequired(),
	overallSatisfaction: yup.number().min(0).max(5).notRequired(),
	numReviews: yup.number().integer().min(0).notRequired(),
	percentRecommended: yup.number().min(0).max(1).notRequired(),
	/*
		NOTE Legacy comment
		avgNumMonthsWorked is calculated based on reviews
		left by workers who have left the company (i.e. have
		provided an end date for their employment),
		we use it as an indication of turnover rate.
		QUESTION
		It also includes data provided by workers who are
		still in their current jobs.
	*/
	avgNumMonthsWorked: yup.number().min(0).notRequired(),
});

export const JobAdSchema = yup.object().shape({
	_id: yup.number().integer().notRequired(),
	companyName: yup.string().max(100).required().test('jobAdCompanyNameTest', 'test not yet implemented!', () => false),
	// NOTE This used to be optional, now it is required,
	// because it is in fact required for companies to have
	// both a name and an ID, but the ID is easier to set automatically.
	// WARNING It *must* be checked for validity against
	// the company name, or otherwise the backend must
	// somehow be able to handle that error case.
	companyId: yup.number().integer().required(),
	jobTitle: yup.string().max(100).required(),
	locations: yup.array().of(LocationSchema).required(),
	pesosPerHour: yup.string().max(30).required().matches(pesosPerHourRegex),
	contractType: yup.string().required().oneOf(["Full time", "Part time", "Contractor"]),
	jobDescription: yup.string().max(6000).required(),
	responsibilities: yup.string().max(6000).required(),
	qualifications: yup.string().max(6000).required(),
	datePosted: yup.date().notRequired(),
});

export const JobApplicationSchema = yup.object().shape({
	jobId: yup.number().integer().required().test('jobApplicationCompanyIdTest', 'test not yet implemented!', () => false),
	companyName: yup.string().max(100).required().test('jobApplicationCompanyNameTest', 'test not yet implemented!', () => false),
	fullName: yup.string().max(150).required(),
	email: yup.string().max(100).required().matches(emailWithTldRegex),
	phoneNumber: yup.string().max(20).required().matches(phoneNumberRegex),
	coverLetterAndComments: yup.string().max(6000).notRequired(),
	dateSent: yup.date().notRequired(),
});

export const SalarySchema = yup.object().shape({
	_id: yup.number().integer().notRequired(),
	// QUESTION: should submittedBy be notRequired, or do we trust
	// that it's always automatically set? Users currently
	// must have accounts in order to submit salaries...
	submittedBy: yup.number().integer().required(),
	companyName: yup.string().max(100).required().test('salaryCompanyNameTest', 'test not yet implemented!', () => false),
	companyId: yup.number().integer().notRequired(),
	location: LocationSchema.required(),
	jobTitle: yup.string().max(100).required(),
	incomeType: yup.string().required().oneOf(["Yearly Salary", "Monthly Salary", "Hourly Wage"]),
	incomeAmount: yup.number().min(0).required(),
	gender: yup.string().notRequired().oneOf(["Male", "Female"]),
	datePosted: yup.date().notRequired(),
});

/*
	WARNING This is a very old comment/feature-request-note,
	and I have yet to update it to reflect the current
	state of the project.

	Desirable features (for reviews):
	- Drop-down list of known companies to choose from
		- List gets refined or even auto-filled as user types
	- ...ditto for locations, especially once company name is known
	- LOL these are all things that go with the form,
		not the schema, silly me
	- Unless I can configure allowedValues dynamically...
*/

export const ReviewSchema = yup.object().shape({
	_id: yup.number().integer().notRequired(),
	// QUESTION: should submittedBy be notRequired, or do we trust
	// that it's always automatically set? Users currently
	// must have accounts in order to submit reviews...
	submittedBy: yup.number().integer().required(),
	companyName: yup.string().max(100).required().test('reviewCompanyNameTest', 'test not yet implemented!', () => false),
	companyId: yup.number().integer().notRequired(),
	reviewTitle: yup.string().max(100).required("Review title is required!"),
	location: LocationSchema.required(), // if only it had always been this easy...
	jobTitle: yup.string().max(100).required(),
	numberOfMonthsWorked: yup.number().integer().min(0).required(),
	pros: yup.string().max(600).required().test('prosHasFiveWords', '${path} must have at least five words', () => false),
	cons: yup.string().max(600).required().test('consHasFiveWords', '${path} must have at least five words', () => false),
	wouldRecommendToOtherJobSeekers: yup.boolean().required(),
	healthAndSafety: yup.number().min(0).max(5).required(),
	managerRelationship: yup.number().min(0).max(5).required(),
	workEnvironment: yup.number().min(0).max(5).required(),
	benefits: yup.number().min(0).max(5).required(),
	overallSatisfaction: yup.number().min(0).max(5).required(),
	additionalComments: yup.string().max(6000).notRequired(),
	datePosted: yup.date().notRequired(),
	upvotes: yup.number().integer().min(0).notRequired(),
	downvotes: yup.number().integer().min(0).notRequired(),
	Comments: yup.array().of(CommentSchema).notRequired(),
});

export const VoteSchema = yup.object().shape({
	submittedBy: yup.number().integer().required(),
	voteSubject: yup.string().required().oneOf(["review", "comment"]),
	references: yup.number().integer().required(),
	value: yup.boolean().required(),
});
