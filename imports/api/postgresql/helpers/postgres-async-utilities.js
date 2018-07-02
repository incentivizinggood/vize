// Justification for this file and associated
// functions and classes:
// node-pg relies on asynchronous functions,
// and I have found that the easiest way to use them
// is through async/await. However, this requires functions
// to be declared async, and it seems easier to
// create a container class where all the functions
// can be async rather than trying to shoehorn
// that behavior into the existing GraphQL model code,
// especially since Meteor tends to be unpredictable
// about how it executes such code.
// Moreover, it keeps all the node-pg connection management
// code in one place, which make it much easier both
// to debug and to add features to.

const { Pool } = require("pg");

const pool = new Pool();

const closeAndExit = function() {
	pool.end();
	process.exit();
};

process.on("SIGTERM", closeAndExit());
process.on("SIGINT", closeAndExit());

export default class PosgresAsyncUtilities {
	// temporary example of syntax
	static async asdf() {}
}
