import { MyContext } from "src/types";
import { Ctx, Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities";
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() { em }: MyContext,
    @Arg("title", () => String) title: string
  ): Promise<Post> {
    const post = em.create(Post, {
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // persist and flush
    await em.persistAndFlush(post);

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if (typeof title !== undefined) {
      post.title = title;

      await em.persistAndFlush(post);
      return post;
    }

    return null;
  }

  @Mutation(() => Boolean)
  async deletePost(@Ctx() { em }: MyContext, @Arg("id", () => Int) id: number) {
    try {
      await em.nativeDelete(Post, { id });
      return true;
    } catch (error) {
      console.log(`Error: `, error);
      return false;
    }

    return false;
  }
}
