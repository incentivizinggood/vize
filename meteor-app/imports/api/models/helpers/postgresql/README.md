**TODO: Finish merging these helpers into the models.**

/_ PURPOSE OF THE CODE IN THIS DIRECTORY _/

The files in this directory are meant to be "helper" functions that abstract
away the gory details of repeated interactions with the PostgreSQL database.
Here follows an explanation of what you can expect to find in each file.

The stars of the show are companies.js, reviews.js, salaries.js, jobads.js,
comments.js, votes.js, and users.js, each corresponding to a major SimpleSchema
type as understood by GraphQL and the frontend.

Objects in the database cannot be expected to follow the SimpleSchema format, as
there is a frequent need to denormalize (break things apart into logical
subcomponents) the higher-level objects, such as when a company or job post has
multiple corresponding locations, or when a review or comment has been voted on
multiple times. The job of the "model" layer of GraphQL, as I understand it, is
to handle the potential discrepancies between the backend and frontend data
models. The model layer constructs database queries, sends them through the
"connector" layer, and processes the results in a way that makes sense to the
closer-to-frontend "resolver" layer.

The classes and functions defined in this directory, then, represent the
database querying and results processing which are the responsibility of the
model layer, and you can see that there is roughly one file in this directory
per model file in /imports/api/models, with the exception of misc.js and
node-testing-setup.js, which will be explained later. This correspondence is
because these helper functions were written to directly fill the needs of the
existing model functions. It may be more helpful to think of each helper
function as being "one query", and the helper functions were written based on
the kinds of queries the model layer needed to make.

So if they were designed to fill the needs of the GraphQL models, why do they
have their own directory? Firstly so that they can be reused without being
rewritten, since each one represents a hefty chunk of ugly and
difficult-to-get-right code. Secondly so that they can be used in other contexts
than the GraphQL models.

Another strange requirement of this project that the code in this directory had
to help meet was that the frontend forms made heavy use of Meteor's
infrastructure, namely the infamous Methods as well as the AutoForms package,
and would have to be completely rewritten in order to go through GraphQL or
really anything other than Meteor. Packing the database query and results
processing functions (as well as the connectors) into their own independent
classes allows for PostgreSQL to be used from inside the Meteor methods, which
accomplishes the goal of migrating to (mostly) PostgreSQL despite the migration
to GraphQL still being underway.

/_ STRUCTURE OF CODE IN: comments.js, companies.js, jobads.js, reviews.js,
salaries.js, users.js, votes.js _/

Each file exports a class which contains all the query and results-processing
functions for the named type via static functions. As to the query functions,
you can recognize a query function because it takes "client" as the first
argument and is declared async in addition to static. There are several reasons
for this.

As to their being static, it just didn't seem to make sense to force
instantiation when I could do things otherwise. If someone wants to rewrite this
part of the code to be more purely functional, they are welcome to do so.
Furthermore, static functions reflect the intention of merely wrapping code that
has to be reused multiple times, without the confusion of trying to create some
separate entity or object.

As to their being declared async and taking client as the first argument, these
both have to do with the node-pg package, which is a PostgreSQL driver for
Node.js, and how this package is being used by our project.

As to the need for async, node-pg communicates with the database via (basically)
remote procedure calls, which (in JavaScript) necessitates that the code be
asynchronous. Now you may know that there are multiple (perhaps too many) ways
to handle asynchronous code execution in JavaScript, notably 1) nested
callbacks,

2. Promises, and 3) async/await, all of which are supported by node-pg. Why did
   I choose async/await? Firstly because it is easier to read and understand,
   and therefore to maintain. Do we lose some performance? Perhaps, but
   seriously, who cares? Secondly, because I found Promises and callbacks too
   confusing to learn given my background in POSIX and Windows process
   synchronization, and therefore async/await was the only way I could
   reasonably be expected to write the needed code in the given time frame. So
   there.

