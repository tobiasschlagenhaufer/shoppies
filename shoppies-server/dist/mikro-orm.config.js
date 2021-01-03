"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("./entities/Movie");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Movie_1.Movie, User_1.User],
    dbName: "shoppies",
    type: "postgresql",
    user: "postgres",
    password: "postgres",
    debug: process.env.NODE_ENV !== "production"
};
//# sourceMappingURL=mikro-orm.config.js.map