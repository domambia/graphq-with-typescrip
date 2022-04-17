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
  ObjectType,
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

@ObjectType()
class FieldError {
  @Field(() => String) message: string;
  field: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { em }: MyContext): Promise<User> | null {
    console.log(em);
    return null;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length < 3) {
      return {
        errors: [
          {
            message: "Username must be at least 3 characters long",
            field: "username",
          },
        ],
      };
    }
    const userExist = await em.findOne(User, {
      $or: [{ username: options.username, email: options.email }],
    });

    if (userExist) {
      return {
        errors: [
          {
            message: "Please use other credentials",
            field: "username, email & password",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      email: options.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      return {
        errors: [
          {
            message: "Your account was not cread. Use different account",
            field: "username  & password",
          },
        ],
      };
    }

    if (!user) {
      return {
        errors: [
          {
            message: "Your account was not cread.",
            field: "username  & password",
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg("options") options: UserLoginInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const userExists = await em.findOne(User, {
      username: options.username,
    });

    if (!userExists) {
      return {
        errors: [
          {
            message: "User with  credentials does not exist",
            field: "username",
          },
        ],
      };
    }

    const valid = await argon2.verify(userExists.password, options.password);

    if (!valid) {
      console.log(`Wrong password or username`);
      return {
        errors: [
          {
            message: "User with  credentials does not exist",
            field: "username",
          },
        ],
      };
    }

    return { user: userExists };
  }
}
