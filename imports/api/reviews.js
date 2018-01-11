// Connecting mongo
import {Mongo} from "meteor/mongo";



export const Review = new Mongo.Collection('review');

// Review.allow({
//     insert() {return false},
//     update() {return false},
//     remove() {return false}
// });
//
// Review.deny({
//     insert() {return true},
//     update() {return true},
//     remove() {return true}
// });
