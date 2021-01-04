import { Migration } from '@mikro-orm/migrations';

export class Migration20210104020313 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "session" cascade;');
  }

}
