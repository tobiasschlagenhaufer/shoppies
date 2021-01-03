import { Migration } from '@mikro-orm/migrations';

export class Migration20201228225330 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE "session" ("sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE);');
    this.addSql('ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;')
    this.addSql('CREATE INDEX "IDX_session_expire" ON "session" ("expire");')
  }

}
