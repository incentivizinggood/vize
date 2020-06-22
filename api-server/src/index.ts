import util from "util";

import { app, onServerReady } from "src/http";
import { pool } from "src/connectors/postgresql";
import express = require("express");
import path = require("path");

const { PORT = 3001 } = process.env;

const app2 = express();

app2.use("/api", app);

/** Absolute path to the static files of the web app. */
const staticRoot = path.resolve(__dirname, "../../web-app/dist");

// Serve the web app from the api server. This is done so that the whole app
// can be run as a single Dyno on Heroku. Normally api-server and web-app should
// be separate things.
app2.use(express.static(staticRoot));

// Because the web app is a "single page app" that also uses routing,
// we need to make sure the index page is served instead of giving 404 errors.
const fallbackToIndex: express.RequestHandler = function(req, res, next) {
	res.sendFile(path.join(staticRoot, "index.html"));
};

app2.use(fallbackToIndex);

const server = app2.listen(PORT, () => {
	console.log(
		`server started at ${process.env.ROOT_URL ||
			"http://localhost"}:${PORT}`
	);
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
