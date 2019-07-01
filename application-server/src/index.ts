import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import * as typeDefs from "./schema.graphql";

const resolvers = {
	Query: {
		hello: () => "Hello world!",
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
