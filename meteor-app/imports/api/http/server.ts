import express from "express";
import connectPgSimple from "connect-pg-simple";

import { testConnection as testPgConnection } from "imports/api/connectors/postgresql";

import { applyGraphQLMiddleware } from "./graphql-middleware";
import { applyHelloWorldMiddleware } from "./hello-world-middleware";
import { applyPassportMiddleware } from "./passport-middleware";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
	testPgConnection();
}

export { app, onServerReady };
