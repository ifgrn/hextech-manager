export const url_consts = {
  puuid_url: "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id",
};

const isProd = process.env.NODE_ENV === "production"

export const COOKIE_OPTIONS = {
  path: "/",
  secure: isProd,
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 7 días
  sameSite: isProd ? "None" : "Lax",
};

export const lol_skins_json = "https://lolskin.info/data/flat-skins/en-us.json";
