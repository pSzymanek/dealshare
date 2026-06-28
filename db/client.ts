import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const fallbackUrl = "mysql://dealshare:dealshare@127.0.0.1:3306/dealshare";
const connectionUrl = process.env.DATABASE_URL ?? fallbackUrl;

const globalForDatabase = globalThis as unknown as {
  dealsharePool?: mysql.Pool;
};

export const pool =
  globalForDatabase.dealsharePool ??
  mysql.createPool({
    uri: connectionUrl,
    connectionLimit: 10,
    timezone: "Z",
    enableKeepAlive: true
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.dealsharePool = pool;
}

export const db = drizzle({ client: pool, schema, mode: "default" });
