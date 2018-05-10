import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import { Salaries } from "./salaries.js";
import SimpleSchema from "simpl-schema";
import { addToAvg, subFromAvg, changeInAvg } from "./denormalization.js";

/*
	This is a helper function used in reviews.submitReview,
	which I paste here for lack of a better place, from Stack Overflow,
	because why write the code myself when someone else has already done it?
	Copy-paste includes original comments.
*/

function getMonthsBetween(date1,date2,roundUpFractionalMonths) {
	//Months will be calculated between start and end dates.
	//Make sure start date is less than end date.
	//But remember if the difference should be negative.
	var startDate=date1;
	var endDate=date2;
	var inverse=false;
	if(date1>date2)
	{
		startDate=date2;
		endDate=date1;
		inverse=true;
	}

	//Calculate the differences between the start and end dates
	var yearsDifference=endDate.getFullYear()-startDate.getFullYear();
	var monthsDifference=endDate.getMonth()-startDate.getMonth();
	var daysDifference=endDate.getDate()-startDate.getDate();

	var monthCorrection=0;
	//If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
	//The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
	if(roundUpFractionalMonths===true && daysDifference>0)
	{
		monthCorrection=1;
	}
	//If the day difference between the 2 months is negative, the last month is not a whole month.
	else if(roundUpFractionalMonths!==true && daysDifference<0)
	{
		monthCorrection=-1;
	}

	return (inverse?-1:1)*(yearsDifference*12+monthsDifference+monthCorrection);
};

Meteor.methods({
	"hasFiveWords": function (inputString) {
		// Funny story, String.prototype.wordCount is actually
		// defined in reviews.js because I couldn't find a
		// better place for it. Just in case you're wondering.
		if(inputString.wordCount() < 5) {
			throw new Meteor.Error("needsFiveWords", "You should write at least 5 words in this field");
		}
		return "all good";
	},

	"reviews.submitReview": function(newReview) {
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		//This avoids a lot of problems
		Reviews.simpleSchema().clean(newReview);

		// Error-out if _id field is defined
		if ("_id" in newReview) {
			throw new Meteor.Error("containsId","You are not allowed to specifiy your own _id attribute");
		}

		// console.log("SERVER: validating...");
		let validationResult = Reviews.simpleSchema().namedContext().validate(newReview);
		// console.log("SERVER: Here is the validation result: ");
		// console.log(validationResult);
		// console.log(Reviews.simpleSchema().namedContext().validationErrors());

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
		console.log("SERVER: before update");
		console.log(Companies.findOne({name: newReview.companyName}));
		console.log("SERVER: the dates in question: ");
		console.log(newReview.dateJoinedCompany);
		console.log(newReview.dateLeftCompany);
		/*
			QUESTION:
				Do we need some kind of hook to periodically re-check the
				averages in case something happens where a review gets
				inserted before the averages are updated?
		*/
		const newAvgNumMonthsWorked = (newReview.dateLeftCompany === undefined) ?
				company.avgNumMonthsWorked :
				getMonthsBetween(newReview.dateJoinedCompany,newReview.dateLeftCompany, true);
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
					avgNumMonthsWorked: newAvgNumMonthsWorked,
				},
				$inc: { numReviews: 1 } //this will increment the numReviews by 1
			}
		);
		console.log("SERVER: after update");
		console.log(Companies.findOne({name: newReview.companyName}));
	},

	"salaries.submitSalaryData": function (newSalary) {
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		//This avoids a lot of problems
		Salaries.simpleSchema().clean(newSalary);

		// Error-out if _id field is defined
		if ("_id" in newSalary) {
			throw new Meteor.Error("containsId","You are not allowed to specifiy your own _id attribute");
		}

		// console.log("SERVER: validating...");
		let validationResult = Salaries.simpleSchema().namedContext().validate(newSalary);
		// console.log("SERVER: Here is the validation result: ");
		// console.log(validationResult);
		// console.log(Salaries.simpleSchema().namedContext().validationErrors());

		// console.log("SERVER: inserting");
		Salaries.insert(newSalary);

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
		/*
			ATTENTION UX DEVELOPERS
			This method expects a single argument,
			corresponding to a single object, which must
			conform to a SimpleSchema as defined for the
			Companies collection in "imports/api/data/companies.js".

			Translation: Call this method with an object that has
			all the fields and meets all the constraints defined
			in Companies.schema, and it shall go well with you.

			NOTE: This method throws an exception if you
			pass in a newCompanyProfile with a defined _id
			field. This is becuase we want Mongo to define
			the _id's for us, and be agnostic as to what
			any given _id value actually is.
		*/

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		//This avoids a lot of problems
		Companies.simpleSchema().clean(newCompanyProfile);

		// Error-out if _id field is defined
		if ("_id" in newCompanyProfile) {
			throw new Meteor.Error("containsId","You are not allowed to specifiy your own _id attribute");
		}

		//Throws an exception if argument is invalid.
		// console.log("SERVER: validating...");
		let validationResult = Companies.simpleSchema().namedContext().validate(newCompanyProfile);
		// console.log("SERVER: Here is the validation result: ");
		// console.log(validationResult);
		// console.log(Companies.simpleSchema().namedContext().validationErrors());

		/* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */
		//try {
		// console.log("SERVER: inserting");

		Companies.insert(newCompanyProfile);
	},

	//Edits an existing company profile -- UNTESTED
	"companies.editProfile": function (companyProfileEdits) {
		/*
			ATTENTION UX DEVELOPERS
			This function takes a single object, which must have
			an _id field for the Mongo.ObjectId of the CompanyProfile
			to be updated, and other fields corresponding to the
			document fields that need to be edited.

			The _id will be used as a Mongo-Style Selector, and the
			entire object is used as a  Mongo-Style Modifier via $set.

			Example: if you want to append to a company's name,
			then pass an object with a "name" field which has the old name
			plus whatever new text you want to append. You can do this,
			or something like it, for as many fields as you need to change.

			Note: we may need to better define which fields can be changed
			by this method and by whom.

			See the Companies.schema definition in
			"imports/api/data/companies.js" for a list of field names,
			types, and constraints.
				- Josh
		*/

		// Copy-paste until we implement real security
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		// Mongo-style modifiers seem to just be JSON objects
		// where the field names are modifiers and the values
		// are JSON objects with keys identifying the doc field
		// to be modified and values identifying "how" to perform
		// the modifier (as in {$inc: {name: 2}} would increment
		// name by 2 if that was valid). Which means we can just
		// pass companyProfileEdits to $set. Woohoo.
		let modifier = {$set: companyProfileEdits};

		// Apparently SimpleSchema lets you validate
		// Mongo-style modifiers. Dunno about you guys,
		// but I think that's extremely cool.
		Companies.schema.validate(modifier);

		// Will probably just silently do nothing if there's
		// no profile with _id.
		Companies.update(companyProfileEdits._id, modifier);
	},

});
