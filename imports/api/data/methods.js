import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import {Email} from "meteor/email";
import {Meteor} from "meteor/meteor";
//import "./denormalizers.js"

Meteor.methods({
	//This method needs to be modified to take a Review
	//object and validate it against a schema.
	// // - Josh
    // Server: Define a method that the client can call.
    sendEmail: function(to, from, subject, text) {
        console.log("sendEmail: LOOK WE MADE IT !?!?!?!? WOOOT WOOT");
        let realEmail = { to, from, subject, text };
        console.log(realEmail);
        this.unblock();
        Email.send(realEmail);
        console.log("sendEmail: after send");
    },

// "reviews.insert"(company_id, text, safety, respect) {
     //    // Make sure the user is logged in before inserting a task
     //    if (!this.userId) {
     //        throw new Meteor.Error("not-authorized");
     //    }
    //
     //    Reviews.insert({
     //        date: new Date(),
     //        text: text,
     //        company_id: company_id,
     //        user_id: this.userId,
     //        safety: safety,
     //        respect: respect
     //    });
    //
     //    // Update denormalizations.
     //    Companies.update(
     //        { _id: company_id },
     //        {
     //            $set: {
	// 				/*
	// 					I'm not sure how these denormalizations work,
	// 					but please make sure that they're using the correct
	// 					variable names as per Reviews.schema.
    //
	// 					In fact, I'm almost certain that one or more of them
	// 					is wrong because the schema attribute names used to have
	// 					the same names as this method's arguments, but I'm
	// 					not sure which is supposed to be which. BUG
	// 						- Josh
	// 				*/
     //                safety: addToAvg(safety, "$numReviews", "$safety"),
     //                respect: addToAvg(respect, "$numReviews", "$respect")
     //            },
     //            $inc: { numReviews: 1 }
     //        }
     //    );
    // }
    //
	// //Add method for creating a new CompanyProfile
	// //	--> The full solution will require cross-validation
	// //	--> with the collection of companies that have not
	// //	--> yet set up accounts. We're not ready for that quite yet.
	// "companies.createProfile" (newCompanyProfile) {
	// 	/*
	// 		ATTENTION UX DEVELOPERS
	// 		This method expects a single argument,
	// 		corresponding to a single object, which must
	// 		conform to a SimpleSchema as defined for the
	// 		Companies collection in "imports/api/data/companies.js".
    //
	// 		Translation: Call this method with an object that has
	// 		all the fields and meets all the constraints defined
	// 		in Companies.schema, and it shall go well with you.
    //
	// 		IMPORTANT NOTE: Please, pretty please, don't define
	// 		your own _id field. We want Mongo to do that for us.
    //
	// 		In fact, there is going to be a pull request (soon)
	// 		where I will throw an exception if newCompanyProfile
	// 		has a defined _id field.
    //
	// 		And you will eat it, and I will laugh,
	// 		because I warned you. :)
	// 			- Josh
	// 	*/
	// 	// Make sure the user is logged in before inserting a task
     //    if (!this.userId) {
     //        throw new Meteor.Error("not-authorized");
     //    }
    //
	// 	//Throws an exception if argument is invalid.
	// 	Companies.schema.validate(newCompanyProfile);
    //
	// 	/*
	// 		COMING SOON!
	// 		Throw an exception if newCompanyProfile._id is defined.
	// 	*/
    //
	// 	/* We will probably end up needing more checks here,
	// 	I just don't immediately know what they need to be. */
    //
	// 	Companies.insert(newCompanyProfile);
	// }
    //
	// //Add method for editing an existing CompanyProfile
	// // --- > THIS IS A WORK IN PROGRESS, SEE BELOW FOR WHY < ---
	// "companies.editProfile"(companyProfileEdits) {
	// 	/*
	// 		COMING SOON!
	// 		Note: Don't worry about the fact that this code hasn't been
	// 		written yet. This is how it's going to work when it has been written.
    //
	// 		ATTENTION UX DEVELOPERS
	// 		This function takes a single object, which must have
	// 		an _id field for the Mongo.ObjectId of the CompanyProfile
	// 		to be updated, and other fields corresponding to the
	// 		document fields that need to be edited.
    //
	// 		The _id will be used as a Mongo-Style Selector, and the
	// 		other fields will be turned into a Mongo-Style Modifier,
	// 		which will REPLACE the existing fields (except _id)
	// 		with the new ones (via the $set modifier).
    //
	// 		Example: if you want to append to a company's name,
	// 		then pass an object with a "name" field which has the old name
	// 		plus whatever new text you want to append. You can do this,
	// 		or something like it, for as many fields as you need to change.
	// 		Note: we may need to better define which fields can be changed
	// 		by this method and by whom.
    //
	// 		See the Companies.schema definition in
	// 		"imports/api/data/companies.js" for a list of field names,
	// 		types, and constraints.
	// 			- Josh
	// 	*/
    //
	// 	// Copy-paste until we implement real security
     //    if (!this.userId) {
     //        throw new Meteor.Error("not-authorized");
     //    }
    //
	// 	/*
	// 		CODE GOES HERE
	// 	*/
	// }
    //
	// //Add method for querying all reviews for a particular company?
    //

});
