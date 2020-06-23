import express from "express";

import { router as apiRouter } from "src/routes/api";
import { router as webAppRouter } from "src/routes/web-app";

const { PORT = 3001 } = process.env;

const app = express();

app.use("/api", apiRouter);

app.use(webAppRouter);

app.listen(PORT, () => {
	console.log(`server started at on port ${PORT}`);
});
