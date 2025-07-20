
import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config()
const { Pool } = pkg;

export const db = new Pool({
   host:  "localhost",
  user:  "postgres", 
  password: process.env.DB_PASSWORD, 
  database: "blog_db",
  port: 5432, 
});

db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err));
