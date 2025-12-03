// src/server/config/config.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  env: process.env.NODE_ENV,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "SUPER_SECRET_KEY_DEV_ONLY",
    accessExpirationMinutes: parseInt(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES ?? "60",
      10
    ),
    refreshExpirationDays: parseInt(
      process.env.JWT_REFRESH_EXPIRATION_DAYS ?? "30",
      10
    ),
  },
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};

export default config;
