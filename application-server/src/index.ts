import util from "util";

import { app, onServerReady } from "src/http";
import { pool } from "src/connectors/postgresql";
import express = require("express");

const { PORT = 3001 } = process.env;

const app2 = express();

app2.use("/api", app);

const server = app2.listen(PORT, () => {
	console.log("server started at http://localhost:" + PORT);
	onServerReady();
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
