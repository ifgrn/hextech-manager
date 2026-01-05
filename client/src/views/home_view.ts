import { header_home } from "../components/header-home";
import { hero_home } from "../components/hero_home";

export const home_view = () => {
  return `
  ${header_home()}
  <main>
    ${hero_home()}
  </main>
  `;
};
