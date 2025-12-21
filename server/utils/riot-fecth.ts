const BASE_URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id";

export const get_puuid = async (gameName: string, tagLine: string) => {
  const url = `${BASE_URL}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  const res = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Riot API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.puuid;
};
