import { Express } from "express";

export function applyHelloWorldMiddleware(app: Express) {
	// A hello world for testing the Express server.
	app.get("/express-test", function(_req, res) {
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
}
