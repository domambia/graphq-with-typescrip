import { Migration } from '@mikro-orm/migrations';

export class Migration20220415204411 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` modify `title` text not null, modify `created_at` datetime not null, modify `updated_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` modify `title` varchar(255) not null, modify `created_at` json not null, modify `updated_at` json not null;');
  }

}
