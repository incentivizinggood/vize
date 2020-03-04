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
		<form action="/login" method="post">
			<div>
				<label>Username:</label>
				<input type="text" name="username"/>
			</div>
			<div>
				<label>Password:</label>
				<input type="password" name="password"/>
			</div>
			<div>
				<input type="submit" value="Log In"/>
			</div>
		</form>
	</body>
</html>
`
		);
	});
}
