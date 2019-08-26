import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { i18n } from "meteor/universe:i18n";

import * as dataModel from "imports/api/models/index";

import { PostgreSQL } from "imports/api/connectors/postgresql/index";
import PgCompanyFunctions from "imports/api/models/helpers/postgresql/companies";
import PgJobAdFunctions from "imports/api/models/helpers/postgresql/jobads";
import PgUserFunctions from "imports/api/models/helpers/postgresql/users";

import { JobApplicationSchema } from "./jobads";

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
