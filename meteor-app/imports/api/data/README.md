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

__1. JSON Object Validation (legacy)__



__2. Mongo Collections (legacy)__

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
only one that concerns us is idGeneration. This changes how Mongo generates
the \_id fields for newly-inserted documents, which is supposed to uniquely
identify each document and serve as a "primary key" of sorts.

__3. Remote Procedure Calls ("methods")__



__4. Client-side Input Validation__



## Links to External Documentation

__Meteor Guide References:__

Methods: https://guide.meteor.com/methods.html

Collections: https://guide.meteor.com/collections.html

__Meteor API Documentation References:__

Methods: https://docs.meteor.com/api/methods.html

Collections: https://docs.meteor.com/api/collections.html

__Package Docs:__

SimpleSchema: https://github.com/aldeed/simple-schema-js

Collection2: https://github.com/aldeed/meteor-collection2

AutoForms: https://github.com/aldeed/meteor-autoform
