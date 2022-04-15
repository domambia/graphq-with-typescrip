import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import MIKRO_CONFIG from "./mikro-orm.config";
import { __prod__ } from "./constants";

import { PostResolver, UserResolver } from "./resolvers";

const main = async () => {
  const orm = await MikroORM.init(MIKRO_CONFIG);

  // automatically run the migrations
  await orm.getMigrator().up();

  const app = express();

  // add middlewares
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  // await for the server to start
  await apolloServer.start();

  // create the graphql server on the express app

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server started on port http://localhost:4000`);
  });

  //   console.log("orm", orm);

  //   const post = orm.em.create(Post, {
  //     createdAt: new Date(),
  //     title: "OMAMBIA THE PROGRAMMER",
  //     updatedAt: new Date(),
  //   });

  //   orm.em.persistAndFlush(post);
  //   console.log(post.title);

  //   const posts = await orm.em.find(Post, {});
  //   console.log(posts);
  //   orm.em.nativeInsert(Post, { title: "Some toel" });
};

main().catch((err) => {
  console.error("Error ---- ", err);
});
