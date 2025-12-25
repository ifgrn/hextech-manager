import type { Context } from "hono";
import { db } from "../db/db";
import { hash_password } from "../utils/hash-password";
import { sign_token } from "../utils/jwt-sign";
import { setCookie } from "hono/cookie";

export const createUser = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json({ success: false, error: "Faltan campos requeridos" }, 400);
    }

    const password_hashed = await hash_password(password);

    const stmt = db.prepare(`
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
            RETURNING id, username, email, created_at
        `);

    const user = stmt.get(username, email, password_hashed);
    const id = user.id;
    console.log(id);
    const token = await sign_token(id);

    setCookie(c, "session", token, {
      path: "/",
      secure: Bun.env.MOD === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });

    return c.json({ success: true, data: user }, 201);
  } catch (error: any) {
    console.error("Error en registro:", error);

    if (error.message.includes("UNIQUE constraint failed")) {
      return c.json({ success: false, error: "Usuario o email ya existe" }, 409);
    }

    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const stmt = db.prepare(`SELECT id, username, email, created_at FROM users`);

    const users = stmt.all();
    return c.json({ success: true, data: users }, 201);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};
