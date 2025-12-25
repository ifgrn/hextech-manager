import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

type JWTPayload = {
  sub: number; // user ID
  iat?: number;
  exp?: number;
};

export const middleware_auth = async (c: Context, next: Next) => {
  try {
    const token = getCookie(c, "session");

    if (!token) {
      return c.json({ success: false, error: "No estás autorizado" }, 401);
    }

    const jwt_secret = Bun.env.JWT_SECRET;

    if (!jwt_secret) {
      console.error(
        "JWT_SECRET no está configurado en las variables de entorno",
      );
      return c.json(
        { success: false, error: "Error de configuración del servidor" },
        500,
      );
    }

    const decoded_payload = (await verify(token, jwt_secret)) as JWTPayload;

    const userId = decoded_payload.sub;

    if (!userId) {
      return c.json({ success: false, error: "Token inválido" }, 401);
    }

    c.set("userId", userId);

    await next();
  } catch (error: any) {
    console.error("Error en middleware de autenticación:", error);

    if (error.message?.includes("expired")) {
      return c.json({ success: false, error: "Token expirado" }, 401);
    }

    if (error.message?.includes("invalid")) {
      return c.json({ success: false, error: "Token inválido" }, 401);
    }

    return c.json({ success: false, error: "Error de autenticación" }, 401);
  }
};
