import express from "express";

const app = express();

app.get("/express-test", function(req, res) {
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

// TODO: When we stop using Meteor, `app` will be the main server.
//       We will need to call app.listen to start the server.
export default app;
