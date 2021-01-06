import { Migration } from '@mikro-orm/migrations';

export class Migration20210104221113 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "movie" ("id" serial primary key, "imdb_id" varchar(255) not null, "title" varchar(255) not null, "year" int4 not null, "poster" varchar(255) not null);');

    this.addSql('create table "movie_users" ("movie_id" int4 not null, "user_id" int4 not null);');
    this.addSql('alter table "movie_users" add constraint "movie_users_pkey" primary key ("movie_id", "user_id");');

    this.addSql('create table "user_movies" ("user_id" int4 not null, "movie_id" int4 not null);');
    this.addSql('alter table "user_movies" add constraint "user_movies_pkey" primary key ("user_id", "movie_id");');

    this.addSql('alter table "movie_users" add constraint "movie_users_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "movie_users" add constraint "movie_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_movies" add constraint "user_movies_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_movies" add constraint "user_movies_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;');
  }

}
