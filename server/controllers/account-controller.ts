import type { Context } from "hono";
import type { Account } from "../types/types-d";
import { get_puuid } from "../utils/riot-fecth";
import { db } from "../db/turso-db";

export const addAccount = async (c: Context) => {
  const { nick, tagLine, username, password, server }: Account = await c.req.json();

  try {
    const owner_id = c.get("userId");
    if (!owner_id) return c.json({ success: false, message: "No estás autorizado" }, 401);

    const puuid = await get_puuid(nick, tagLine);
    if (!puuid) return c.json({ success: false, message: "El jugador no existe en Riot" }, 404);

    const stmt = await db.execute({
      sql: `INSERT INTO lol_accounts (owner_id, gameName, tagLine, puuid, acc_user, password, server)
            VALUES (?, ? , ? , ? , ? , ? , ?) RETURNING id, gameName, tagLine`,
      args: [owner_id, nick, tagLine, puuid, username, password, server],
    });

    return c.json({ success: true, message: "Cuenta vinculada con éxito", data: stmt.rows[0] }, 201);
  } catch (error: any) {
    // Manejo de error si el PUUID ya existe (cuenta duplicada)
    if (error.message?.includes("UNIQUE constraint failed")) {
      return c.json({ success: false, message: "Esta cuenta ya está registrada" }, 409);
    }
    return c.json({ success: false, message: "Error interno del servidor" }, 500);
  }
};

export const deleteAccountByID = async (c: Context) => {
  try {
    const id = c.req.param("id"); // ✅ Removido Number()
    const owner_id = c.get("userId");

    const stmt = await db.execute({
      sql: `UPDATE lol_accounts 
            SET is_active = 0, 
                updated_at = (strftime('%s', 'now') * 1000) 
            WHERE id = ? AND owner_id = ?
            RETURNING id, gameName, is_active`,
      args: [id, owner_id],
    });

    if (stmt.rows.length === 0) {
      return c.json({ success: false, message: "Cuenta no encontrada" }, 404);
    }

    return c.json({ success: true, data: stmt.rows[0] });
  } catch (error) {
    return c.json({ success: false, message: "Error al desactivar" }, 500);
  }
};

export const updateAccountByID = async (c: Context) => {
  try {
    const id = c.req.param("id"); // ✅ Removido +
    const { password } = await c.req.json();
    const owner_id = c.get("userId");

    const stmt = await db.execute({
      sql: `UPDATE lol_accounts
            SET password = ?, 
                updated_at = (strftime('%s', 'now') * 1000) 
            WHERE id = ? AND owner_id = ? 
            RETURNING id, gameName, tagLine`,
      args: [password, id, owner_id],
    });

    if (stmt.rows.length === 0) return c.json({ success: false, message: "No se pudo actualizar" }, 400);

    return c.json({ success: true, message: "Password actualizado", data: stmt.rows[0] });
  } catch (error) {
    return c.json({ success: false, message: "Error de servidor" }, 500);
  }
};