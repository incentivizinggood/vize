import * as express from "express";

const app = express();

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
	res.send({
		message: "hello world",
	});
});

app.listen(PORT, () => {
	console.log("server started at http://localhost:" + PORT);
});
