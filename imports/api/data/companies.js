import { Mongo } from "meteor/mongo";

export const Companies = new Mongo.Collection("companies");

Companies.schema = new SimpleSchema({
    name: { type: String },
    // denormalizers
    safety: { type: Number, min: 0, max: 5, decimal: true },
    respect: { type: Number, min: 0, max: 5, decimal: true },
    numReviews: { type: Number, min: 0 }
});

if (Meteor.isServer) {
    Meteor.publish("companies", function() {
        return Companies.find({});
    });
}
