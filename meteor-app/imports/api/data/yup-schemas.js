// import { Meteor } from "meteor/meteor";
import * as yup from "yup";
import {
	i18nReq,
	i18nMinNumber,
	i18nMaxNumber,
	i18nMaxString,
	i18nNoDecimal,
	i18nNotAllowed,
	i18nTypeError,
	i18nRegEx } from "/i18n/helpers.js";

// Stole this code from an answer to a StackOverflow question,
// to use for validating pros and cons (which must have >= 5 words each),
// not sure how good of a long-term solution it is but it seems fine for now.
// https://stackoverflow.com/questions/6543917/count-number-of-words-in-string-using-javascript

const wordCount = (inputString) => {
	if(inputString === undefined ||
		inputString === null ||
		typeof inputString !== 'string' ||
		inputString.length === 0)
		return 0;
	else return inputString.split(/\s+\b/).length;
};

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
	city: yup.string().typeError(i18nTypeError.string("LocationSubField.locationCity")).max(300,i18nMaxString("LocationSubField.locationCity",300)).required(i18nReq("LocationSubFields.locationCity")),
	address: yup.string().typeError(i18nTypeError.string("LocationSubField.locationAddress")).max(300,i18nMaxString("LocationSubField.locationAddress",300)).required(i18nReq("LocationSubFields.locationAddress")),
	industrialHub: yup.string().typeError(i18nTypeError.string("LocationSubField.locationIndustrialHub")).max(300,i18nMaxString("LocationSubField.locationIndustrialHub",300)).notRequired(),
});

export const CommentSchema = yup.object().shape({
	_id: yup.number().typeError(i18nTypeError.number("Comments._id")).integer(i18nNoDecimal("Comments._id")).required(i18nReq("Comments._id")),
	submittedBy: yup.number().typeError(i18nTypeError.number("Comments.submittedBy")).integer(i18nNoDecimal("Comments.submittedBy")).required(i18nReq("Comments.submittedBy")),
	refersto: yup.number().typeError(i18nTypeError.number("Comments.refersto")).integer(i18nNoDecimal("Comments.refersto")).required(i18nReq("Comments.refersto")),
	datePosted: yup.date().typeError(i18nTypeError.date("Comments.datePosted")).notRequired(),
	content: yup.string().typeError(i18nTypeError.string("Comments.content")).required(i18nReq("Comments.content")),
	// NOTE not sure if these last four fields
	// will ever be used...
	upvotes: yup.number().typeError(i18nTypeError.number("Comments.upvotes")).integer(i18nNoDecimal("Comments.upvotes")).notRequired(),
	downvotes: yup.number().typeError(i18nTypeError.number("Comments.downvotes")).integer(i18nNoDecimal("Comments.downvotes")).notRequired(),
	username: yup.string().typeError(i18nTypeError.string("Comments.username")).notRequired(),
	screenname: yup.string().typeError(i18nTypeError.string("Comments.screenname")).notRequired(),
});

