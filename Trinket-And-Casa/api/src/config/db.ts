import { PoolConfig } from "pg";
export function configDb() {
  const dbConfig: PoolConfig = {
    connectionString: process.env.POSTGRES_URL,
    ssl: false,
  };
  return dbConfig;
}
