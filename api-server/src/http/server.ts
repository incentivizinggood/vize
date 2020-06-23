import express from "express";
import connectPgSimple from "connect-pg-simple";

import { pool } from "src/connectors/postgresql";

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
			// Do not allow client side scripts to access the session cookie.
			httpOnly: true,
		},
	})
);

applyPassportMiddleware(app);

applyGraphQLMiddleware(app);

// Check the heath of this server and test its ability to function.
app.use("/health-check", async function(req, res, next) {
	const report: any = {};
	let noFailures = true;

	// Check that this server can connect to and query the database.
	try {
		await pool.query("SELECT NOW() as now");
		report.postgres = { status: "ok" };
	} catch (error) {
		report.postgres = { status: "failing", error };
		noFailures = false;
	}

	// Add extra info about this server.
	report.uptime = process.uptime();

	res.status(noFailures ? 200 : 503).json(report);
});

export { app };
