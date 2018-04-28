import { Mongo } from "meteor/mongo";

// local collection. Do not connect
export const Notifications = new Mongo.Collection('notifications', {connection: null});

export function add_notification (content, timeout) {
    // add to the collection
    Notifications.insert({content:content, timeout:timeout});
    // echo to console.log as well
    // TODO: may need to handle react elements and strings differently.
    console.log (content);
    // TODO: set auto fade callback
}

export function remove_notification (id) {
    Notifications.remove({_id:id});
}
