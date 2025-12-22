const LOL_REGIONS = [
  "BR1",
  "EUN1",
  "EUW1",
  "JP1",
  "KR",
  "LA1",
  "LA2",
  "ME1",
  "NA1",
  "OC1",
  "PBE1",
  "VN2",
  "RU",
  "SG2",
  "TR1",
] as const;

type LolRegion = (typeof LOL_REGIONS)[number];

export interface Account {
  id: number;
  nick: string;
  tagLine: string;
  username: string;
  password: string;
  puuid: string;
  active: boolean;
  server: LolRegion;
}
