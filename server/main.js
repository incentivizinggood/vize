import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import '../imports/api/reviews.js';
import '../imports/api/Tasks.js';
import {Tasks} from '../imports/api/Tasks.js'

//Tasks.insert({_id: 'my-todo'});

// This code only runs on the server
// Meteor.publish('tasks', function() {
//     return Tasks.find();
// });



Meteor.startup(() => {
  // code to run on server at startup

    Tasks.allow({
        insert() {return true},
        update() {return true},
        remove() {return true}
    });

    Tasks.deny({
        insert() {return false},
        update() {return false},
        remove() {return false}
    });
});

if (Meteor.isServer) {
    Meteor.publish("tasks", function() {
        return Tasks.find();
    })
}











