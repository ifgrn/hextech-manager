import { header } from "../components/header-home";
import { main_home } from "../components/main-home";

export const home_view = () => {
  return `${header()}
  ${main_home()}
  `;
};
