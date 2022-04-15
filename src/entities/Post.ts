import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field()
  @Property({ type: "text" })
  title!: string;

  @Field(() => String)
  @Property({ type: "date", default: `NOW()` })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => `NOW()` })
  updatedAt = new Date();
}
