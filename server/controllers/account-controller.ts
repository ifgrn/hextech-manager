import type { Context } from "hono";
import type { Account } from "../types/types-d";
import { get_puuid } from "../utils/riot-fecth";
import { db } from "../db/db";
const allAcounts: Array<Account> = [];

export const addAccount = async (c: Context) => {
  const { nick, tagLine, username, password, server }: Account = await c.req.json();

  try {
    const puuid = await get_puuid(nick, tagLine);
    if (!puuid) throw new Error("El jugador no existe");

    const stmt = db.prepare(
      `INSERT INTO lol_accounts (owner_id, gameName, tagLine, puuid, acc_user, password, server)
     values (?, ?, ?, ?, ?, ?, ? )
     RETURNING  owner_id, puuid, acc_user, server`,
    );

    const account = stmt.get("noir", nick, tagLine, puuid, username, password, server);
    return c.json({ success: true, data: account }, 201);
  } catch (error) {
    console.error("Error creando la cuenta", error);
    throw error;
  }
};

export const getAllActiveAcounts = (c: Context) => {
  try {
    const stmt = db.prepare(
      `SELECT * FROM lol_accounts WHERE is_active=1
      ORDER BY updated_at DESC`,
    );
    const accounts = stmt.all();
    return c.json({ success: true, data: accounts });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccountByID = (c: Context) => {
  const id = Number(c.req.param("id"));

  try {
    const stmt = db.prepare(`UPDATE lol_accounts
      SET is_active= 0 WHERE id=?
      RETURNING id, gameName, tagLine, is_active`);

    const accountdisabled = stmt.get(id);
    return c.json({ success: true, data: accountdisabled });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAccountByID = async (c: Context) => {
  const id = +c.req.param("id");
  const { password } = await c.req.json();
  try {
    const stmt = db.prepare(`UPDATE lol_accounts
      SET password= ? WHERE id= ? RETURNING id, gameName, tagLine`);

    const account = stmt.get(password, id);

    return c.json({ message: "Datos actualizados correctamente", data: account });
  } catch (error) {
    console.error(error);
  }
};
