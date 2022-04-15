import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User {
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

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
