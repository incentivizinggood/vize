import { Mongo } from 'meteor/mongo';

export const CompaniesC = new Mongo.Collection('companies');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('companies', function () {
    return CompaniesC.find({});
  });
}
