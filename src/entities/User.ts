import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string;

  @Property()
  password!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "date", onCreate: () => Date.now() })
  createdAt = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: "date", onUpdate: () => Date.now() })
  updatedAt = new Date();
}
