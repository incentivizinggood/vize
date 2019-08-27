import express from "express";

import { testConnection as testPgConnection } from "imports/api/connectors/postgresql";
import { testConnection as testMongoConnection } from "imports/api/connectors/mongodb";

import { applyGraphQLMiddleware } from "./graphql-middleware";
import { applyHelloWorldMiddleware } from "./hello-world-middleware";
import { applyPassportMiddleware } from "./passport-middleware";
import morgan from "morgan";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	expressSession({
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
