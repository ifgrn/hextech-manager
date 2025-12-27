import { card_account } from "./components/card-account";

type Account = {
  nick: string;
  tagLine: string;
  server: string;
  wins?: number;
  losses?: number;
  tier?: string;
  rank?: string;
  lps?: number;
};

const noir_acc: Account = {
  nick: "noir",
  tagLine: "虹彩7",
  server: "LA2",
  wins: 10,
  losses: 2,
  tier: "diamond",
  rank: "IV",
  lps: 25,
};

export function setupCounter(element: HTMLButtonElement) {
  element.innerHTML = card_account(noir_acc);
}
