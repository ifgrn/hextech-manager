import type { Account } from "../types/type-d";

const actionIcons = [
  { src: "copy-icon.svg", alt: "Copy", title: "Copiar cuenta" },
  { src: "edit-icon.svg", alt: "Edit", title: "Editar cuenta" },
  { src: "update-icon.svg", alt: "Update", title: "Actualizar datos" },
  { src: "statistic-icon.svg", alt: "Statistics", title: "Ver estadísticas" },
  { src: "shine-icon.svg", alt: "Highlight", title: "Destacar cuenta" },
  { src: "delete-icon.svg", alt: "Delete", title: "Eliminar cuenta" },
];

export const card_account = (account: Account) => {
  const winRatio =
    account.wins && account.losses
      ? ((account.wins / (account.wins + account.losses)) * 100).toFixed(2)
      : "0.00";

  return `
  <article class="card-acc-container">
      <div class="card-acc">
          <div class="card-info">
              <img
                  class="rank-icon"
                  src="https://opgg-static.akamaized.net/images/medals_new/${account.tier || "unranked"}.png"
                  alt="${account.tier || "Unranked"} Rank Icon"
              />
              <div class="rank-info">
                  <p class="user-info">
                      <span class="text-grey">${account.nick}</span> <span class="text-dark">#${account.tagLine}</span>
                      <span class="region">${account.server.toUpperCase()}</span>
                  </p>
                  <span class="user-rank">${account.tier?.toUpperCase() || "Unranked"} ${account.rank || ""}</span>
                  <span class="text-dark">${account.lps || "0"}LP</span>
              </div>
              <div class="season-info">
                  <p class="text-dark">W/L Season</p>
                  <p class="games-info">
                      <span class="text-green">${account.wins || "0"}</span> - <span class="text-red">${account.losses || "0"}</span>
                  </p>
                  <p class="text-blue">${winRatio}%</p>
              </div>
          </div>
          <div class="functions-container">
              ${actionIcons
                .map(
                  (icon) =>
                    `<img
                  src="${icon.src}"
                  alt="${icon.alt}"
                  title="${icon.title}"
                  class="action-icon"
                  data-action="${icon.alt.toLowerCase()}"
                />`,
                )
                .join("")}
          </div>
      </div>
      </article>
  `;
};
