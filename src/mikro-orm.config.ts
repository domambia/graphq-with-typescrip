import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities";

export default {
  dbName: "graphqltypescript",
  user: "root",
  password: "root",
  debug: __prod__,
  type: "mariadb",
  allowGlobalContext: true,
  entities: [Post],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pathTs: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
