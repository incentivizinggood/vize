import * as express from "express";

import { testConnection as testPgConnection } from "imports/api/connectors/postgresql";

import { applyGraphQLMiddleware } from "./graphql-middleware";
import { applyHelloWorldMiddleware } from "./hello-world-middleware";

const app = express();

applyHelloWorldMiddleware(app);
applyGraphQLMiddleware(app);

// TODO: When we stop using Meteor, `app` will be the main server.
//       We will need to call app.listen to start the server.

function onServerReady() {
	console.log("Server ready.");
	testPgConnection();
}

export { app, onServerReady };
