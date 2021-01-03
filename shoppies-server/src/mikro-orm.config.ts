import { Movie } from "./entities/Movie";
import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Movie, User],
	dbName: "shoppies",
	type: "postgresql",
	user: "postgres",
	password: "postgres",
	debug: process.env.NODE_ENV !== "production"
} as Parameters<typeof MikroORM.init>[0];