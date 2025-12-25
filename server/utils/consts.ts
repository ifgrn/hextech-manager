export const url_consts = {
  puuid_url:
    "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id",
};

export const COOKIE_OPTIONS = {
  path: "/",
  secure: Bun.env.MODE === "production",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 7 días
  sameSite: "Strict" as const,
};
