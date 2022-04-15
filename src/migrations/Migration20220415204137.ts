import { Migration } from '@mikro-orm/migrations';

export class Migration20220415204137 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `created_at` json not null, `updated_at` json not null) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `post`;');
  }

}
