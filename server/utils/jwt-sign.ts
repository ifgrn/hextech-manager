import { sign } from "hono/jwt";

export const sign_token = async (userId: string) => {
  const jwt_secret = process.env.JWT_SECRET;

  if (!jwt_secret) throw new Error("JWT SECRET is not defined");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    iat: now,
    exp: now + 7 * 60 * 60 * 24,
  };
  const token = sign(payload, jwt_secret);
  return token;
};
