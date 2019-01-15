import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import express from "express";

// Initialize GraphQL
import "../imports/startup/server/graphql.js";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";
import "../imports/api/data/votes.js";
import "../imports/api/data/methods.js";

// Try to keep the connection pool initialized
import { testConnection as testPgConnection } from "../imports/api/graphql/connectors/postgresql.js";

const myExpressServer = express();

myExpressServer.get("/express-test", function(req, res) {
	res.send(
		`<!DOCTYPE html>
<html>
	<head>
		<title>Hello from Express</title>
	</head>
	<body>
		<h1>Hello world!</h1>
		<p>The Express server seems to be working.</p>
	</body>
</html>
`
	);
});

// install the express server within meteor webapp connect
WebApp.rawConnectHandlers.use(myExpressServer);

Meteor.startup(() => {
	testPgConnection();
});
