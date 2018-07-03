/*
	Justification for this directory and associated
	files, functions, and classes:

	node-pg relies on asynchronous functions,
	and I have found that the easiest way to use them
	is through async/await. However, this requires functions
	to be declared async, and it seems easier to
	create a container class where all the functions
	can be async rather than trying to shoehorn
	that behavior into the existing GraphQL model code,
	especially as I'm not sure how Meteor and Apollo
	would handle such code.

	Moreover, it keeps all the node-pg connection management
	code in one place, which make it much easier both to
	debug and to add features to, and isolates it for testing.

	Models can now worry solely about taking the results
	and packaging them into whatever the schema expects,
	and these classes only worry about querying the database.
*/

const { Pool } = require("pg");

const pool = new Pool();

const closeAndExit = function() {
	pool.end();
	process.exit();
};

// process.on("SIGTERM", closeAndExit());
// process.on("SIGINT", closeAndExit());

export default pool;
