import { url_consts } from "./consts";

export const get_puuid = async (gameName: string, tagLine: string) => {
  const url = `${url_consts.puuid_url}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY as string,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Riot API error ${res.status}: ${errorText}`);
    }

    const data = (await res.json()) as { puuid: string };
    return data.puuid;
  } catch (error) {
    console.error("Error obteniendo PUUID:", error);
    return null;
  }
};
