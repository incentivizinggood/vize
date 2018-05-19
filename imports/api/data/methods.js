import { Meteor } from "meteor/meteor";
import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import { Salaries } from "./salaries.js";
import { JobAds } from "./jobads.js";
import { Votes } from "./votes.js";
import { Email } from "meteor/email";
import SimpleSchema from "simpl-schema";
import { addToAvg, subFromAvg, changeInAvg } from "./denormalization.js";

Meteor.methods({
    sendEmail: function(to, from, subject, text) {
        if (Meteor.isDevelopment)
            console.log("SERVER sendEmail: checking arguments");
        check([to, from, subject, text], [String]);
        let realEmail = { to, from, subject, text };
        if (Meteor.isDevelopment) {
            console.log("SERVER sendEmail: before send, here is the email:");
            console.log(realEmail);
        }
        this.unblock();
        Email.send(realEmail);
        if (Meteor.isDevelopment) console.log("SERVER sendEmail: after send");
        return "we made it";
    },

    hasFiveWords: function(inputString) {
        // Funny story, String.prototype.wordCount is actually
        // defined in reviews.js because I couldn't find a
        // better place for it. Just in case you're wondering.
        if (inputString.wordCount() < 5) {
            throw new Meteor.Error(
                "needsFiveWords",
                "You should write at least 5 words in this field"
            );
        }
        return "all good";
    },

    "reviews.submitReview": function(newReview) {
        //This avoids a lot of problems
        newReview = Reviews.simpleSchema().clean(newReview);

        let validationResult = Reviews.simpleSchema()
            .namedContext()
            .validate(newReview);
        let errors = Reviews.simpleSchema()
            .namedContext()
            .validationErrors();

        if (Meteor.isDevelopment) {
            console.log("SERVER: Here is the validation result: ");
            console.log(validationResult);
            console.log(errors);
        }

        if (!validationResult) {
            throw new Meteor.Error(
                "ClientError",
                "Invalid form inputs",
                errors
            );
        }

        // Make sure the user is logged and is permitted to write a review.
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to write a review"
            );
        }

        const user = Meteor.users.findOne(this.userId);

        if (user.role !== "worker") {
            throw new Meteor.Error(
                "rolePermission",
                "Only workers may write reviews."
            );
        }

        // TODO: use user to fill in the "who wrote this" info in this review.

        Reviews.insert(newReview);

        /*
			QUESTION:
				If the actions taken are different depending on whether
				the company is verified or unverified, how do I handle
				that?
		*/

        // Can assume this to be defined since it is checked for
        // in the schema validation for companyName
        const company = Companies.findOne({ name: newReview.companyName });

        // Update denormalizations.
        if (company !== undefined) {
            if (Meteor.isDevelopment) {
                console.log("SERVER: before update");
                console.log(
                    Companies.findOne(
                        Companies.findOne({ name: newReview.companyName })
                    )
                );
            }

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
                        healthAndSafety: addToAvg(
                            newReview.healthAndSafety,
                            company.numReviews,
                            company.healthAndSafety
                        ),
                        managerRelationship: addToAvg(
                            newReview.managerRelationship,
                            company.numReviews,
                            company.managerRelationship
                        ),
                        workEnvironment: addToAvg(
                            newReview.workEnvironment,
                            company.numReviews,
                            company.workEnvironment
                        ),
                        benefits: addToAvg(
                            newReview.benefits,
                            company.numReviews,
                            company.benefits
                        ),
                        overallSatisfaction: addToAvg(
                            newReview.overallSatisfaction,
                            company.numReviews,
                            company.overallSatisfaction
                        ),
                        percentRecommended: addToAvg(
                            newReview.wouldRecommendToOtherJobSeekers ? 1 : 0,
                            company.numReviews,
                            company.percentRecommended
                        ),
                        avgNumMonthsWorked: addToAvg(
                            newReview.numberOfMonthsWorked,
                            company.numReviews,
                            company.avgNumMonthsWorked
                        ),
                    },
                    $inc: { numReviews: 1 }, //this will increment the numReviews by 1
                }
            );

            if (Meteor.isDevelopment) {
                console.log("SERVER: after update");
                console.log(Companies.findOne({ name: newReview.companyName }));
            }
        }
    },

    "reviews.changeVote": function(review, vote) {
        console.log(
            "SERVER: User " +
                this.userId +
                " voted " +
                vote +
                " on review " +
                review._id
        );

        // validate vote: must be boolean
        if (typeof vote !== "boolean") {
            if (Meteor.isDevelopment)
                console.log("SERVER: vote is not boolean");
            throw new Meteor.Error(
                "invalidArguments",
                "Second argument [vote] must be a boolean"
            );
        }

        // validate review: must match Reviews.schema
        let validationResult = Reviews.simpleSchema()
            .namedContext()
            .validate(review);
        let errors = Reviews.simpleSchema()
            .namedContext()
            .validationErrors();

        if (!validationResult) {
            if (Meteor.isDevelopment) console.log("SERVER: review is invalid");
            if (Meteor.isDevelopment) console.log(errors);
            throw new Meteor.Error(
                "invalidArguments",
                "First argument [review] must be a review",
                errors
            );
        }

        if (Reviews.findOne(review) === undefined) {
            if (Meteor.isDevelopment)
                console.log("SERVER: review does not exist");
            throw new Meteor.Error(
                "invalidArguments",
                "You may not vote on reviews that do not exist yet"
            );
        }

        // must be logged in
        if (!this.userId) {
            if (Meteor.isDevelopment)
                console.log("SERVER: user is not logged in");
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to vote"
            );
        }

        const user = Meteor.users.findOne(this.userId);

        // only workers
        if (user.role === "company") {
            if (Meteor.isDevelopment) console.log("SERVER: user is a company");
            throw new Meteor.Error(
                "rolePermission",
                "Companies are not currently allowed to vote on reviews"
            );
        }

        // can't vote on own review
        if (this.userId === review.submittedBy) {
            if (Meteor.isDevelopment)
                console.log("SERVER: user is voting on own review");
            throw new Meteor.Error(
                "noCheating",
                "You are not allowed to vote on your own review"
            );
        }

        // This next bit was a pain to write

        let previousVote = Votes.findOne({
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
        let proceed =
            ((previousVote === undefined && result !== undefined) ||
                (previousVote !== undefined && result !== 0)) &&
            (previousVote === undefined || vote !== previousVote.value);
        if (proceed) {
            if (vote === true) {
                let decNum =
                    previousVote === undefined || review.downvotes === 0
                        ? 0
                        : -1;
                Reviews.update(
                    review._id,
                    { $inc: { upvotes: 1, downvotes: decNum } },
                    { getAutoValues: false }
                );
            } else {
                let decNum =
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

    "salaries.submitSalaryData": function(newSalary) {
        //This avoids a lot of problems
        newSalary = Salaries.simpleSchema().clean(newSalary);

        let validationResult = Salaries.simpleSchema()
            .namedContext()
            .validate(newSalary);
        let errors = Salaries.simpleSchema()
            .namedContext()
            .validationErrors();

        if (Meteor.isDevelopment) {
            console.log("SERVER: Here is the validation result: ");
            console.log(validationResult);
            console.log(errors);
        }

        if (!validationResult) {
            throw new Meteor.Error(
                "ClientError",
                "Invalid form inputs",
                errors
            );
        }

        // Make sure the user is logged and is permitted to submit their salary.
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to create a profile"
            );
        }

        const user = Meteor.users.findOne(this.userId);

        if (user.role !== "worker") {
            throw new Meteor.Error(
                "rolePermission",
                "Only workers may submit their salaries."
            );
        }

        // TODO: filter by location as well
        const { companyName, jobTitle } = newSalary; // changed to use companyName: names uniquely identify companies as well, but salaries might have the same companyId (the one for un-verified companies) if submitted from the home page
        if (Salaries.find({ companyName, jobTitle }).count() !== 0) {
            throw new Meteor.Error(
                "duplicateSalary",
                "You may only submit one salary per company per job title."
            );
        }

        console.log("SERVER: inserting");

        // TODO: use upsert to prevent duplicate salaries.
        // Salaries.upsert({userId, companyId, jobTitle, location}, newSalary);
        Salaries.insert(newSalary);
    },

    "jobads.findOne": function(jobIdentifier) {
        let job = JobAds.findOne(jobIdentifier);
        if (job === undefined) {
            throw new Meteor.Error(
                "notFound",
                "Your search for job ads did not return any results"
            );
        }

        return job;
    },

    "jobads.doesJobAdExist": function(jobIdentifier) {
        let job = JobAds.findOne(jobIdentifier);
        if (job === undefined) {
            throw new Meteor.Error(
                "notFound",
                "There is no job ad with that id in our database"
            );
        }

        return "all good";
    },

    "jobads.applyForJob": function(jobApplication) {
        jobApplication = JobAds.applicationSchema.clean(jobApplication);
        let validationResult = JobAds.applicationSchema
            .namedContext()
            .validate(jobApplication);
        let errors = JobAds.applicationSchema.namedContext().validationErrors();

        if (Meteor.isDevelopment) {
            console.log("SERVER: Here is the validation result: ");
            console.log(validationResult);
            console.log(errors);
        }

        if (!validationResult) {
            throw new Meteor.Error(
                "ClientError",
                "Invalid form inputs",
                errors
            );
        }

        // Only logged-in workers can apply for jobs
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to create a profile"
            );
        }

        const user = Meteor.users.findOne(this.userId);

        if (user.role !== "worker") {
            throw new Meteor.Error(
                "rolePermission",
                "Only workers may submit their salaries."
            );
        }

        let company = Companies.findOne({ name: jobApplication.companyName });
        let companyEmailAddress = company.contactEmail;
        let companyName = jobApplication.companyName;
        let workerName = jobApplication.fullName;
        let workerEmail = jobApplication.email;
        let workerPhone = jobApplication.phoneNumber;
        let workerComments =
            jobApplication.coverLetterAndComments !== undefined
                ? jobApplication.coverLetterAndComments
                : "[the applicant did not fill in this field]";
        let jobId = jobApplication.jobId;
        let emailSubject =
            "VIZE " + workerName + " has responded to your job advertisement";

        /*
			QUESTION:
			- What if the company didn't provide a valid email?
			- What if the worker didn't?
			- ...or a valid phone number?
		*/

        let emailText =
            "To those at " +
            companyName +
            "," +
            "\n\n\tCongratulations, you just received a new job application! " +
            "A Vize user, " +
            workerName +
            ", has responded " +
            "to your job post (which was given id=" +
            jobId +
            ")." +
            "They provided the contact information below, feel free to contact " +
            "them directly." +
            "\n\n\tIf you have any issues with this process, please " +
            "let us know. If you hire this employee, please send us a message letting " +
            "us know what you think of our service. We hope you've found the perfect " +
            "employee for your company and the position!" +
            "\n\nAll the best," +
            "\n\n\tThe Vize Team" +
            "\n\nAPPLICANT INFORMATION" +
            "\nFull name: " +
            workerName +
            "\nEmail: " +
            workerEmail +
            "\nPhone number: " +
            workerPhone +
            "\nCover letter/Aditional comments:\n" +
            workerComments;

        let applicationEmail = {
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

    "jobads.postJobAd": function(newJobAd) {
        newJobAd = JobAds.simpleSchema().clean(newJobAd);
        let validationResult = JobAds.simpleSchema()
            .namedContext()
            .validate(newJobAd);
        let errors = JobAds.simpleSchema()
            .namedContext()
            .validationErrors();

        if (Meteor.isDevelopment) {
            console.log("SERVER: Here is the validation result: ");
            console.log(validationResult);
            console.log(errors);
        }

        if (!validationResult) {
            throw new Meteor.Error(
                "ClientError",
                "Invalid form inputs",
                errors
            );
        }

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to create a profile"
            );
        }

        const user = Meteor.users.findOne(this.userId);
        if (user.role !== "company") {
            throw new Meteor.Error(
                "rolePermission",
                "Only companies may post job ads."
            );
        }

        if (!(user.companyId && user.companyId === newJobAd.companyId)) {
            throw new Meteor.Error(
                "rolePermission",
                "You may only post a job ad for a company that you are allowed to administer."
            );
        }

        JobAds.insert(newJobAd);
    },

    "companies.findOne": function(companyIdentifier) {
        let company = Companies.findOne(companyIdentifier);
        if (company === undefined) {
            throw new Meteor.Error(
                "notFound",
                "Your search for companies did not return any results"
            );
        }

        return company;
    },

    "companies.companyForCurrentUser": function() {
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to perform this action"
            );
        }

        let user = Meteor.users.findOne(this.userId); // assume user is defined because this.userId is defined

        if (user.role !== "company" || user.companyId === undefined) {
            throw new Meteor.Error(
                "rolePermission",
                "Only companies who have created Vize profiles may perform this action"
            );
        }

        let company = Companies.findOne(user.companyId);

        if (company === undefined) {
            throw new Meteor.Error(
                "notFound",
                "Unable to match a company profile with this user ID"
            );
        }

        return company;
    },

    "companies.isNotSessionError": function(companyNameString) {
        if (
            companyNameString === "ERROR: COMPANY NOT FOUND" ||
            companyNameString ===
                "Please wait while we finish loading the form..."
        ) {
            throw new Meteor.Error(
                "sessionError",
                "Please stop messing around"
            );
        }

        return "all good";
    },

    "companies.isCompanyNameAvailable": function(companyName) {
        if (Companies.hasEntry(companyName)) {
            throw new Meteor.Error(
                "nameTaken",
                "The name you provided is already taken"
            );
        }
        return "all good";
    },

    // Technically this does something different, and the return value vs
    // thrown error and callback structure makes it easy to do this way,
    // but is there some way to combine this method with the previous one?
    // They're almost identical.
    "companies.doesCompanyExist": function(companyName) {
        if (!Companies.hasEntry(companyName)) {
            throw new Meteor.Error(
                "noCompanyWithThatName",
                "There is no company with that name in our database"
            );
        }
        return "all good";
    },

    //Add method for creating a new CompanyProfile
    //	--> The full solution will require cross-validation
    //	--> with the collection of companies that have not
    //	--> yet set up accounts. We're not ready for that quite yet.
    "companies.createProfile": function(newCompanyProfile) {
        newCompanyProfile = Companies.simpleSchema().clean(newCompanyProfile);
        let validationResult = Companies.simpleSchema()
            .namedContext()
            .validate(newCompanyProfile);
        let errors = Companies.simpleSchema()
            .namedContext()
            .validationErrors();

        if (Meteor.isDevelopment) {
            console.log("SERVER: Here is the validation result: ");
            console.log(validationResult);
            console.log(errors);
        }

        if (!validationResult) {
            throw new Meteor.Error(
                "ClientError",
                "Invalid form inputs",
                errors
            );
        }

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error(
                "loggedOut",
                "You must be logged in to your account in order to create a profile"
            );
        }

        const user = Meteor.users.findOne(this.userId);
        if (user.role !== "company") {
            throw new Meteor.Error(
                "rolePermission",
                "Only companies may post job ads."
            );
        }

        if (user.companyId !== undefined) {
            throw new Meteor.Error(
                "profileExists",
                "Our records indicate that you have already created a profile for your company"
            );
        }

        /* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */
        Companies.insert(newCompanyProfile);

        //If insertion successful, then add companyId field to user account
        Meteor.users.update(this.userId, {
            $set: { companyId: newCompanyProfile._id },
        });
    },
});
