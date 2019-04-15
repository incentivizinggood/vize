import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import i18n from "meteor/universe:i18n";
import { ReviewSchema } from "./reviews.js";
import { CompanySchema } from "./companies.js";
import { SalarySchema } from "./salaries.js";
import { sendEmail } from "../connectors/email.ts";
import { JobAdSchema, JobApplicationSchema } from "./jobads.js";

// Testing with PostgreSQL
import { PostgreSQL } from "../connectors/postgresql/index.ts";
import PgCompanyFunctions from "../models/helpers/postgresql/companies.ts";
import PgReviewFunctions from "../models/helpers/postgresql/reviews.ts";
import PgJobAdFunctions from "../models/helpers/postgresql/jobads.ts";
import PgSalaryFunctions from "../models/helpers/postgresql/salaries.ts";
// import PgCommentFunctions from "../models/helpers/postgresql/comments.js"; // we don't have comments yet
import PgUserFunctions from "../models/helpers/postgresql/users.ts";

Meteor.methods({
	async "postgres.users.createUser"(user, companyPostgresId) {
		// just trying to get this to work, will
		// add security and validation later
		return PostgreSQL.executeMutation(PgUserFunctions.createUser, user);
	},

	sendEmaill(explanation, reason) {
		// Uptill now, it only sends the email, need to get the parameters from the review.

		sendEmail(explanation, reason);

		// if (Meteor.isDevelopment)
		// 	console.log("SERVER sendEmail: checking arguments");
		// check([to, from, subject, text], [String]);
		// const realEmail = { to, from, subject, text };
		// if (Meteor.isDevelopment) {
		// 	console.log("SERVER sendEmail: before send, here is the email:");
		// 	console.log(realEmail);
		// }
		// this.unblock();
		// Email.send(realEmail);
		// if (Meteor.isDevelopment) console.log("SERVER sendEmail: after send");
		// return "we made it";
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
			return false;
		}
		return true;
	},

	async "reviews.checkForSecondReviewByUser"(companyName) {
		if (this.userId) {
			const pgUser = await PostgreSQL.executeQuery(
				PgUserFunctions.getUserById,
				this.userId
			);
			const reviewsByPgUser = PgReviewFunctions.processReviewResults(
				await PostgreSQL.executeQuery(
					PgReviewFunctions.getReviewsByAuthor,
					pgUser.user.userid
				)
			);
			if (
				reviewsByPgUser.filter(
					review => review.companyName === companyName
				).length > 0
			)
				return false;
		}

		return true;
	},

	async "reviews.submitReview"(newReview) {
		// This avoids a lot of problems
		const cleanReview = ReviewSchema.clean(newReview);

		// Make sure the user is logged and is permitted to write a review.
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error("rolePermission", "onlyWorkers");
		}

		const pgUser = await PostgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			this.userId
		);

		cleanReview.submittedBy = pgUser.user.userid;

		const validationResult = ReviewSchema.namedContext().validate(
			cleanReview
		);
		const errors = ReviewSchema.namedContext().validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				"invalidArguments",
				"invalidFormInputs",
				errors
			);
		}

		const newPgReview = PgReviewFunctions.processReviewResults(
			await PostgreSQL.executeMutation(
				PgReviewFunctions.submitReview,
				cleanReview
			)
		);

		if (Meteor.isDevelopment) console.log(newPgReview);

		return newPgReview;

		/*
			QUESTION:
				If the actions taken are different depending on whether
				the company is verified or unverified, how do I handle
				that?
		*/
	},

	async "salaries.checkForSecondSalaryByUser"(companyName) {
		if (this.userId) {
			const pgUser = await PostgreSQL.executeQuery(
				PgUserFunctions.getUserById,
				this.userId
			);
			const salariesByPgUser = PgSalaryFunctions.processSalaryResults(
				await PostgreSQL.executeQuery(
					PgSalaryFunctions.getSalariesByAuthor,
					pgUser.user.userid
				)
			);
			if (
				salariesByPgUser.filter(
					salary => salary.companyName === companyName
				).length > 0
			)
				return false;
		}

		return true;
	},

	async "salaries.submitSalaryData"(salary) {
		// This avoids a lot of problems
		const newSalary = SalarySchema.clean(salary);

		const validationResult = SalarySchema.namedContext().validate(
			newSalary
		);
		const errors = SalarySchema.namedContext().validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				"invalidArguments",
				"invalidFormInputs",
				errors
			);
		}

		// Make sure the user is logged and is permitted to submit their salary.
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error("rolePermission", "onlyWorkers");
		}

		// TODO: filter by location as well

		if (Meteor.isDevelopment) console.log("SERVER: inserting");

		const pgUser = await PostgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			this.userId
		);

		newSalary.submittedBy = pgUser.user.userid;
		if (typeof newSalary.companyId === "string")
			newSalary.companyId = undefined;

		const newPgSalary = await PostgreSQL.executeMutation(
			PgSalaryFunctions.submitSalary,
			newSalary
		);

		return newPgSalary;
	},

	async "jobads.findOne"(jobIdentifier) {
		const job = await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdById,
			Number(jobIdentifier)
		);

		if (job.jobad === undefined) {
			throw new Meteor.Error("notFound", "notFound");
		}

		return PgJobAdFunctions.processJobAdResults(job);
	},

	async "jobads.doesJobAdExist"(jobIdentifier) {
		const job = await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdById,
			jobIdentifier
		);
		if (job.jobad === undefined) {
			return false;
		}
		return true;
	},

	async "jobads.applyForJob"(jobApplication) {
		jobApplication = JobApplicationSchema.clean(jobApplication);
		const validationResult = JobApplicationSchema.namedContext().validate(
			jobApplication
		);
		const errors = JobApplicationSchema.namedContext().validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				"invalidArguments",
				"invalidFormInputs",
				errors
			);
		}

		// Only logged-in workers can apply for jobs
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "worker") {
			throw new Meteor.Error("rolePermission", "onlyWorkers");
		}

		const company = PgCompanyFunctions.processCompanyResults(
			await PostgreSQL.executeQuery(
				PgCompanyFunctions.getCompanyByName,
				jobApplication.companyName
			)
		);

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

	async "jobads.checkIfCompanyBelowJobPostLimit"(companyName) {
		const count = await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdCountForCompany,
			companyName
		);
		if (count === undefined || count === null) {
			// non-existent companies have not met their limit
			return true;
		}
		return !(count >= 5);
	},

	async "jobads.postJobAd"(jobAd) {
		const newJobAd = JobAdSchema.clean(jobAd);
		const validationResult = JobAdSchema.namedContext().validate(newJobAd);
		const errors = JobAdSchema.namedContext().validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				"invalidArguments",
				"invalidFormInputs",
				errors
			);
		}

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId);

		if (user.role !== "company") {
			throw new Meteor.Error("rolePermission", "onlyCompanies");
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
		if (!(user.companyId && user.companyId === newJobAd.companyId)) {
			throw new Meteor.Error("rolePermission", "permissionDenied");
		}

		if (typeof newJobAd.companyId === "string")
			newJobAd.companyId = undefined;
		await PostgreSQL.executeMutation(PgJobAdFunctions.postJobAd, newJobAd);
	},

	async "companies.getAllCompanyNames"() {
		const allCompanies = PgCompanyFunctions.processCompanyResults(
			await PostgreSQL.executeQuery(
				PgCompanyFunctions.getAllCompanies,
				// we'll need to make this more nuanced at some point
				0,
				3000
			)
		);

		return allCompanies.map(company => company.name);
	},

	async "companies.findOne"(companyIdentifier) {
		let company = {};
		if (Number.isNaN(Number(companyIdentifier)))
			company = await PostgreSQL.executeQuery(
				PgCompanyFunctions.getCompanyByName,
				companyIdentifier
			);
		else
			company = await PostgreSQL.executeQuery(
				PgCompanyFunctions.getCompanyById,
				Number(companyIdentifier)
			);

		if (company.company === undefined) {
			throw new Meteor.Error("notFound", "notFound");
		}

		return PgCompanyFunctions.processCompanyResults(company);
	},

	async "companies.companyForCurrentUser"() {
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId); // assume user is defined because this.userId is defined

		if (user.role !== "company" || user.companyId === undefined) {
			throw new Meteor.Error("notFound", "notFound");
		}

		const company = PgCompanyFunctions.processCompanyResults(
			await PostgreSQL.executeQuery(
				PgCompanyFunctions.getCompanyById,
				user.companyId
			)
		);

		if (company === undefined) {
			throw new Meteor.Error("notFound", "notFound");
		}

		return company;
	},

	"companies.isNotSessionError"(companyNameString) {
		if (
			companyNameString === i18n.__("common.forms.companyNotFound") ||
			companyNameString === i18n.__("common.forms.pleaseWait")
		) {
			return false;
		}
		return true;
	},

	async "companies.doesCompanyWithNameNotExist"(companyName) {
		const companyResults = await PostgreSQL.executeQuery(
			PgCompanyFunctions.getCompanyByName,
			companyName
		);
		const company = PgCompanyFunctions.processCompanyResults(
			companyResults
		);
		if (company === undefined) {
			return true;
		}
		return false;
	},

	// Add method for creating a new CompanyProfile
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts. We're not ready for that quite yet.
	async "companies.createProfile"(companyProfile) {
		const newCompanyProfile = CompanySchema.clean(companyProfile);
		const validationResult = CompanySchema.namedContext().validate(
			newCompanyProfile
		);
		const errors = CompanySchema.namedContext().validationErrors();

		if (Meteor.isDevelopment) {
			console.log("SERVER: Here is the validation result: ");
			console.log(validationResult);
			console.log(errors);
		}

		if (!validationResult) {
			throw new Meteor.Error(
				"invalidArguments",
				"invalidFormInputs",
				errors
			);
		}

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("loggedOut", "loggedOut");
		}

		const user = Meteor.users.findOne(this.userId);
		if (user.role !== "company") {
			throw new Meteor.Error("rolePermission", "onlyCompanies");
		}

		if (user.companyId !== undefined) {
			throw new Meteor.Error("duplicateEntry", "onlyOnce");
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
		if (newPgCompany.company !== undefined) {
			await PostgreSQL.executeMutation(
				PgUserFunctions.setUserCompanyInfo,
				this.userId,
				newPgCompany.company.companyid
			);

			// If insertion successful, then add companyId field to user account
			Meteor.users.update(this.userId, {
				$set: { companyId: newPgCompany.company.companyid },
			});
		}
	},
});
