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

    if (!puuid) return c.json({ success: false, message: "El jugador no existe" }, 404);

    const stmt = await db.execute({
      sql: `INSERT INTO lol_accounts (owner_id, gameName, tagLine, puuid, acc_user, password, server)
      VALUES (?, ? , ? , ? , ? , ? , ?) RETURNING id`,
      args: [owner_id, nick, tagLine, puuid, username, password, server],
    });

    const account = stmt.rows[0];
    if (!account) {
      return c.json({ success: false, message: "No se pudo crear la cuenta" }, 400);
    }

    return c.json({ success: true, message: "Cuenta guardada con éxito", data: account }, 201);
  } catch (error) {
    return c.json({ success: false, message: error }, 500);
  }
};

export const getAllActiveAcounts = async (c: Context) => {
  try {
    const owner_id = c.get("userId");
    if (!owner_id) return c.json({ success: false, message: "No estás autorizado" }, 401);
    const stmt = await db.execute({
      sql: `SELECT gameName, tagLine, server FROM lol_accounts WHERE is_active=1 AND owner_id = ?
      ORDER BY updated_at DESC`,
      args: [owner_id],
    });
    const accounts = stmt.rows;
    if (accounts.length === 0)
      return c.json({ success: false, message: "No se pudo acceder a las cuentas" }, 400);

    return c.json({ success: true, data: accounts });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: error }, 500);
  }
};

export const deleteAccountByID = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const owner_id = c.get("userId");
    if (!owner_id) return c.json({ success: false, message: "No estás autorizado" }, 401);

    const stmt = await db.execute({
      sql: `UPDATE lol_accounts
      SET is_active=0, updated_at=current_timestamp WHERE id= ? AND owner_id=?
      RETURNING id, gameName, tagLine, is_active`,
      args: [id, owner_id],
    });

    const accountDisabled = stmt.rows[0];

    if (!accountDisabled) {
      return c.json(
        {
          success: false,
          message: "Cuenta no encontrada o no autorizada",
        },
        404,
      );
    }
    return c.json({ success: true, data: accountDisabled });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: error }, 500);
  }
};

export const activeAccountByID = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const owner_id = c.get("userId");
    if (!owner_id) return c.json({ success: false, message: "No estás autorizado" }, 401);

    const stmt = await db.execute({
      sql: `UPDATE lol_accounts
      SET is_active=1 , updated_at=current_timestamp WHERE id= ? AND owner_id=?
      RETURNING id, gameName, tagLine, is_active`,
      args: [id, owner_id],
    });

    const accountEnabled = stmt.rows[0];

    if (!accountEnabled) {
      return c.json(
        {
          success: false,
          message: "Cuenta no encontrada o no autorizada",
        },
        404,
      );
    }
    return c.json({ success: true, data: accountEnabled });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: error }, 500);
  }
};

export const updateAccountByID = async (c: Context) => {
  try {
    const id = +c.req.param("id");

    const { password } = await c.req.json();

    const owner_id = c.get("userId");

    if (!owner_id) return c.json({ success: false, message: "No estás autorizado" }, 401);

    const stmt = await db.execute({
      sql: `UPDATE lol_accounts
      SET password= ? , updated_at=current_timestamp WHERE id=? AND owner_id=? RETURNING id, gameName, tagLine`,
      args: [password, id, owner_id],
    });

    const account = stmt.rows[0];
    if (!account)
      return c.json({ success: false, message: "No se pudo acceder a las cuentas" }, 400);

    return c.json({ message: "Datos actualizados correctamente", data: account });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: error }, 500);
  }
};
