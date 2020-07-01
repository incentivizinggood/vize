import express from "express";

import { pool } from "src/connectors/postgresql";

import { router as graphqlRouter } from "./graphql";
import { router as passportRouter } from "./passport";
import bodyParser from "body-parser";

export const router = express.Router();

router.use(bodyParser.json());

router.use(passportRouter);

router.use(graphqlRouter);

// Check the heath of this server and test its ability to function.
router.use("/health-check", async function(_req, res, _next) {
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
