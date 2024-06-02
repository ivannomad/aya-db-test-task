import Database from "better-sqlite3";
import fs from "fs";
import knexfile from "./knexfile.js";
import knex from "knex";

export const client = knex(knexfile.development)

async function dropDb() {
  try {
    console.log('Beginning database drop...');
    const db = new Database('src/db/database.db');
    const script = fs.readFileSync('src/db/scripts/dropSchema.sql', 'utf-8');
    db.exec(script);
    console.log('Database drop complete');
  } catch (err) {
    console.error(err);
  }
}

await dropDb();
