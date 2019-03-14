import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import { getUser } from "meteor/apollo";

import { typeDefs, resolvers } from "./graphql";
import { testConnection as testPgConnection } from "./connectors/postgresql-old";

const app = express();

// A hello world for testing the Express server.
app.get("/express-test", function(req, res) {
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

// Setup the GraphQL API endpoint.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => ({
		// Get the user using a token in the headers. Will be changed when
		// switching away from Meteor's authorization framework.
		user: await getUser(req.headers.authorization),
	}),
});

server.applyMiddleware({
	app,
	path: "/graphql",
});

app.use("/graphql", (req, res) => {
	if (req.method === "GET") {
		res.end();
	}
});

// TODO: When we stop using Meteor, `app` will be the main server.
//       We will need to call app.listen to start the server.

function onServerReady() {
	console.log("Server ready.");
	testPgConnection();
}

export { app, onServerReady };
