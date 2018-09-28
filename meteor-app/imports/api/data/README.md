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

1) JSON object validation (via SimpleSchema)
2) Mongo Collections
3) Remote Procedure Call implementations (handled through Meteor's "Method" construct)
4) Client-side data validation (handled through Collection2, SimpleSchema, and AutoForms in concert)

_1. JSON Object Validation_



_2. Mongo Collections (legacy)_



_3. Remote Procedure Calls ("methods")_



_4. Client-side Input Validation_



## Links to External Documentation

Meteor Guide References:

Methods: https://guide.meteor.com/methods.html

Collections: https://guide.meteor.com/collections.html

Meteor API Documentation References:

Methods: https://docs.meteor.com/api/methods.html

Collections: https://docs.meteor.com/api/collections.html

Package Docs:

SimpleSchema: https://github.com/aldeed/simple-schema-js

Collection2: https://github.com/aldeed/meteor-collection2

AutoForms: https://github.com/aldeed/meteor-autoform
