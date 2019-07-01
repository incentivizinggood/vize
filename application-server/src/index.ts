import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { Pool } from "pg";

import * as typeDefs from "./schema.graphql";

const pool = new Pool();

const resolvers = {
	Query: {
		hello: () => "Hello world!",
		now: () =>
			pool
				.query("SELECT NOW() as now")
				.then(res => res.rows[0].now.toISOString()),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
});

const app = express();

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
	res.send({
		message: "hello world",
	});
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.log("server started at http://localhost:" + PORT);
});
