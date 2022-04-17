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

  @Field(() => String, { nullable: true })
  @Property({ type: "date", onCreate: () => Date.now(), nullable: true })
  createdAt = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: "date", onUpdate: () => Date.now(), nullable: true })
  updatedAt = new Date();
}
