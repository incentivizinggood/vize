import express from "express";
import connectPgSimple from "connect-pg-simple";

import {
	pool,
	testConnection as testPgConnection,
} from "imports/api/connectors/postgresql";

import { applyGraphQLMiddleware } from "./graphql-middleware";
import { applyPassportMiddleware } from "./passport-middleware";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();

app.use(bodyParser.json());

// Warn if the SESSION_SECRET is not given. This is needed to sign the session
// cookies and prevent spoofing.
if (!process.env.SESSION_SECRET) {
	console.error(
		"The environment variable SESSION_SECRET is not set.",
		"The default value will be used. This is insecure."
	);
}

app.use(
	expressSession({
		store: new (connectPgSimple(expressSession))({ pool }),
		secret: process.env.SESSION_SECRET || "keyboard cat",
		resave: false,
		saveUninitialized: false,
		cookie: {
			// Only send session cookies over secured HTTPS.
			secure: true,
			// Do not allow client side scripts to access the session cookie.
			httpOnly: true,
		},
	})
);

applyPassportMiddleware(app);

applyGraphQLMiddleware(app);

// TODO: When we stop using Meteor, `app` will be the main server.
//       We will need to call app.listen to start the server.

function onServerReady() {
	console.log("Server ready.");
	testPgConnection();
}

export { app, onServerReady };
