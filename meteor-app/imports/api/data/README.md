# Information on `imports/api/data/`

## Description

This directory contains all of the core Meteor code. This includes MongoDB collection
definitions, MongoDB "schemas", denormalization helpers, and methods.

Most of the code can be understood by reading the documentation for the respective
Meteor packages and features being used. Code comments will be reserved for
implementation and design details. Nonetheless, here follows an explanation to help
so-and-so get started with this code. If all you want is the references to the
documentation, just hold PgDn until you get to the end.

This directory contains a variety of interesting and important components
of our current solution stack, each of which deserve to be discussed in
turn. These components are:

1) JSON object validation (via SimpleSchema and Collection2)
2) Mongo Collections
3) Remote Procedure Call implementations (handled through Meteor's "Method" construct)
4) Client-side data validation (handled through Collection2, SimpleSchema, and AutoForms in concert)

__1. Mongo Collections (legacy)__

This section is marked as "legacy" because the code it corresponds to is
now legacy, and liable to be changed/removed in the very near future. Why is
this? Because we are no longer primarily using MongoDB for data storage and
retrieval, therefore the Mongo Collections initialized in this directory are
mostly unusused. The exception, as usual, is Meteor.users, a very
important Mongo Collection that we don't create explicitly. So I will discuss,
in turn, all the legacy Mongo collections except Meteor.users, and then Meteor.users.

Near the top of comments.js, companies.js, jobads.js, reviews.js, salaries.js,
and votes.js, you will see a line like this:

    export const CollectionObjectName = new Mongo.Collection("UnderTheHoodCollectionName", {
        idGeneration: "STRING",
    });

This creates a special object, an instance of a class provided by Meteor to
interface with Mongo collections. The object can in many ways be thought of
as literally being Mongo collection with the name "UnderTheHoodCollectionName",
and indeed if no Collection with the name "UnderTheHoodCollectionName" exists
when that line is executed, then Meteor will ask Mongo to create one.

The second argument is a JSON object with "creation options" for the Mongo
collection. There may be several possible options you can specify, but the
only one that concerns us is idGeneration. This changes the type of the \_id field
for newly-inserted documents, a field which is supposed to uniquely identify each document and serve as a "primary key" of sorts. "STRING" means the \_id field has
type String and, if not supplied on the inserted document, is added by Mongo as a
randomly generated string. While we used to use the "MONGO" option, which made \_id
into a proper Mongo ObjectID, the "STRING" option gave us the freedom to manipulate
the \_id field according to our own purposes, which in turn made it easier to
migrate to PostgreSQL collection-by-collection rather than all at one whop.

Next up in a given file tends to be the schema definition(s) and the attachSchema
call, which will be discussed in the next section. Those are followed by the
allow/deny, or rather just "deny" rules via Collection.deny as our intent is to
deny the client any ability to operate directly on the collections, instead forcing
it to make an RPC and request the server to execute code, which allows us to check
everything.

Finally, and this applies to Meteor.users as well as everything else (although
it is a bit more complex with Meteor.users) is the server-only call to
Meteor.publish, which creates a "publication" that the client can "subscribe" to.
Basically, it turns which documents (and fields within those documents) are
visible to the client. There's more that you can do with Meteor's publications
and subscriptions, but that's really all we use them for. For every Collection
except Meteor.users, we make every field of every document available to the client
by "publishing Collection.find({})" in each case, because there isn't really
any personal information in any of the collections except Meteor.users.

__Speaking of which, what about Meteor.users?__ Excellent question.

__2. JSON Object/Document Validation (legacy)__



__3. Remote Procedure Calls ("methods")__



__4. Client-side Input Validation__



## Links to External Documentation

__Meteor Guide References:__

Methods: https://guide.meteor.com/methods.html

Collections: https://guide.meteor.com/collections.html

Data Loading (Publish/Subscribe): https://guide.meteor.com/data-loading.html

__Meteor API Documentation References:__

Methods: https://docs.meteor.com/api/methods.html

Collections: https://docs.meteor.com/api/collections.html

Publish/Subscribe: https://docs.meteor.com/api/pubsub.html

__Package Docs:__

SimpleSchema: https://github.com/aldeed/simple-schema-js

Collection2: https://github.com/aldeed/meteor-collection2

AutoForms: https://github.com/aldeed/meteor-autoform
