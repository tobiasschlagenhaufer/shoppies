import { Migration } from '@mikro-orm/migrations';

export class Migration20201231222624 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "movie" add column "poster" varchar(255) not null;');

    this.addSql('drop table if exists "session" cascade;');
  }

}
