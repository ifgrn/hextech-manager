import { Hono } from "hono";

import users from "./routes/user-routes";
import accounts from "./routes/accounts-routes";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const port = process.env.PORT;
const app = new Hono();

app.use(logger());

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.route("/api/v1/users", users);
app.route("/api/v1/accounts", accounts);

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`running on http://localhost:${port}`);
