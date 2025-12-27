import { githubRepo_url } from "../helpers/consts";

export const header = () => {
  return `
  <header>
      <nav>
          <a class="logo-container" href="/">
              <img class="logo" src="icon.svg" alt="Hextech Manager Logo" />
              <p>HEXTECH MANAGER</p>
          </a>
          <ul class="nav-anchors">
              <li>
                  <a href="/" data-link>hello.</a>
              </li>
              <li>
                  <a href="/login" data-link>login</a>
              </li>
              <li>
                  <a href="/changes" data-link>changelogs</a>
              </li>
              <li class="github-icon">
                  <a href="${githubRepo_url}" target="_blank">
                      <img src="github_dark.svg" alt="github icon" />
                  </a>
              </li>
          </ul>
      </nav>
  </header>
  `;
};
