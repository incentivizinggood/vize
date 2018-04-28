// The users collection is handled differently than the other collections.
// It exists by default and has some built-in fields. As such it is not created
// here, but is instead modified and tweaked.

// ----- Schema and Data Format -----

Meteor.users.schema = new SimpleSchema({
    // These fields are used by default in Meteor.
    // There is little option to change these.
    username: {
        type: String,
        index: true,
        unique: true
    },
    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': {
        type: String
        // We choose to not use a regex check on email addresses,
        // they will need to get verified anyway so there is no point.
    },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true },
    // There also exists a profile object by default, but
    // this is not used in this app so it is ignored.

    // These fields are unique to this app.
    role: {
        // The role of this user. This is used to present
        // workers and companies with different utilities.
        type: String,
        allowedValues: ["worker", "company-unverified", "company"]
    }
});

// Check that the new user follows the schema defined above.
Accounts.validateNewUser((user) => {
    Meteor.Users.schema.validate(user);
    return true;
});

// ----- Security -----

// Deny all client-side updates to user documents.
// The profile field is writable by default, but this is undesired for
// security reasons. All modifications of the database should be handled
// only by the server.
Meteor.users.deny({
    update() { return true; }
});

if (Meteor.isServer) {
    // Only publish these few fields by default.
    Meteor.publish('users', function () {
        return Meteor.users.find({}, {
            fields: {
                username: 1,
                role: 1
            }
        });
    });
}
