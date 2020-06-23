import express from "express";
import path from "path";

export const router = express.Router();

/** Absolute path to the static files of the web app. */
const staticRoot = path.resolve(__dirname, "../../web-app/dist");

// Serve the web app from the api server. This is done so that the whole app
// can be run as a single Dyno on Heroku. Normally api-server and web-app should
// be separate things.
router.use(express.static(staticRoot));

// Because the web app is a "single page app" that also uses routing,
// we need to make sure the index page is served instead of giving 404 errors.
const fallbackToIndex: express.RequestHandler = function(req, res, next) {
	res.sendFile(path.join(staticRoot, "index.html"));
};

router.use(fallbackToIndex);
