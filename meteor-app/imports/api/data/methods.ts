import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { i18n } from "meteor/universe:i18n";

import * as dataModel from "imports/api/models/index";

import { PostgreSQL } from "imports/api/connectors/postgresql/index";
import PgCompanyFunctions from "imports/api/models/helpers/postgresql/companies";
import PgJobAdFunctions from "imports/api/models/helpers/postgresql/jobads";
import PgSalaryFunctions from "imports/api/models/helpers/postgresql/salaries";
import PgUserFunctions from "imports/api/models/helpers/postgresql/users";

import { SalarySchema } from "./salaries";
import { JobAdSchema, JobApplicationSchema } from "./jobads";

Meteor.methods({
	async "postgres.users.createUser"(user, companyPostgresId) {
		// just trying to get this to work, will
		// add security and validation later
		return PostgreSQL.executeMutation(PgUserFunctions.createUser, user);
	},

	flagAReview(reviewId, reason, explanation) {
		// gets the data from the frontend and sends an email.
		dataModel.flagAReview(reviewId, this.userId, reason, explanation);
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
});