export const CompanySchema = yup.object().shape({
	_id: yup.number().typeError(i18nTypeError.number("Companies._id")).integer(i18nNoDecimal("Companies._id")).notRequired(),
	name: yup.string().typeError(i18nTypeError.string("Companies.name")).max(100,i18nMaxString("Companies.name",100)).required(i18nReq("Companies.name")).test('companyNameTest', 'test not yet implemented!', () => false),
	contactEmail: yup.string().typeError(i18nTypeError.string("Companies.contactEmail")).max(100,i18nMaxString("Companies.contactEmail",100)).required(i18nReq("Companies.contactEmail")).matches(emailWithTldRegex, i18nRegEx.EmailWithTLD("Companies.contactEmail")),
	contactPhoneNumber: yup.string().typeError(i18nTypeError.string("Companies.contactPhoneNumber")).max(20,i18nMaxString("Companies.contactPhoneNumber",20)).notRequired().matches(phoneNumberRegex, i18nRegEx.Phone("Companies.contactPhoneNumber")),
	yearEstablished: yup.number().typeError(i18nTypeError.number("Companies.yearEstablished")).integer(i18nNoDecimal("Companies.yearEstablished")).notRequired().oneOf(
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
		.reverse(),
		i18nNotAllowed("Companies.yearEstablished")
	),
	numEmployees: yup.string().typeError(i18nTypeError.string("Companies.numEmployees")).notRequired().oneOf([
		"1 - 50",
		"51 - 500",
		"501 - 2000",
		"2001 - 5000",
		"5000+",
		i18nNotAllowed("Companies.numEmployees")
	]),
	industry: yup.string().typeError(i18nTypeError.string("Companies.industry")).max(50,i18nMaxString("Companies.industry",50)).notRequired(),
	locations: yup.array().typeError(i18nTypeError.array("Companies.locations")).of(LocationSchema).required(i18nReq("Companies.locations")),
	websiteURL: yup.string().typeError(i18nTypeError.string("Companies.websiteURL")).max(250,i18nMaxString("Companies.websiteURL",250)).notRequired().matches(urlRegex, i18nRegEx.Url("Companies.websiteURL")),
	descriptionOfCompany: yup.string().typeError(i18nTypeError.string("Companies.descriptionOfCompany")).max(6000,i18nMaxString("Companies.descriptionOfCompany",6000)).notRequired(),
	// NOTE Legacy comment
	// All fields after this point are only
	// ever used "internally" by the app,
	// for calculations or for other things
	// that are not editable by users.
	// NOTE dateJoined refers to the date the company created
	// their Vize profile, i.e. when they "joined" the site
	dateJoined: yup.date().typeError(i18nTypeError.date("Companies.dateJoined")).notRequired(),
	// NOTE Legacy comment, not even sure if it still applies
	// numFlags is the number of times this company has been
	// "flagged" for some reason, Vize IT is free to decrease
	// as issues are dealt with
	numFlags: yup.number().typeError(i18nTypeError.number("Companies.numFlags")).integer(i18nNoDecimal("Companies.numFlags")).min(0,i18nMinNumber("Companies.numFlags",0)).notRequired(),
	// QUESTION Do you think we might one day refactor
	// the ratings system into its own thing, so we don't
	// have to repeat the code for both companies and reviews?
	healthAndSafety: yup.number().typeError(i18nTypeError.number("Companies.healthAndSafety")).min(0,i18nMinNumber("Companies.healthAndSafety",0)).max(5,i18nMaxNumber("Companies.healthAndSafety",5)).notRequired(),
	managerRelationship: yup.number().typeError(i18nTypeError.number("Companies.managerRelationship")).min(0,i18nMinNumber("Companies.managerRelationship",0)).max(5,i18nMaxNumber("Companies.managerRelationship",5)).notRequired(),
	workEnvironment: yup.number().typeError(i18nTypeError.number("Companies.workEnvironment")).min(0,i18nMinNumber("Companies.workEnvironment",0)).max(5,i18nMaxNumber("Companies.workEnvironment",5)).notRequired(),
	benefits: yup.number().typeError(i18nTypeError.number("Companies.benefits")).min(0,i18nMinNumber("Companies.benefits",0)).max(5,i18nMaxNumber("Companies.benefits",5)).notRequired(),
	overallSatisfaction: yup.number().typeError(i18nTypeError.number("Companies.overallSatisfaction")).min(0,i18nMinNumber("Companies.overallSatisfaction",0)).max(5,i18nMaxNumber("Companies.overallSatisfaction",5)).notRequired(),
	numReviews: yup.number().typeError(i18nTypeError.number("Companies.numReviews")).integer(i18nNoDecimal("Companies.numReviews")).min(0,i18nMinNumber("Companies.numReviews",0)).notRequired(),
	percentRecommended: yup.number().typeError(i18nTypeError.number("Companies.percentRecommended")).min(0,i18nMinNumber("Companies.percentRecommended",0)).max(1,i18nMaxNumber("Companies.percentRecommended",1)).notRequired(),
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
	avgNumMonthsWorked: yup.number().typeError(i18nTypeError.number("Companies.avgNumMonthsWorked")).min(0,i18nMinNumber("Companies.avgNumMonthsWorked",0)).notRequired(),
});

