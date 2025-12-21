import { Hono } from "hono";
import { get_puuid } from "../utils/riot-fecth";

const accounts = new Hono();

interface Account {
  id: number;
  nick: string;
  tagLine: string;
  username: string;
  password: string;
  puuid: number;
  active: boolean;
}

const allAcounts: Array<Account> = [];

accounts.post("/add", async (c) => {
  const { nick, tagLine, username, password } = await c.req.json();
  const account: Account = {
    id: allAcounts.length + 1,
    nick,
    tagLine,
    username,
    password,
    puuid: 12345,
    active: true,
  };

  const puuid = await get_puuid(nick, tagLine);
  console.log(puuid);

  allAcounts.push(account);

  return c.json({ account });
});

accounts.get("/", (c) => c.json(allAcounts.filter((acc) => acc.active)));

accounts.delete("/delete/:id", (c) => {
  const id = Number(c.req.param("id"));

  const account: Account | undefined = allAcounts.find((acc) => acc.id === id);
  if (!account) {
    return c.json({ message: "Cuenta no encontrada" }, 404);
  }

  account.active = false;

  return c.json(account);
});

accounts.put("/update/:id", async (c) => {
  const id = +c.req.param("id");
  const password = await c.req.json();
  const account = allAcounts.find((acc) => acc.id === id);
  if (!account) return c.json({ message: "Cuenta no encontrada" });

  account.password = password;

  return c.json({ message: "Datos actualizados correctamente" });
});

export default accounts;
