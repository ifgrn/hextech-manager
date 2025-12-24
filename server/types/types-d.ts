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

export interface ChampMastery {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  markRequiredForNextLevel: number;
  tokensEarned: number;
  championSeasonMilestone: number;
  milestoneGrades?: string[];
  nextSeasonMilestone: NextSeasonMilestone;
}

export interface NextSeasonMilestone {
  requireGradeCounts: RequireGradeCounts;
  rewardMarks: number;
  bonus: boolean;
  totalGamesRequires: number;
}

export interface RequireGradeCounts {
  "S-"?: number;
  "A-"?: number;
}

export interface AccountEntries {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  puuid: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface AccountInfo {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