export const JobAdSchema = yup.object().shape({
	_id: yup.number().typeError(i18nTypeError.number("JobAds._id")).integer(i18nNoDecimal("JobAds._id")).notRequired(),
	companyName: yup.string().typeError(i18nTypeError.string("JobAds.companyName")).max(100,i18nMaxString("JobAds.companyName",100)).required(i18nReq("JobAds.companyName")).test('jobAdCompanyNameTest', 'test not yet implemented!', () => false),
	// NOTE This used to be optional, now it is required,
	// because it is in fact required for companies to have
	// both a name and an ID, but the ID is easier to set automatically.
	// WARNING It *must* be checked for validity against
	// the company name, or otherwise the backend must
	// somehow be able to handle that error case.
	companyId: yup.number().typeError(i18nTypeError.number("JobAds.companyId")).integer(i18nNoDecimal("JobAds.companyId")).required(i18nReq("JobAds.companyId")),
	jobTitle: yup.string().typeError(i18nTypeError.string("JobAds.jobTitle")).max(100,i18nMaxString("JobAds.jobTitle",100)).required(i18nReq("JobAds.jobTitle")),
	locations: yup.array().typeError(i18nTypeError.array("JobAds.locations")).of(LocationSchema).required(i18nReq("JobAds.locations")),
	pesosPerHour: yup.string().typeError(i18nTypeError.string("JobAds.pesosPerHour")).max(30,i18nMaxString("JobAds.pesosPerHour",30)).required(i18nReq("JobAds.pesosPerHour")).matches(pesosPerHourRegex, i18nRegEx.msg("JobAds.pesosPerHour")), // NOTE that error message may not be found very helpful by users...
	contractType: yup.string().typeError(i18nTypeError.string("JobAds.contractType")).required(i18nReq("JobAds.contractType")).oneOf(["Full time", "Part time", "Contractor"], i18nNotAllowed("JobAds.contractType")),
	jobDescription: yup.string().typeError(i18nTypeError.string("JobAds.jobDescription")).max(6000,i18nMaxString("JobAds.jobDescription",6000)).required(i18nReq("JobAds.jobDescription")),
	responsibilities: yup.string().typeError(i18nTypeError.string("JobAds.responsibilities")).max(6000,i18nMaxString("JobAds.responsibilities",6000)).required(i18nReq("JobAds.responsibilities")),
	qualifications: yup.string().typeError(i18nTypeError.string("JobAds.qualifications")).max(6000,i18nMaxString("JobAds.qualifications",6000)).required(i18nReq("JobAds.qualifications")),
	datePosted: yup.date().typeError(i18nTypeError.date("JobAds.datePosted")).notRequired(),
});

export const JobApplicationSchema = yup.object().shape({
	jobId: yup.number().typeError(i18nTypeError.number("JobApplications.jobId")).integer(i18nNoDecimal("JobApplications.jobId")).required(i18nReq("JobApplications.jobId")).test('jobApplicationCompanyIdTest', 'test not yet implemented!', () => false),
	companyName: yup.string().typeError(i18nTypeError.string("JobApplications.companyName")).max(100,i18nMaxString("JobApplications.companyName",100)).required(i18nReq("JobApplications.companyName")).test('jobApplicationCompanyNameTest', 'test not yet implemented!', () => false),
	fullName: yup.string().typeError(i18nTypeError.string("JobApplications.fullName")).max(150,i18nMaxString("JobApplications.fullName",150)).required(i18nReq("JobApplications.fullName")),
	email: yup.string().typeError(i18nTypeError.string("JobApplications.email")).max(100,i18nMaxString("JobApplications.email",100)).required(i18nReq("JobApplications.email")).matches(emailWithTldRegex, i18nRegEx.EmailWithTLD("JopApplications.email")),
	phoneNumber: yup.string().typeError(i18nTypeError.string("JobApplications.phoneNumber")).max(20,i18nMaxString("JobApplications.phoneNumber",20)).required(i18nReq("JobApplications.phoneNumber")).matches(phoneNumberRegex, i18nRegEx.Phone("JobApplications.phoneNumber")),
	coverLetterAndComments: yup.string().typeError(i18nTypeError.string("JobApplications.coverLetterAndComments")).max(6000,i18nMaxString("JobApplications.coverLetterAndComments",6000)).notRequired(),
	dateSent: yup.date().typeError(i18nTypeError.date("JobApplications.dateSent")).notRequired(),
});

