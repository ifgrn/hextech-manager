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
    const stmt = db.prepare(`SELECT * FROM lol_accounts WHERE is_active="1"`);
    const accounts = stmt.all();
    return c.json({ success: true, data: accounts });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccountByID = (c: Context) => {
  const id = Number(c.req.param("id"));

  const account: Account | undefined = allAcounts.find((acc) => acc.id === id);
  if (!account) {
    return c.json({ message: "Cuenta no encontrada" }, 404);
  }

  account.active = false;

  return c.json(account);
};

export const updateAccountByID = async (c: Context) => {
  const id = +c.req.param("id");
  const password = await c.req.json();
  const account = allAcounts.find((acc) => acc.id === id);
  if (!account) return c.json({ message: "Cuenta no encontrada" });

  account.password = password;

  return c.json({ message: "Datos actualizados correctamente" });
};
