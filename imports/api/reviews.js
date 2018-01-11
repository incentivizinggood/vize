// Connecting mongo
import {Mongo} from "meteor/mongo";



export const Review = new Mongo.Collection('review');

Review.allow({
    insert() {return true},
    update() {return true},
    remove() {return true}
});

Review.deny({
    insert() {return true},
    update() {return true},
    remove() {return true}
});
