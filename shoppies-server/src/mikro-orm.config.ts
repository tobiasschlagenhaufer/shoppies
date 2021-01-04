import { Movie } from "./entities/Movie";
import "dotenv-safe/config"
import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Movie, User],
	type: "postgresql",
	clientUrl: process.env.DATABASE_URL,
	debug: process.env.NODE_ENV !== "production"
} as Parameters<typeof MikroORM.init>[0];