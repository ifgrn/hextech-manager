import type { Context } from "hono";
import { hash_password, verify_password } from "../utils/hash-password";
import { validationSignUp } from "../helpers/validations";
import { deleteCookie, setSessionCookie } from "../utils/jwt-cookies";
import { db } from "../db/turso-db";

type CreatedUser = {
  id: string;
};

type LoginRow = {
  id: string;
  password_hash: string;
  username: string;
};

export const signup = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json({ success: false, error: "Faltan campos requeridos" }, 400);
    }

    const isValid = validationSignUp(username, email, password);

    if (!isValid.valid) return c.json({ success: false, error: isValid.error });

    const password_hashed = await hash_password(password);

    const stmt = await db.execute({
      sql: `
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
      RETURNING id
    `,
      args: [username, email, password_hashed],
    });

    const user = stmt.rows[0] as CreatedUser | undefined;

    if (!user) {
      return c.json({ success: false, error: "Error al crear usuario" }, 500);
    }

    await setSessionCookie(c, user.id);

    return c.json({ success: true, message: "Usuario creado exitosamente" }, 201);
  } catch (error: any) {
    console.error("Error en registro:", error);

    if (error.message?.includes("UNIQUE constraint failed: users.username")) {
      return c.json({ success: false, error: "El nombre de usuario ya existe" }, 409);
    }
    if (error.message?.includes("UNIQUE constraint failed: users.email")) {
      return c.json({ success: false, error: "El email ya está registrado" }, 409);
    }

    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const stmt = await db.execute(`
      SELECT id, username, email, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    const users = stmt.rows;

    return c.json({ success: true, data: users }, 200);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const login = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ success: false, error: "Ambos campos son necesarios" }, 400);
    }

    const stmt = await db.execute({
      sql: `
        SELECT id, password_hash, username
        FROM users
        WHERE username = ?
      `,
      args: [username],
    });

    const user = stmt.rows[0] as LoginRow | undefined;

    if (!user) {
      return c.json({ success: false, error: "Credenciales inválidas" }, 401);
    }

    const verified = await verify_password(password, user.password_hash);
    if (!verified) {
      return c.json({ success: false, error: "Credenciales inválidas" }, 401);
    }

    await setSessionCookie(c, user.id);

    return c.json(
      {
        success: true,
        message: "Inicio de sesión exitoso",
        user: { id: user.id, username: user.username },
      },
      200,
    );
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const logout = async (c: Context) => {
  try {
    await deleteCookie(c);

    return c.json({ success: true, message: "Sesión cerrada exitosamente" }, 200);
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const getCurrentUser = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ success: false, error: "No autenticado" }, 401);
    }

    const stmt = await db.execute({
      sql: `
        SELECT id, username, email, created_at
        FROM users
        WHERE id = ?
      `,
      args: [userId],
    });

    const user = stmt.rows;

    if (!user) {
      return c.json({ success: false, error: "Usuario no encontrado" }, 404);
    }

    return c.json({ success: true, data: user }, 200);
  } catch (error) {
    console.error("Get current user error:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};
