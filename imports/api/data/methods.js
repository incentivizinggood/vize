import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import i18n from "meteor/universe:i18n";
import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import { Salaries } from "./salaries.js";
import { JobAds } from "./jobads.js";
import { Votes } from "./votes.js";

// Testing with PostgreSQL
import PostgreSQL from "../graphql/connectors/postgresql.js";
import PgCompanyFunctions from "../models/helpers/postgresql/companies.js";
import PgReviewFunctions from "../models/helpers/postgresql/reviews.js";
import PgJobAdFunctions from "../models/helpers/postgresql/jobads.js";
import PgSalaryFunctions from "../models/helpers/postgresql/salaries.js";
import PgVoteFunctions from "../models/helpers/postgresql/votes.js";
import PgCommentFunctions from "../models/helpers/postgresql/comments.js";
import PgUserFunctions from "../models/helpers/postgresql/users.js";

/*
	TODO
	Every place a method is called
	that queries the database, the arguments
	need to be checked (in the code, where they
	are actually called) for validity and format.
	Oh my friggin' goodness, this code...
*/

Meteor.methods({
	async "postgres.users.createUser"(user, companyPostgresId) {
		// just trying to get this to work, will
		// add security and validation later
		return PostgreSQL.executeMutation(PgUserFunctions.createUser, user);
	},

	sendEmail(to, from, subject, text) {
		if (Meteor.isDevelopment)
			console.log("SERVER sendEmail: checking arguments");
		check([to, from, subject, text], [String]);
		const realEmail = { to, from, subject, text };
		if (Meteor.isDevelopment) {
			console.log("SERVER sendEmail: before send, here is the email:");
			console.log(realEmail);
		}
		this.unblock();
		Email.send(realEmail);
		if (Meteor.isDevelopment) console.log("SERVER sendEmail: after send");
		return "we made it";
	},

	hasFiveWords(inputString) {
		// Funny story, String.prototype.wordCount is actually
		// defined in reviews.js because I couldn't find a
		// better place for it. Just in case you're wondering.
		if (
			inputString === undefined ||
			typeof inputString !== "string" ||
			inputString.wordCount() < 5
		) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.needsFiveWords"),
				i18n.__("common.methods.errorMessages.needsFiveWords")
			);
		}
		return "all good";
	},

	async "reviews.submitReview"(newReview) {
		// This avoids a lot of problems
		const cleanReview = Reviews.simpleSchema().clean(newReview);

		const validationResult = Reviews.simpleSchema()
			.namedContext()
			.validate(cleanReview);
		const errors = Reviews.simpleSchema()
			.namedContext()
			.validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.invalidFormInputs"),
				errors
			);
		}

		// Make sure the user is logged and is permitted to write a review.
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyWorkers")
			);
		}

		const pgUser = await PostgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			this.userId
		);

		cleanReview.submittedBy = pgUser.user.userid;
		if (typeof cleanReview.companyId === "string")
			cleanReview.companyId = undefined;
		await PostgreSQL.executeMutation(
			PgReviewFunctions.submitReview,
			cleanReview
		);

		/*
			QUESTION:
				If the actions taken are different depending on whether
				the company is verified or unverified, how do I handle
				that?
		*/
	},

	/*
		TODO
		I won't be able to test reviews.changeVote in
		its proper context until the review ID
		format is changed. Submitting reviews works fine,
		but this method takes input from the frontend,
		which doesn't know about the changes yet.
		Also the schemas and validation will have to
		be updated as well.
		Dang.
	*/
	async "reviews.changeVote"(review, vote) {
		console.log(
			`SERVER: User ${this.userId} voted ${vote} on review ${review._id}`
		);

		// validate vote: must be boolean
		if (typeof vote !== "boolean") {
			if (Meteor.isDevelopment)
				console.log("SERVER: vote is not boolean");
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.vote2ndArg")
			);
		}

		// validate review: must match Reviews.schema
		const validationResult = Reviews.simpleSchema()
			.namedContext()
			.validate(review);
		const errors = Reviews.simpleSchema()
			.namedContext()
			.validationErrors();

		if (!validationResult) {
			if (Meteor.isDevelopment) console.log("SERVER: review is invalid");
			if (Meteor.isDevelopment) console.log(errors);
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.vote1stArg"),
				errors
			);
		}

		if (Reviews.findOne(review) === undefined) {
			if (Meteor.isDevelopment)
				console.log("SERVER: review does not exist");
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.voteOnNullReview")
			);
		}

		// must be logged in
		if (!this.userId) {
			if (Meteor.isDevelopment)
				console.log("SERVER: user is not logged in");
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);

		// only workers
		if (user.role === "company") {
			if (Meteor.isDevelopment) console.log("SERVER: user is a company");
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyWorkers")
			);
		}

		// can't vote on own review
		if (this.userId === review.submittedBy) {
			if (Meteor.isDevelopment)
				console.log("SERVER: user is voting on own review");
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.noCheating"),
				i18n.__("common.methods.errorMessages.noCheating")
			);
		}

		// This next bit was a pain to write

		const previousVote = Votes.findOne({
			submittedBy: this.userId,
			references: review._id,
			voteSubject: "review",
		});

		// This is completely ridiculous, I wanted to use
		// upsert but it just got too complicated
		let result;
		if (previousVote === undefined) {
			result = Votes.insert({
				submittedBy: this.userId,
				references: review._id,
				voteSubject: "review",
				value: vote,
			});
		} else {
			result = Votes.update(
				{
					submittedBy: this.userId,
					references: review._id,
					voteSubject: "review",
				},
				{ $set: { value: vote } }
			);
		}

		// again with the doing things the first way that comes to mind
		const proceed =
			((previousVote === undefined && result !== undefined) ||
				(previousVote !== undefined && result !== 0)) &&
			(previousVote === undefined || vote !== previousVote.value);
		if (proceed) {
			if (vote === true) {
				const decNum =
					previousVote === undefined || review.downvotes === 0
						? 0
						: -1;
				Reviews.update(
					review._id,
					{ $inc: { upvotes: 1, downvotes: decNum } },
					{ getAutoValues: false }
				);
			} else {
				const decNum =
					previousVote === undefined || review.upvotes === 0 ? 0 : -1;
				Reviews.update(
					review._id,
					{ $inc: { downvotes: 1, upvotes: decNum } },
					{ getAutoValues: false }
				);
			}
		}

		return "I VOTED";
	},

	async "salaries.submitSalaryData"(salary) {
		// This avoids a lot of problems
		const newSalary = Salaries.simpleSchema().clean(salary);

		const validationResult = Salaries.simpleSchema()
			.namedContext()
			.validate(newSalary);
		const errors = Salaries.simpleSchema()
			.namedContext()
			.validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.invalidFormInputs"),
				errors
			);
		}

		// Make sure the user is logged and is permitted to submit their salary.
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyWorkers")
			);
		}

		// TODO: filter by location as well
		// const { companyName, jobTitle } = newSalary; // changed to use companyName: names uniquely identify companies as well, but salaries might have the same companyId (the one for un-verified companies) if submitted from the home page
		// if (Salaries.find({ companyName, jobTitle }).count() !== 0) {
		// 	throw new Meteor.Error(
		// 		i18n.__("common.methods.meteorErrors.duplicateEntry"),
		// 		i18n.__("common.methods.errorMessages.onlyOnce")
		// 	);
		// }

		if (Meteor.isDevelopment) console.log("SERVER: inserting");

		// TODO: use upsert to prevent duplicate salaries.
		// QUESTION: do we actually want to prevent duplicate salaries?
		//			I was under the impression that we didn't.
		// Salaries.upsert({userId, companyId, jobTitle, location}, newSalary);
		const pgUser = await PostgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			this.userId
		);
		newSalary.submittedBy = pgUser.user.userid;
		if (typeof newSalary.companyId === "string")
			newSalary.companyId = undefined;
		await PostgreSQL.executeMutation(
			PgSalaryFunctions.submitSalary,
			newSalary
		);
	},

	/*
		TODO
		This is another function that can't be
		tested until the fronted is updated,
		since it is accessed from the company
		profile page.
	*/
	async "jobads.findOne"(jobIdentifier) {
		const job = await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdById,
			jobIdentifier
		);
		if (job.jobAd === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}

		/*
			TODO
			Format job.jobAd and job.locations into
			something that matches the SimplSchema.
			This may have to wait until the schemas
			are fixed.
		*/

		return job;
	},

	async "jobads.doesJobAdExist"(jobIdentifier) {
		const job = await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdById,
			jobIdentifier
		);
		if (job.jobAd === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}

		return "all good";
	},

	/*
		TODO
		This one doesn't write to any of the collections,
		but it does read from them pretty extensively,
		so you can probably go ahead and fix it up to
		start using mostly PostgreSQL.
	*/
	"jobads.applyForJob"(jobApplication) {
		jobApplication = JobAds.applicationSchema.clean(jobApplication);
		const validationResult = JobAds.applicationSchema
			.namedContext()
			.validate(jobApplication);
		const errors = JobAds.applicationSchema
			.namedContext()
			.validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.invalidFormInputs"),
				errors
			);
		}

		// Only logged-in workers can apply for jobs
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyWorkers")
			);
		}

		const company = Companies.findOne({ name: jobApplication.companyName });
		const companyEmailAddress = company.contactEmail;
		const companyName = jobApplication.companyName;
		const workerName = jobApplication.fullName;
		const workerEmail = jobApplication.email;
		const workerPhone = jobApplication.phoneNumber;
		const workerComments =
			jobApplication.coverLetterAndComments !== undefined
				? jobApplication.coverLetterAndComments
				: i18n.__("common.methods.jobAppEmail.fieldLeftEmpty");
		const jobId = jobApplication.jobId;
		const emailSubject = i18n.__("common.methods.jobAppEmail.subjectLine", {
			wName: workerName,
		});

		/*
			QUESTION:
			- What if the company didn't provide a valid email?
			- What if the worker didn't?
			- ...or a valid phone number?
		*/

		const emailParams = {
			cName: companyName,
			wName: workerName,
			jId: jobId,
			wEmail: workerEmail,
			wPhone: workerPhone,
			wComments: workerComments,
		};

		const emailText = i18n.__(
			"common.methods.jobAppEmail.emailText",
			emailParams
		);

		const applicationEmail = {
			to: companyEmailAddress,
			from: "postmaster@incentivizinggood.com",
			cc: workerEmail,
			subject: emailSubject,
			text: emailText,
		};

		if (Meteor.isDevelopment) {
			console.log("SERVER: sending email: ");
			console.log(applicationEmail);
		}

		this.unblock();
		Email.send(applicationEmail);
	},

	async "jobads.postJobAd"(newJobAd) {
		newJobAd = JobAds.simpleSchema().clean(newJobAd);
		const validationResult = JobAds.simpleSchema()
			.namedContext()
			.validate(newJobAd);
		const errors = JobAds.simpleSchema()
			.namedContext()
			.validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.invalidFormInputs"),
				errors
			);
		}

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);
		if (user.role !== "company") {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyCompanies")
			);
		}

		/*
			TODO
			This check will have to be properly re-implemented
			once you've fixed the other methods, and perhaps the
			form and schema as well.
			-> required the job ad company id to have the same type
				as the user's company id, SimplSchema.integer,
				which affects the way this form is initially populated,
				so the changes are going to be mostly in the schema
			-> also requires that certain company-related methods
				have been fixed as well
		*/
		// if (!(user.companyId && user.companyId === newJobAd.companyId)) {
		// 	throw new Meteor.Error(
		// 		i18n.__("common.methods.meteorErrors.rolePermission"),
		// 		i18n.__("common.methods.errorMessages.permissionDenied")
		// 	);
		// }

		// For now, since there's no submittedBy field,
		// we will just assume that newJobAd is properly initialized
		await PostgreSQL.executeMutation(PgJobAdFunctions.postJobAd, newJobAd);
	},

	"companies.findOne"(companyIdentifier) {
		/*
			TODO
			Figure out how you actually want to handle
			these kinds of functions. Finding by ID
			and finding by name are two different queries
			in SQL and thus two different helper functions,
			so you'll either want to make a Mongo-style wrapper
			(which could be as simple as an if-statement)
			or split this method in two and refactor all the callers.
			Honestly, I'd rather go for the second option.
			Friggin'...this code...at least I wrote it, so
			there's no one else to blame for it...
		*/
		// const company = await PostgreSQL.executeQuery(PgCompanyFunctions.getCompany)
		const company = Companies.findOne(companyIdentifier);
		if (company.company === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}

		/*
			TODO
			Have to format this object properly
			Y'know, I probably should write a
			helper function for that, since taking
			the locations object and packing it
			into a locations array field is such
			a common task.
			Actually, if I did that then I could
			call it from the helper functions and
			drastically simplify the caller's life.
		*/
		return company;
	},

	"companies.companyForCurrentUser"() {
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId); // assume user is defined because this.userId is defined

		if (user.role !== "company" || user.companyId === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}

		const company = Companies.findOne(user.companyId);

		if (company === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}

		return company;
	},

	"companies.isNotSessionError"(companyNameString) {
		if (
			companyNameString === i18n.__("common.forms.companyNotFound") ||
			companyNameString === i18n.__("common.forms.pleaseWait")
		) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.sessionError"),
				i18n.__("common.methods.errorMessages.sessionError")
			);
		}

		return "all good";
	},

	"companies.isCompanyNameAvailable"(companyName) {
		if (Companies.hasEntry(companyName)) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.nameTaken"),
				i18n.__("common.methods.errorMessages.nameTaken")
			);
		}
		return "all good";
	},

	// Technically this does something different, and the return value vs
	// thrown error and callback structure makes it easy to do this way,
	// but is there some way to combine this method with the previous one?
	// They're almost identical.
	"companies.doesCompanyExist"(companyName) {
		if (Companies.findOne({ name: companyName }) === undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.notFound"),
				i18n.__("common.methods.errorMessages.notFound")
			);
		}
		return "all good";
	},

	// Add method for creating a new CompanyProfile
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts. We're not ready for that quite yet.
	async "companies.createProfile"(companyProfile) {
		const newCompanyProfile = Companies.simpleSchema().clean(
			companyProfile
		);
		const validationResult = Companies.simpleSchema()
			.namedContext()
			.validate(newCompanyProfile);
		const errors = Companies.simpleSchema()
			.namedContext()
			.validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.invalidArguments"),
				i18n.__("common.methods.errorMessages.invalidFormInputs"),
				errors
			);
		}

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.loggedOut"),
				i18n.__("common.methods.errorMessages.loggedOut")
			);
		}

		const user = Meteor.users.findOne(this.userId);
		if (user.role !== "company") {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.rolePermission"),
				i18n.__("common.methods.errorMessages.onlyCompanies")
			);
		}

		if (user.companyId !== undefined) {
			throw new Meteor.Error(
				i18n.__("common.methods.meteorErrors.duplicateEntry"),
				i18n.__("common.methods.errorMessages.onlyOnce")
			);
		}

		// insert company to PostgreSQL
		// update user info in PostgreSQL
		const newPgCompany = await PostgreSQL.executeMutation(
			PgCompanyFunctions.createCompany,
			newCompanyProfile
		);
		if (Meteor.isDevelopment) {
			console.log("NEW PG COMPANY");
			console.log(newPgCompany);
		}
		await PostgreSQL.executeMutation(
			PgUserFunctions.setUserCompanyInfo,
			this.userId,
			newPgCompany.company.companyid
		);

		// If insertion successful, then add companyId field to user account
		Meteor.users.update(this.userId, {
			$set: { companyId: newPgCompany.company.companyid },
		});
	},
});
