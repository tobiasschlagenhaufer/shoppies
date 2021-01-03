"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20201228215739 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20201228215739 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('create table "movie_users" ("movie_id" int4 not null, "user_id" int4 not null);');
            this.addSql('alter table "movie_users" add constraint "movie_users_pkey" primary key ("movie_id", "user_id");');
            this.addSql('create table "user_movies" ("user_id" int4 not null, "movie_id" int4 not null);');
            this.addSql('alter table "user_movies" add constraint "user_movies_pkey" primary key ("user_id", "movie_id");');
            this.addSql('alter table "movie_users" add constraint "movie_users_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
            this.addSql('alter table "movie_users" add constraint "movie_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
            this.addSql('alter table "user_movies" add constraint "user_movies_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
            this.addSql('alter table "user_movies" add constraint "user_movies_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
            this.addSql('drop table if exists "session" cascade;');
        });
    }
}
exports.Migration20201228215739 = Migration20201228215739;
//# sourceMappingURL=Migration20201228215739.js.map