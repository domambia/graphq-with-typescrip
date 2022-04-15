import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: "text" })
  title!: string;

  @Property({ type: "date", default: Date.now() })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}