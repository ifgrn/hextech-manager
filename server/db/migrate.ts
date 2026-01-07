import { db } from "./turso-db";

const migrate = async () => {
  try {
    await db.execute(`CREATE TABLE IF not EXISTS users (

              id TEXT primary key default (lower(hex(randomblob(16)))),

              username text unique not null,

              email text unique not null,

              password_hash text not null,

              created_at timestamp default current_timestamp,

              updated_at timestamp default current_timestamp,

              is_active boolean default 1,

              is_admin boolean default 0

            )`);

    await db.execute(`CREATE TABLE IF NOT EXISTS lol_accounts(

                    id integer primary key autoincrement,

                    owner_id text not null,

                    gameName text not null,

                    tagLine text not null,

                    puuid text not null,

                    acc_user text not null,

                    password text not null,

                    server text not null,

                    is_active boolean default 1,

                    created_at timestamp default current_timestamp,

                    updated_at timestamp default current_timestamp,

                    FOREIGN KEY (owner_id) references users(id)

                  )`);

    await db.execute(`CREATE INDEX IF NOT EXISTS idx_accounts_owner_id ON lol_accounts(owner_id);`);
  } catch (e) {
    console.log(e);
  }
};

migrate();
