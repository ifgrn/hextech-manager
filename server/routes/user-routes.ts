import { Hono } from "hono";

const users = new Hono();

users.get("/", (c) => {
  return c.json({ message: "Lista de usuarios" });
});

users.post("/register", async (c) => {
  const { username, email, password } = await c.req.json();
  const user = {
    username,
    email,
    password,
  };
  return c.json(user);
});

export default users;
