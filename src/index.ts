import { MikroORM } from "@mikro-orm/core";
import MIKRO_CONFIG from "./mikro-orm.config";
import { __prod__ } from "./constants";
import { Post } from "./entities";

const main = async () => {
  const orm = await MikroORM.init(MIKRO_CONFIG);

  // automatically run the migrations
  await orm.getMigrator().up();

  //   console.log("orm", orm);

  //   const post = orm.em.create(Post, {
  //     createdAt: new Date(),
  //     title: "Some other title is here",
  //     updatedAt: new Date(),
  //   });

  //   orm.em.persistAndFlush(post);
  //   console.log(post.title);
  //   orm.em.nativeInsert(Post, { title: "Some toel" });
};

main().catch((err) => {
  console.error("Error ---- ", err);
});