Next, why pass in the database connection (the "client" argument) as an
argument? This is so that we can separate the connector layer from the model
layer. If this is not done, then all the connection-making (and, what's vastly
worse, the connection-related error-handling) would have to be duplicated in
every helper function. I actually did that for a while before I figured out how
to do things the way I'm currently doing them, and it was one of worst
programming nightmares I've ever experienced (thanks to Joshua Shaffer for
helping set me straight).

These helper functions are properly conceived as code being executed over a
connection. They don't care what the connection is or where it comes from, so
that can easily be refactored into an additional argument. JavaScript's
"everything is an Object" paradigm then allows us to write a connector layer
that handles all the connection-making and connection-related error-handling,
while all the helper functions need to worry about are that they received the
correct arguments. You can how this is actually carried out by looking at
imports/graphql/connectors/postgresql.js. This does mean that these helper
functions are rarely actually used without being passed through a connector, and
in that sense the actual "function calls" are a bit more difficult to write and
understand initially, but the rest of the code works and reads much better as a
result.

Okay, thus far for the structure of the database query functions. So what do
those functions actually do, beyond "interact with the database"? First let me
say that "query" here makes no distinction between read and write operations,
and this makes some sense as the node-pg package makes no such distinction,
rather allowing the programming to use client.query() to execute arbitrary SQL
code, almost as if one were interacting with the SQL command line. Now I can say
that each query function executes the operation described by its function name,
performing as many database operations as it needs to assemble the required
information or perform the desired write, and returns the "raw" results based on
how the requested object (or object being written) was split up by the database.
So for example a company is split into company information, locations, and
review statistics, which is all the information required by the frontend data
model when it asks for a company, but not in the expected format. The query
functions get all the needed data but do not process it.

Processing the data into a SimpleSchema-compatible format is what the
aptly-named data processing functions do. You can tell which ones are data
processing functions because they 1) are not asynchronous and 2) have names with
the format process[Type]Results. They each take one argument, which is supposed
to be the return value of one of the other functions in their class, and
depending on whether that argument represents one or multiple objects, they
return a single object or array of objects, each of which is a
SimpleSchema-compatible representation of the underlying database entries.

There are a couple of interesting exception cases, namely users.js and votes.js.

users.js has no processUserResults function, because it doesn't need one,
because most user-related functionality is handled by the Meteor.users Mongo
collection. The PostgreSQL users table is designed (at this juncture) to connect
Meteor.users with the user-dependent fields in the other database relations,
so 1) any attempt to produce a correspondence between the users relations and
the users SimpleSchema would be meaningless and 2) it assumes that the
programmer (which so far means Joshua Higginbotham, who wrote all the code in
question as well as this documentation) knows which fields need to be referenced
and so doesn't bother to hold their hand.

votes.js has a processVoteResults function that only handles one particular
case, that of one vote on one thing for one user, because all the other cases
have some oddity that makes results processing unnecessary or undesirable. The
cases where processing is needed are getVoteByPrimaryKey and castVote.
getAllVotes gets only the vote counts for each item, which doesn't correspond to
any SimpleSchema, likewise with getVotesForSubject for a single item.
getVotesByAuthor might be nice to process, but there is a strong chance that it
will never be used as it is understood to be a possible security/privacy breach,
and anyhow its use case can be met by the judicious use of getVoteByPrimaryKey.

This, the connector documentation, and a knowledge of the node-pg documentation,
is what you need to know to understand the "helper classes". You should be able
to read both the model code and have a decent grasp of what the different
functions are doing and how they're being called.

node-pg documentation: https://node-postgres.com/

PostgreSQL documentation: https://www.postgresql.org/docs/manuals/

/_ misc.js _/

This file contains more "pure" helper utility functions that are used in many
different places to smooth out database interactions and data processing. It's
kind of a catch-all file, so don't expect to find a meaningful description here,
but each of its individual functions is properly commented.

/_ node-testing-setup.js _/

This file is my staging area for all the code in this directory, as well as the
connector code. It also contains the functions used to parse JSON objects and
write them to the database (which is helpful for data migration). It is only
ever executed via copy-paste to the node.js REPL, and in that sense is a
"scratchpad" for my code. For more details, see the comments in the file itself.
