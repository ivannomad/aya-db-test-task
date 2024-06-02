import Database from "better-sqlite3";
import fs from "fs";
import knexfile from "./knexfile.js";
import knex from "knex";

export const client = knex(knexfile.development)

async function intiDb() {
  try {
    console.log('Beginning database initialization...');
    const db = new Database('src/db/database.db');
    const schema = fs.readFileSync('src/db/scripts/createSchema.sql', 'utf-8');
    db.exec(schema);
    console.log('Database initialization done');
  } catch (err) {
    console.error(err.message);
  }
}

await intiDb();
