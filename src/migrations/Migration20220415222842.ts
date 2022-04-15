import { Migration } from '@mikro-orm/migrations';

export class Migration20220415222842 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `email` text not null, `username` text not null, `password` varchar(255) not null, `created_at` datetime not null default \'NOW()\', `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
    this.addSql('alter table `user` add unique `user_username_unique`(`username`);');

    this.addSql('alter table `post` modify `created_at` datetime not null default \'NOW()\';');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `user`;');

    this.addSql('alter table `post` modify `created_at` datetime not null;');
  }

}
