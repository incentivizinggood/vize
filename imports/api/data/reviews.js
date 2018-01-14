import { Mongo } from "meteor/mongo";

export const Reviews = new Mongo.Collection("reviews");

Reviews.schema = new SimpleSchema({
    company_id: { type: String },
    user_id: { type: String },
    date: { type: Date },
    text: { type: String },
    safety: { type: Number, min: 0, max: 5, decimal: true },
    respect: { type: Number, min: 0, max: 5, decimal: true }
});

if (Meteor.isServer) {
    Meteor.publish("reviews", function() {
        return Reviews.find({});
    });
}
