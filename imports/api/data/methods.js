import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import "./denormalizers.js"

// This is an incomplete code stub.
Meteor.methods({
	//This method would need to also update
	//CompanyProfiles with the reference to
	//the new review in the appropriate document.
	//It should also be modified to take a Review
	//object and validate it against a schema.
    "reviews.insert"(company_id, text, safety, respect) {
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        Reviews.insert({
            date: new Date(),
            text: text,
            company_id: company_id,
            user_id: this.userId,
            safety: safety,
            respect: respect
        });

        // Update denormalizations.
        Companies.update(
            { _id: company_id },
            {
                $set: {
                    safety: addToAvg(safety, "$numReviews", "$safety"),
                    respect: addToAvg(respect, "$numReviews", "$respect")
                },
                $inc: { numReviews: 1 }
            }
        );
    }

	//Add method for creating a new CompanyProfile
	//	--> I realize that this is a dummy method.
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts.
	//	--> Whatever.
	"companies.createProfile" (newCompanyProfile) {
		// Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

		//Offload object construction work to the caller,
		//who should have all the needed information anyway.
		//Assumes they can fetch it from whatever form is
		//being used.
		Companies.schema.validate(newCompanyProfile); //Throws an exception if argument is invalid

		/* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */

		Companies.insert(newCompanyProfile);
	}

	//Add method for editing an existing CompanyProfile
	// --- > THIS IS A STUB, SEE BELOW FOR WHY < ---
	"companies.editProfile"(editedCompanyProfile) {
		// Copy-paste until we implement real security
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

		/* I have realized that no assumptions could be made
		about editedCompanyProfile, and that document-replacement
		is probably not a viable solution, as it relies on
		the caller to transfer information from the old profile
		to the new profile, including the unique keys upon which
		the whole system depends. This is unacceptable.

		However, the alternative is to try to take in a list
		of changed fields an construct a Mongo-Style Modifier to
		pass to Comapnies.update, which is quite a lot of work.

		Can we look into the autoforms package? It seems promising.
		*/
	}

	//Add method for querying all reviews for a particular company?
	// --> probably not, querying for Companies is handled via subscribe,
	// which gives you all the Review ObjectId's (since they're part of
	// the company schema), which can be used to query the reviews by ID.


});