export const SalarySchema = yup.object().shape({
	_id: yup.number().typeError(i18nTypeError.number("Salaries._id")).integer(i18nNoDecimal("Salaries._id")).notRequired(),
	// QUESTION: should submittedBy be notRequired, or do we trust
	// that it's always automatically set? Users currently
	// must have accounts in order to submit salaries...
	submittedBy: yup.number().typeError(i18nTypeError.number("Salaries.submittedBy")).integer(i18nNoDecimal("Salaries.submittedBy")).required(i18nReq("Salaries.submittedBy")),
	companyName: yup.string().typeError(i18nTypeError.string("Salaries.companyName")).max(100,i18nMaxString("Salaries.companyName",100)).required(i18nReq("Salaries.companyName")).test('salaryCompanyNameTest', 'test not yet implemented!', () => false),
	companyId: yup.number().typeError(i18nTypeError.number("Salaries.companyId")).integer(i18nNoDecimal("Salaries.companyId")).notRequired(),
	location: LocationSchema.required(i18nReq("Salaries.location")),
	jobTitle: yup.string().typeError(i18nTypeError.string("Salaries.jobTitle")).max(100,i18nMaxString("Salaries.jobTitle",100)).required(i18nReq("Salaries.jobTitle")),
	incomeType: yup.string().typeError(i18nTypeError.string("Salaries.incomeType")).required(i18nReq("Salaries.incomeType")).oneOf(["Yearly Salary", "Monthly Salary", "Hourly Wage"], i18nNotAllowed("Salaries.incomeType")),
	incomeAmount: yup.number().typeError(i18nTypeError.number("Salaries.incomeAmount")).min(0,i18nMinNumber("Salaries.incomeAmount",0)).required(i18nReq("Salaries.incomeAmount")),
	gender: yup.string().typeError(i18nTypeError.string("Salaries.gender")).notRequired().oneOf(["Male", "Female"], i18nNotAllowed("Salaries.gender")),
	datePosted: yup.date().typeError(i18nTypeError.date("Salaries.datePosted")).notRequired(),
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
	_id: yup.number().typeError(i18nTypeError.number("Reviews._id")).integer(i18nNoDecimal("Reviews._id")).notRequired(),
	// QUESTION: should submittedBy be notRequired, or do we trust
	// that it's always automatically set? Users currently
	// must have accounts in order to submit reviews...
	submittedBy: yup.number().typeError(i18nTypeError.number("Reviews.submittedBy")).integer(i18nNoDecimal("Reviews.submittedBy")).required(i18nReq("Reviews.submittedBy")),
	companyName: yup.string().typeError(i18nTypeError.string("Reviews.companyName")).max(100,i18nMaxString("Reviews.companyName",100)).required(i18nReq("Reviews.companyName")).test('reviewCompanyNameTest', 'test not yet implemented!', () => false),
	companyId: yup.number().typeError(i18nTypeError.number("Reviews.companyId")).integer(i18nNoDecimal("Reviews.companyId")).notRequired(),
	// SimpleSchema.messages.defaults.required
	// label: SimpleSchema.labels.Reviews.reviewTitle
	reviewTitle: yup.string().typeError(i18nTypeError.string("Reviews.reviewTitle")).max(100,i18nMaxString("Reviews.reviewTitle",100)).required(i18nReq("Reviews.reviewTitle")),
	location: LocationSchema.required(i18nReq("Reviews.location")), // if only it had always been this easy...
	jobTitle: yup.string().typeError(i18nTypeError.string("Reviews.jobTitle")).max(100,i18nMaxString("Reviews.jobTitle",100)).required(i18nReq("Reviews.jobTitle")),
	numberOfMonthsWorked: yup.number().typeError(i18nTypeError.number("Reviews.numberOfMonthsWorked")).integer(i18nNoDecimal("Reviews.numberOfMonthsWorked")).min(0,i18nMinNumber("Reviews.numberOfMonthsWorked",0)).required(i18nReq("Reviews.numberOfMonthsWorked")),
	pros: yup.string().typeError(i18nTypeError.string("Reviews.pros")).max(600,i18nMaxString("Reviews.pros",600)).required(i18nReq("Reviews.pros")).test('prosHasFiveWords', '${path} must have at least five words', (value) => wordCount(value) >= 5),
	cons: yup.string().typeError(i18nTypeError.string("Reviews.cons")).max(600,i18nMaxString("Reviews.cons",600)).required(i18nReq("Reviews.cons")).test('consHasFiveWords', '${path} must have at least five words', (value) => wordCount(value) >= 5),
	wouldRecommendToOtherJobSeekers: yup.boolean().typeError(i18nTypeError.boolean("Reviews.wouldRecommendToOtherJobSeekers")).required(i18nReq("Reviews.wouldRecommendToOtherJobSeekers")),
	healthAndSafety: yup.number().typeError(i18nTypeError.number("Reviews.healthAndSafety")).min(0,i18nMinNumber("Reviews.healthAndSafety",0)).max(5,i18nMaxNumber("Reviews.healthAndSafety",5)).required(i18nReq("Reviews.healthAndSafety")),
	managerRelationship: yup.number().typeError(i18nTypeError.number("Reviews.managerRelationship")).min(0,i18nMinNumber("Reviews.managerRelationship",0)).max(5,i18nMaxNumber("Reviews.managerRelationship",5)).required(i18nReq("Reviews.managerRelationship")),
	workEnvironment: yup.number().typeError(i18nTypeError.number("Reviews.workEnvironment")).min(0,i18nMinNumber("Reviews.workEnvironment",0)).max(5,i18nMaxNumber("Reviews.workEnvironment",5)).required(i18nReq("Reviews.workEnvironment")),
	benefits: yup.number().typeError(i18nTypeError.number("Reviews.benefits")).min(0,i18nMinNumber("Reviews.benefits",0)).max(5,i18nMaxNumber("Reviews.benefits",5)).required(i18nReq("Reviews.benefits")),
	overallSatisfaction: yup.number().typeError(i18nTypeError.number("Reviews.overallSatisfaction")).min(0,i18nMinNumber("Reviews.overallSatisfaction",0)).max(5,i18nMaxNumber("Reviews.overallSatisfaction",5)).required(i18nReq("Reviews.overallSatisfaction")),
	additionalComments: yup.string().typeError(i18nTypeError.string("Reviews.additionalComments")).max(6000,i18nMaxString("Reviews.additionalComments",6000)).notRequired(),
	datePosted: yup.date().typeError(i18nTypeError.date("Reviews.datePosted")).notRequired(),
	upvotes: yup.number().typeError(i18nTypeError.number("Reviews.upvotes")).integer(i18nNoDecimal("Reviews.upvotes")).min(0,i18nMinNumber("Reviews.upvotes",0)).notRequired(),
	downvotes: yup.number().typeError(i18nTypeError.number("Reviews.downvotes")).integer(i18nNoDecimal("Reviews.downvotes")).min(0,i18nMinNumber("Reviews.downvotes",0)).notRequired(),
	Comments: yup.array().typeError(i18nTypeError.array("Reviews.Comments")).of(CommentSchema).notRequired(),
});

export const VoteSchema = yup.object().shape({
	submittedBy: yup.number().typeError(i18nTypeError.number("Votes.submittedBy")).integer(i18nNoDecimal("Votes.submittedBy")).required(i18nReq("Votes.submittedBy")),
	voteSubject: yup.string().typeError(i18nTypeError.string("Votes.voteSubject")).required(i18nReq("Votes.voteSubject")).oneOf(["review", "comment"], i18nNotAllowed("Votes.voteSubject")),
	references: yup.number().typeError(i18nTypeError.number("Votes.references")).integer(i18nNoDecimal("Votes.references")).required(i18nReq("Votes.references")),
	value: yup.boolean().typeError(i18nTypeError.boolean("Votes.value")).required(i18nReq("Votes.value")),
});
