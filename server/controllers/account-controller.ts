import type { Context } from "hono";
import type { Account } from "../types/types-d";
import { get_puuid } from "../utils/riot-fecth";
const allAcounts: Array<Account> = [];

export const addAccount = async (c: Context) => {
  const { nick, tagLine, username, password, server }: Account = await c.req.json();
  const puuid = await get_puuid(nick, tagLine);

  if (!puuid) throw new Error("El jugador no existe");

  const account: Account = {
    id: allAcounts.length + 1,
    nick,
    tagLine,
    username,
    password,
    puuid: puuid,
    active: true,
    server,
  };

  allAcounts.push(account);

  return c.json(account.puuid);
};

export const getAllActiveAcounts = (c: Context) => c.json(allAcounts.filter((acc) => acc.active));

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
