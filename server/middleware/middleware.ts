import type { Context } from "hono";
import { getCookie } from "hono/cookie";

const middleware = (c: Context, next: any) => {
  const token = getCookie(c, "token");

  if (!token) return c.json({ succcess: false, message: "No estás autorizado" }, 401);

  next();
};
