/* WHAT DO "MODELS" DO? */

Models provide getters on the many side of one-to-many relations.
`ManySideModel.getByOneSide(instanceOfOneSide) == [instancesOfManySide]`
`ManySideModel.getTheOneSide() == instanceOfOneSide` This keeps concerns
separated. The references are usually stored on the many side to avoid large
arrays in single documents. Because of this, the many-side knows how to get one
and it self.

/* ...WHY DOES SO MUCH OF THE CODE IN THIS DIRECTORY LOOK FUNNY? */

Because it _is_ funny. But seriously, if you have questions about it,
look at the top of the file to see where whatever-it-is is imported from,
and look either at the comments in the given file or at the README
in its parent directory. The connectors and helpers are explained in
their own right in their own files and directories, and the explanations
will not be repeated here. This directory is about *models*.

/* B-BUT I... */

Okay fine...

So how about what we said earlier about models providing getters
for the many side of one-many relations? Basically the front-end
expects data to look a certain way, it expects it to have a certain
shape or "model", but this may not be necessarily how it looks on
the backend. Typically when the client makes a request, that request
will be one large _thing_, and makes sense in and of itself as a
_thing_, but in reality has a lot of different pieces that have to
be fetched from (in the worst case) all over creation, depending on
how the requested data is actually structured and stored in the backend.

If you think that that's a potentially headache-inducing amount of
work that has to be done, you would be right. This is why we have
models: a layer of abstraction between the client and server-side
data models. Does it actually reduce the amount of "work" done? No,
in the sense that you still have to make all the right database
calls and process all the results correctly. However, it greatly improves
the project structure by eliminating a great deal of code that would
otherwise have to be reported, and most importantly,
_it provides isolation of concerns_. Other benefits can be deduced
from what has already been said.

/* ...YOU STILL HAVEN'T ANSWERED THE QUESTION */

Oh, about why the code looks funny?

Firstly because, as we already said, different pieces of data have to be
fetched from all over creation, i.e. from different DBMS's that work
differently and, most pertinently to the conversation, have different drivers.
In our case we have the user accounts in a Meteor-managed MongoDB collection,
and everything else in a PostgreSQL database on Amazon RDS, and yet the code
on the layer above has to be able to not care about that. So we make do.
This is especially apparent in models.js.

Secondly because there are other layers both above and below the model layer.
There are resolvers above and connectors below. Models don't care too much
about the resolvers, but the resolver layer does determine what functions the
model layer needs to support. Connectors, on the other hand, go between the
model and the database driver and have to things like connection pooling,
low-level error handling, and (in the case of SQL databases) transaction
management. Then you also have helper functions that wrap the database routines
that the models ask the connectors to execute.

Put that all together and yes, you get some really, _really_ funny-looking code.
But trust me, keep digging around in the documentation (both for the project
and for the packages used by the project) and eventually it should make sense.

/* ...THEN CAN YOU PLEASE TELL ME... */

Yes, look at /imports/api/graphql/connectors/postgresql.js for the PostgreSQL
connector, /imports/api/models/models.js for the model init code,
/imports/api/models/helpers/postgresql/README.md for the helper functions,
and the Meteor documentation for everything related to Meteor.users and how
to use Meteor's special Mongo collections.

Pay close attention to the User model in user.js, and maybe also to the User
schema (and other related code) in /imports/api/data/users.js, because those
will begin to give you a sense of how our peculiar Mongo-PostgreSQL
cross-dependency actually works.

Then there's /imports/api/graphql/resolvers.js
and /imports/api/graphql/schema.graphql for what the higher-up layers expect
to get from the model layer and how the model layer is used, and
/imports/api/data/* for everything is supposed to do and look like on the frontend.

/* FINAL NOTES ABOUT THE CURRENT STATE OF THE MODEL LAYER CODE */

First, ID's. ID is typedef'd to be a String. Mongo ObjectID's are strings.
But the current PostgreSQL tables use integers to identify tuples.
So queries for a user "with a given ID" have to be able to handle anything,
and every other query "by ID" has to make sure that the ID argument represents
a valid integer before proceeding.

Second, results validation. You will notice that every model (almost every?
I forget, and don't care to check...) has an "isValid" function, and it uses
the node simpl-schema package because that is the frontend's legacy JSON
object validation package, and everything that doesn't pass muster with it
is likely to cause an error at some point. The schemas being validated against
are all in /imports/api/data, as you will see from the import statements in
the model files where the schemas are used.

Lastly, mutations. There aren't any. All the database write operations are
done either through Meteor methods or (in the case of users) through Meteor's
user account system. You can see there are "skeleton" functions where the
mutations are supposed to go, but filling them in must wait until we have
figured out exactly how to go about replacing the current project components
that do that job.

Cheers.
