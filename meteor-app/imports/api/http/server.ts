import express from "express";
import connectPgSimple from "connect-pg-simple";

import { testConnection as testPgConnection } from "imports/api/connectors/postgresql";
import { testConnection as testMongoConnection } from "imports/api/connectors/mongodb";

import { applyGraphQLMiddleware } from "./graphql-middleware";
import { applyHelloWorldMiddleware } from "./hello-world-middleware";
import { applyPassportMiddleware } from "./passport-middleware";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// I don't know what this does, but I think it's needed for passport.js to work.
app.use(
	expressSession({
		store: new (connectPgSimple(expressSession))(),
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
	})
);

applyPassportMiddleware(app);
applyHelloWorldMiddleware(app);
applyGraphQLMiddleware(app);

// TODO: When we stop using Meteor, `app` will be the main server.
//       We will need to call app.listen to start the server.

function onServerReady() {
	console.log("Server ready.");
	testMongoConnection();
	testPgConnection();
}

export { app, onServerReady };
