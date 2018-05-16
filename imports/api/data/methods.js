import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import { Salaries } from "./salaries.js";
import { JobAds } from "./jobads.js";
import { Email } from "meteor/email";
import SimpleSchema from "simpl-schema";
import { addToAvg, subFromAvg, changeInAvg } from "./denormalization.js";

Meteor.methods({

	sendEmail: function(to, from, subject, text) {
		console.log("--- sendEmail: checking arguments");
		check([to, from, subject, text], [String]);
		let realEmail = { to, from, subject, text };
		console.log("--- sendEmail: before send, here is the email:");
		console.log(realEmail);
		this.unblock();
		Email.send(realEmail);
		console.log("--- sendEmail: after send");
		return "return value of sendEmail: we made it";
	},

	"hasFiveWords": function (inputString) {
		// Funny story, String.prototype.wordCount is actually
		// defined in reviews.js because I couldn't find a
		// better place for it. Just in case you're wondering.
		if(inputString.wordCount() < 5) {
			throw new Meteor.Error("needsFiveWords", "You should write at least 5 words in this field");
		}
		return "all good";
	},

	// This feels so idiotic, but it seems to be the only way
	// to enable reactive validation
	"firstDateIsBeforeSecond": function (dates) {
		if(!(dates.first < dates.second)) {
			throw new Meteor.Error("outOfOrder", "First date should be before second");
		}
		return "all good";
	},

	"reviews.submitReview": function(newReview) {

		// Make sure the user is logged and is permitted to write a review.
		if (!this.userId) {
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error("rolePermission", "Only workers may write reviews.");
		}

		// TODO: use user to fill in the "who wrote this" info in this review.

		//This avoids a lot of problems
		newReview = Reviews.simpleSchema().clean(newReview);

		// console.log("SERVER: validating...");
		let validationResult = Reviews.simpleSchema().namedContext().validate(newReview);
		console.log("SERVER: Here is the validation result: ");
		console.log(validationResult);
		console.log(Reviews.simpleSchema().namedContext().validationErrors());

		// console.log("SERVER: inserting");
		Reviews.insert(newReview);

		/*
			QUESTION:
				If the actions taken are different depending on whether
				the company is verified or unverified, how do I handle
				that?
		*/

		// Can assume this to be defined since it is checked for
		// in the schema validation for companyName
		const company = Companies.findOne({name: newReview.companyName});

		// Update denormalizations.
		if(company !== undefined) {
			console.log("SERVER: before update");
			console.log(Companies.findOne({name: newReview.companyName}));

			/*
				QUESTION:
					Do we need some kind of hook to periodically re-check the
					averages in case something happens where a review gets
					inserted before the averages are updated?
			*/

			Companies.update(
				{ name: newReview.companyName },
				{
					$set: {
						healthAndSafety: addToAvg(newReview.healthAndSafety, company.numReviews, company.healthAndSafety),
						managerRelationship: addToAvg(newReview.managerRelationship, company.numReviews, company.managerRelationship),
						workEnvironment: addToAvg(newReview.workEnvironment, company.numReviews, company.workEnvironment),
						benefits: addToAvg(newReview.benefits, company.numReviews, company.benefits),
						overallSatisfaction: addToAvg(newReview.overallSatisfaction, company.numReviews, company.overallSatisfaction),
						percentRecommended: addToAvg((newReview.wouldRecommendToOtherJobSeekers) ? 1 : 0, company.numReviews, company.percentRecommended),
						avgNumMonthsWorked: addToAvg(newReview.numberOfMonthsWorked, company.numReviews, company.avgNumMonthsWorked),
					},
					$inc: { numReviews: 1 } //this will increment the numReviews by 1
				}
			);
			console.log("SERVER: after update");
			console.log(Companies.findOne({name: newReview.companyName}));
		}

	},

	"salaries.submitSalaryData": function (newSalary) {
		// Make sure the user is logged and is permitted to submit their salary.
		if (!this.userId) {
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error("rolePermission", "Only workers may submit their salaries.");
		}

		// TODO: use upsert to prevent duplicate salaries.
		const {companyId, jobTitle} = newSalary;
		if (Salaries.find({companyId, jobTitle}).count() !== 0) {
			throw new Meteor.Error("duplicateSalary", "You may only submit one salary per company per location per job title.");
		}

		//This avoids a lot of problems
		newSalary = Salaries.simpleSchema().clean(newSalary);

		// console.log("SERVER: validating...");
		let validationResult = Salaries.simpleSchema().namedContext().validate(newSalary);
		console.log("SERVER: Here is the validation result: ");
		console.log(validationResult);
		console.log(Salaries.simpleSchema().namedContext().validationErrors());

		console.log("SERVER: inserting");

		// TODO: use upsert to prevent duplicate salaries.
		// Salaries.upsert({userId, companyId, jobTitle, location}, newSalary);
		Salaries.insert(newSalary);

	},

	"jobads.findOne": function (jobIdentifier) {
		let job = JobAds.findOne(jobIdentifier);
		if(job === undefined) {
			throw new Meteor.Error("notFound", "Your search for job ads did not return any results");
		}

		return job;
	},

	"jobads.doesJobAdExist": function(jobIdentifier) {
		let job = JobAds.findOne(jobIdentifier);
		if(job === undefined) {
			throw new Meteor.Error("notFound", "There is no job ad with that id in our database");
		}

		return "all good";
	},

	"jobads.applyForJob": function (jobApplication) {

		jobApplication = JobAds.applicationSchema.clean(jobApplication);
		let validationResult = JobAds.applicationSchema.namedContext().validate(jobApplication);
		console.log("SERVER: Here is the validation result: ");
		console.log(validationResult);
		let errors = JobAds.applicationSchema.namedContext().validationErrors();
		if(!validationResult) {
			throw new Meteor.Error("ClientError", "Invalid form inputs", errors);
		}

		let company = Companies.findOne({name: jobApplication.companyName});
		let companyEmailAddress = company.contactEmail;
		let companyName = jobApplication.companyName;
		let workerName = jobApplication.fullName;
		let workerEmail = jobApplication.email;
		let workerPhone = jobApplication.phoneNumber;
		let workerComments =
		(jobApplication.coverLetterAndComments !== undefined) ?
		jobApplication.coverLetterAndComments :
		"[the applicant did not fill in this field]";
		let jobId = jobApplication.jobId;
		let emailSubject = "VIZE " + workerName + " has responded to your job advertisement";

		/*
			This email needs revision, this is only a
			testing version. For example, including the
			worker's contact info in the body of the email?
			Not so sure about that. And of course the wording
			will be revised. Perhaps additional security measures
			should be added as well, such as smtps. But
			this should work well enough for now.

			QUESTION:
			- What if the company didn't provide a valid email?
			- What if the worker didn't?
			- ...or a valid phone number?
		*/

		let emailText = "Greetings, " + companyName +
		"\n\n\tA Vize user, " + workerName + ", has responded " +
		"to your job advertisement [id=" + jobId + "]." +
		"\n\n\tThey provided the following information: " +
		"\n\n\tEmail: " + workerEmail +
		"\n\n\tPhone number: " + workerPhone +
		"\n\n\tCover Letter/Comments: " + workerComments +
		"\n\n\tPlease follow up with them according to your company's policy." +
		"\n\nSincerely," +
		"\n\n\tVize";

		let applicationEmail = {
			to: companyEmailAddress,
			from: "postmaster@incentivizinggood.com",
			cc: workerEmail,
			subject: emailSubject,
			text: emailText,
		};

		console.log("SERVER: sending email: ");
		console.log(applicationEmail);

		this.unblock();
		Email.send(applicationEmail);

		console.log("SERVER: sent email");

	},

	"jobads.postJobAd": function (newJobAd) {
		//This avoids a lot of problems
		newJobAd = JobAds.simpleSchema().clean(newJobAd);

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		const user = Meteor.users.findOne(this.userId);
		if (user.role !== "company") {
			throw new Meteor.Error("rolePermission", "Only companies may post job ads.");
		}

		if (!(user.companyId && user.companyId === newJobAd.companyId)) {
			throw new Meteor.Error("rolePermission", "You may only post a job ad for a company that you are allowed to administer.");
		}

		console.log("SERVER: validating...");
		let validationResult = JobAds.simpleSchema().namedContext().validate(newJobAd);
		console.log("SERVER: Here is the validation result: ");
		console.log(validationResult);
		let errors = JobAds.simpleSchema().namedContext().validationErrors();
		console.log(errors);
		if(!validationResult) {
			throw new Meteor.Error("ClientError", "Invalid form inputs", errors);
		}

		console.log("SERVER: inserting");
		JobAds.insert(newJobAd);
	},

	"companies.findOne": function (companyIdentifier) {

		let company = Companies.findOne(companyIdentifier);
		if(company === undefined) {
			throw new Meteor.Error("notFound", "Your search for companies did not return any results");
		}

		return company;
	},

	"companies.isNotSessionError": function (companyNameString) {
		if(companyNameString === "ERROR: COMPANY NOT FOUND" ||
			companyNameString === "Please wait while we finish loading the form...") {
			throw new Meteor.Error("sessionError", "Please stop messing around");
		}

		return "all good";
	},

	"companies.isCompanyNameAvailable": function (companyName) {
		if(Companies.hasEntry(companyName)) {
			throw new Meteor.Error("nameTaken", "The name you provided is already taken");
		}
		return "all good";
	},

	// Technically this does something different, and the return value vs
	// thrown error and callback structure makes it easy to do this way,
	// but is there some way to combine this method with the previous one?
	// They're almost identical.
	"companies.doesCompanyExist": function (companyName) {
		if(!Companies.hasEntry(companyName)) {
			throw new Meteor.Error("noCompanyWithThatName", "There is no company with that name in our database");
		}
		return "all good";
	},

	//Add method for creating a new CompanyProfile
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts. We're not ready for that quite yet.
	"companies.createProfile": function (newCompanyProfile) {

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		//This avoids a lot of problems
		newCompanyProfile = Companies.simpleSchema().clean(newCompanyProfile);

		//Throws an exception if argument is invalid.
		// console.log("SERVER: validating...");
		let validationResult = Companies.simpleSchema().namedContext().validate(newCompanyProfile);
		console.log("SERVER: Here is the validation result: ");
		console.log(validationResult);
		console.log(Companies.simpleSchema().namedContext().validationErrors());

		/* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */
		console.log("SERVER: inserting");
		Companies.insert(newCompanyProfile);
	},

	//Edits an existing company profile -- UNTESTED
	//Leaving this commented out until I have the opportunity to test it
	// "companies.editProfile": function (companyProfileEdits) {
	//
	// 	// Copy-paste until we implement real security
	// 	if (!this.userId) {
	// 		throw new Meteor.Error("not-authorized");
	// 	}
	//
	// 	// Mongo-style modifiers seem to just be JSON objects
	// 	// where the field names are modifiers and the values
	// 	// are JSON objects with keys identifying the doc field
	// 	// to be modified and values identifying "how" to perform
	// 	// the modifier (as in {$inc: {name: 2}} would increment
	// 	// name by 2 if that was valid). Which means we can just
	// 	// pass companyProfileEdits to $set. Woohoo.
	// 	let modifier = {$set: companyProfileEdits};
	//
	// 	// Apparently SimpleSchema lets you validate
	// 	// Mongo-style modifiers. Dunno about you guys,
	// 	// but I think that's extremely cool.
	// 	Companies.schema.validate(modifier);
	//
	// 	// Will probably just silently do nothing if there's
	// 	// no profile with _id.
	// 	Companies.update(companyProfileEdits._id, modifier);
	// },

});
