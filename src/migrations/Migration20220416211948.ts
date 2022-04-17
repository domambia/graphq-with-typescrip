import { Migration } from '@mikro-orm/migrations';

export class Migration20220416211948 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `title` text not null, `created_at` datetime null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `user` add `created_at` datetime not null, add `updated_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `post`;');

    this.addSql('alter table `user` drop `created_at`;');
    this.addSql('alter table `user` drop `updated_at`;');
  }

}
