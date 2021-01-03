import { Migration } from '@mikro-orm/migrations';

export class Migration20201224211431 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie" ("id" serial primary key, "imdb_id" varchar(255) not null, "title" varchar(255) not null, "year" int4 not null);');
  }

}
