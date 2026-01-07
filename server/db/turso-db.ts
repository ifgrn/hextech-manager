import { createClient } from "@libsql/client";

const db = createClient({
  url: Bun.env.TURSO_URL ?? "file:local.db",
  authToken: Bun.env.TURSO_TOKEN,
});

export { db };
