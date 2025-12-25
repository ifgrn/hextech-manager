import { sign } from "hono/jwt";
import { COOKIE_OPTIONS } from "./consts";
import { setCookie } from "hono/cookie";
import type { Context } from "hono";

const sign_token = async (userId: string) => {
  const jwt_secret = process.env.JWT_SECRET;

  if (!jwt_secret) throw new Error("JWT SECRET is not defined");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    exp: now + 7 * 60 * 60 * 24,
  };
  const token: Promise<String> = sign(payload, jwt_secret);

  return token;
};

export const setSessionCookie = async (c: Context, userId: string) => {
  const token = (await sign_token(userId)) as string;
  setCookie(c, "session", token, COOKIE_OPTIONS);
};
