import type { Context } from "hono";
import { db } from "../db/db";
import { hash_password, verify_password } from "../utils/hash-password";
import { setCookie } from "hono/cookie";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../helpers/validations";
import { setSessionCookie } from "../utils/jwt-cookies";

type UserRow = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
};

type UserResponse = Omit<UserRow, "password_hash">;

type LoginRow = {
  id: string;
  password_hash: string;
};

const COOKIE_OPTIONS = {
  path: "/",
  secure: Bun.env.MODE === "production",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 7 días
  sameSite: "Strict" as const,
};

export const createUser = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json({ success: false, error: "Faltan campos requeridos" }, 400);
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      return c.json({ success: false, error: usernameValidation.error }, 400);
    }

    if (!validateEmail(email)) {
      return c.json({ success: false, error: "Email inválido" }, 400);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return c.json({ success: false, error: passwordValidation.error }, 400);
    }

    const password_hashed = await hash_password(password);

    const stmt = db.prepare<UserResponse, [string, string, string]>(`
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
      RETURNING id, username, email, created_at
    `);

    const user = stmt.get(username, email, password_hashed);

    if (!user) {
      return c.json({ success: false, error: "Error al crear usuario" }, 500);
    }

    await setSessionCookie(c, user.id);

    return c.json(
      { success: true, message: "Usuario creado exitosamente" },
      201,
    );
  } catch (error: any) {
    console.error("Error en registro:", error);

    if (error.message?.includes("UNIQUE constraint failed: users.username")) {
      return c.json(
        { success: false, error: "El nombre de usuario ya existe" },
        409,
      );
    }
    if (error.message?.includes("UNIQUE constraint failed: users.email")) {
      return c.json(
        { success: false, error: "El email ya está registrado" },
        409,
      );
    }

    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const stmt = db.prepare<UserResponse, []>(`
      SELECT id, username, email, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    const users = stmt.all();

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
      return c.json(
        { success: false, error: "Ambos campos son necesarios" },
        400,
      );
    }

    const row = db
      .prepare<LoginRow, [string]>(
        `
        SELECT id, password_hash
        FROM users
        WHERE username = ?
      `,
      )
      .get(username);

    if (!row) {
      return c.json({ success: false, error: "Credenciales inválidas" }, 401);
    }

    const verified = await verify_password(password, row.password_hash);
    if (!verified) {
      return c.json({ success: false, error: "Credenciales inválidas" }, 401);
    }

    await setSessionCookie(c, row.id);

    return c.json({ success: true, message: "Inicio de sesión exitoso" }, 200);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};

export const logout = async (c: Context) => {
  try {
    setCookie(c, "session", "", {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    });

    return c.json(
      { success: true, message: "Sesión cerrada exitosamente" },
      200,
    );
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

    const user = db
      .prepare<UserResponse, [string]>(
        `
        SELECT id, username, email, created_at
        FROM users
        WHERE id = ?
      `,
      )
      .get(userId);

    if (!user) {
      return c.json({ success: false, error: "Usuario no encontrado" }, 404);
    }

    return c.json({ success: true, data: user }, 200);
  } catch (error) {
    console.error("Get current user error:", error);
    return c.json({ success: false, error: "Error interno del servidor" }, 500);
  }
};
