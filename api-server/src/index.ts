import express from "express";
import helmet from "helmet";

import { router as apiRouter } from "src/routes/api";
import { router as webAppRouter } from "src/routes/web-app";

const { PORT = 3001 } = process.env;

const app = express();

// Trust the first proxy. This is needed so that secure cookies will be sent
// even though this server does not have use TLS/SSL itself.
app.set("trust proxy", 1);

// Force the app to use https instead of http in production.
if (process.env.NODE_ENV === "production") {
	app.use(function(req, res) {
		if (!req.secure) {
			res.redirect(301, `https://${req.hostname}/${req.originalUrl}`);
		}
	});
}

app.use(helmet());

app.use("/api", apiRouter);

app.use(webAppRouter);

app.listen(PORT, () => {
	console.log(`server started at on port ${PORT}`);
});
