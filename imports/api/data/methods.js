import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";

// This is an incomplete code stub.
Meteor.methods({
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
});
