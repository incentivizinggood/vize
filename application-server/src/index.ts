import express from "express";
import { ApolloServer, IResolvers } from "apollo-server-express";
import { Pool } from "pg";
import util from "util";

import typeDefs from "src/schema.graphql";
//import { Resolvers } from "generated/resolvers-types";

const pool = new Pool();

const resolvers: any = {
	Query: {
		hello: () => "Hello world!",
		now: () =>
			pool
				.query("SELECT NOW() as now")
				.then(res => res.rows[0].now.toISOString()),
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers: resolvers as IResolvers,
	introspection: true,
	playground: true,
});

const app = express();

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
	res.send({
		message: "hello world",
	});
});

apolloServer.applyMiddleware({ app });

const server = app.listen(PORT, () => {
	console.log("server started at http://localhost:" + PORT);
});

async function gracefulShutdown() {
	console.log("Attempting to shutdown gracefully...");

	// Ensure that the process will exit even if the graceful shutdown fails.
	setTimeout(function() {
		console.error(
			"Could not shutdown gracefully in time, forcefully shutting down."
		);
		// Should we exit with an error code here?
		process.exit();
	}, 10 * 1000);

	await util.promisify(server.close);
	console.log("Closed out remaining connections.");

	await pool.end();
	console.log("DB connection pool has ended.");

	console.log("Graceful shutdown complete.");
	process.exit();
}

process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	gracefulShutdown();
});

process.on("SIGINT", () => {
	console.info("SIGINT signal received.");
	gracefulShutdown();
});
