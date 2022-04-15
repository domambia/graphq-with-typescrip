import argon2 from "argon2";
import { User } from "./../entities";
import { MyContext } from "src/types";
import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
} from "type-graphql";

@InputType()
class UserLoginInput {
  @Field()
  password!: string;
  @Field()
  username!: string;
}

@InputType()
class UserRegisterInput {
  @Field()
  email!: string;
  @Field()
  username!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { em }: MyContext): Promise<User> | null {
    console.log(em);
    return null;
  }

  @Mutation(() => User)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const useExists = await em.findOne(User, {
      $or: [{ username: options.username, email: options.email }],
    });
    if (useExists) {
      console.log("User already exists");
      return null;
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      email: options.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("options") options: UserLoginInput,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const userExists = await em.findOne(User, {
      username: options.username,
    });

    if (!userExists) {
      console.log("User not found");
      return null;
    }

    const valid = await argon2.verify(userExists.password, options.password);

    if (!valid) {
      console.log(`Wrong password or username`);
      return null;
    }

    return userExists;
  }
}
