import "reflect-metadata";
import "dotenv-safe/config"
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

	// set a proxy so dokku handles our cookies & sessions
	app.set('proxy', 1);

	// use cors my own cors instead of built in
	app.use(cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	}));

	// express session cookies (postgres)
	app.use(session({
		name: "qid",
		store: new pgSession({
			conString: process.env.DATABASE_URL
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		cookie: { 
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			httpOnly: process.env.NODE_ENV === "production",
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax"
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
	app.listen(parseInt(process.env.PORT), () => {
		// console.log("Server started on port 4000")
	})
}

main()