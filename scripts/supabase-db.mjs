import nextEnv from "@next/env";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function ensureMigrationsTable() {
  await client.query(`
    create table if not exists public.schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )
  `);
}

async function checkConnection() {
  const result = await client.query("select current_database() as database, now() as checked_at");
  console.log(`Supabase database connection succeeded at ${result.rows[0].checked_at.toISOString()}.`);

  const counts = await client.query(`
    select 'bag_types' as resource, count(*)::int as count from public.bag_types
    union all
    select 'base_models', count(*)::int from public.base_models
    union all
    select 'materials', count(*)::int from public.materials
    union all
    select 'colors', count(*)::int from public.colors
    union all
    select 'ready_products', count(*)::int from public.ready_products
    union all
    select 'storage_buckets', count(*)::int from storage.buckets
    order by resource
  `);

  for (const row of counts.rows) {
    console.log(`${row.resource}: ${row.count}`);
  }
}

async function migrate() {
  await ensureMigrationsTable();
  const directory = resolve("supabase", "migrations");
  const files = (await readdir(directory)).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    const applied = await client.query(
      "select 1 from public.schema_migrations where name = $1",
      [file]
    );
    if (applied.rowCount) {
      console.log(`Skipped ${file} (already applied).`);
      continue;
    }

    const sql = await readFile(resolve(directory, file), "utf8");
    await client.query(sql);
    await client.query("insert into public.schema_migrations (name) values ($1)", [file]);
    console.log(`Applied ${file}.`);
  }
}

async function seed() {
  const sql = await readFile(resolve("supabase", "seed.sql"), "utf8");
  await client.query(sql);
  console.log("Seed data applied.");
}

const command = process.argv[2] ?? "check";

try {
  await client.connect();
  if (command === "check") await checkConnection();
  else if (command === "migrate") await migrate();
  else if (command === "seed") await seed();
  else throw new Error(`Unknown database command: ${command}`);
} finally {
  await client.end();
}
