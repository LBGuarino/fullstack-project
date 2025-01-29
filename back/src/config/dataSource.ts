import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  // dropSchema: true,
  logging: true,
  entities: [isProd ? "dist/entities/*.js" : "src/entities/*.ts"],
  migrations: [isProd ? "dist/migration/*.js" : "src/migration/*.ts"],
  subscribers: [],
});
