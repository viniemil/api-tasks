import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const rootDir = process.env.NODE_ENV === "production" ? "dist" : "src";

const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [rootDir + "/dataBase/entities/*"],
};

export default config;
