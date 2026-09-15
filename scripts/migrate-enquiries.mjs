import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

const name = "001_enquiries.sql";
const source = await readFile(new URL(`../db/migrations/${name}`, import.meta.url), "utf8");
const checksum = createHash("sha256").update(source).digest("hex");
if (!process.argv.includes("--apply")) {
  console.log(`Prepared ${name} (${checksum}). Set the intended DATABASE_URL and pass --apply to migrate it.`);
  process.exit(0);
}
if (!process.env.DATABASE_URL?.trim()) {
  console.error("DATABASE_URL is required. Select the intended environment explicitly.");
  process.exit(1);
}
try {
  const sql = neon(process.env.DATABASE_URL);
  const options = { fetchOptions: { signal: AbortSignal.timeout(30_000) } };
  await sql.query(`CREATE TABLE IF NOT EXISTS metalbase_schema_migrations
    (name text PRIMARY KEY, checksum char(64) NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())`, [], options);
  const existing = await sql.query("SELECT checksum FROM metalbase_schema_migrations WHERE name = $1", [name], options);
  if (existing.length) {
    if (existing[0].checksum !== checksum) throw new Error("checksum mismatch");
    console.log(`${name} is already applied with the expected checksum.`);
  } else {
    // This migration contains only simple DDL: no dollar-quoted functions or
    // string literals containing statement separators.
    const statements = source.replace(/--[^\n]*/g, "").split(";").map(s => s.trim()).filter(Boolean);
    await sql.transaction([
      sql.query("SELECT pg_advisory_xact_lock(638471202)"),
      ...statements.map(statement => sql.query(statement)),
      sql.query("INSERT INTO metalbase_schema_migrations(name, checksum) VALUES ($1,$2)", [name,checksum]),
    ], { isolationLevel:"ReadCommitted", fetchOptions:{signal:AbortSignal.timeout(30_000)} });
    console.log(`Applied ${name}; no customer data was changed.`);
  }
} catch {
  console.error("Database migration failed. No connection details or SQL parameters are printed. Check access, migration checksum and the selected environment.");
  process.exit(1);
}
