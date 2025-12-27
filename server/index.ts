import { Hono } from "hono";

import users from "./routes/user-routes";
import accounts from "./routes/accounts-routes";
import { logger } from "hono/logger";

const port = process.env.PORT;
const app = new Hono();

app.use(logger());

app.route("/api/v1/users", users);
app.route("/api/v1/accounts", accounts);

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`running on http://localhost:${port}`);
