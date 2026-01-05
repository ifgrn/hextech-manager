import { githubRepo_url } from "../helpers/consts";

export const header_home = () => {
  return `
  <header class="header_main">
    <div class="logo-container"  >
      <img src="/icon.svg"/>
      <p>Hextech Manager</p>
    </div>
    <nav class="nav-icons">
      <a class="icon-btn" href="${githubRepo_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
        <img src="github_dark.svg"/>
      </a>
        <img class="icon-btn" src="menu-icon.svg"/>
    </nav>
  </header>
  `;
};
