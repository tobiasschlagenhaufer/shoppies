import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { MovieResolver } from "./resolvers/movie";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import cors from "cors";

const pgSession = require('connect-pg-simple')(session);

const main = async () => {
	// initialize our microorm and connect to database
	const orm = await MikroORM.init(microConfig);
	// update to the latest migration
	await orm.getMigrator().up();

	const app = express();

	// use cors my own cors instead of built in
	app.use(cors({
		origin: "http://localhost:3000",
		credentials: true,
	}));

	// express session cookies (postgres)
	app.use(session({
		name: "qid",
		store: new pgSession({
			conString: "postgresql://postgres:postgres@127.0.0.1:5432/shoppies"
		}),
		secret: "efjsnkjhfejkfxczsfqwdpl",
		resave: false,
		cookie: { 
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: process.env.NODE_ENV === "production",
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict"
		},
		saveUninitialized: false
	}));

	// create apollo server, which will render our graphql resolvers
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [MovieResolver, UserResolver],        // list of our graphql resolvers
			validate: false                    // don't use built in validator... personal preference
		}),
		context: ({ req, res }) => ({ em: orm.em, req, res })
	});

	// connect apollo server to express middleware
	apolloServer.applyMiddleware({ 
		app, 
		cors: false 
	});
	
	// start server
	app.listen(4000, () => {
		console.log("Server started on port 4000")
	})
}

main()