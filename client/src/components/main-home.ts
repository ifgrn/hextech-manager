import { noir_account } from "../helpers/user-default";
import { card_account } from "./card-account";

export const main_home = () => {
  return `
 <main>
     <section class="main-section">
         <article class="h-div">
             <h1 class="h-principal">
                 Your League Accounts, <br />
                 organized in one place
             </h1>
             <p>
                 A smarter way to manage your League accounts. Real-time updates, unified
                 profiles,<br />
                 and effortless navigation—engineered for competitive players.
             </p>
             <button>GET STARTED <img src="arrow.svg" alt="button-action" /></button>
         </article>
         ${card_account(noir_account)}
     </section>
     <section class="features-section">
         <div class="features">
             <article class="feature">
                 <div class="h-feature">
                     <h4>Centralized Accounts</h4>
                     <img src="central-icon.svg" alt="central icon" />
                 </div>
                 <p>
                     Manage all your League of Legends accounts from a single, easy-to-use
                     dashboard.
                 </p>
             </article>
             <article class="feature">
                 <div class="h-feature">
                     <h4>Quick Stats</h4>
                     <img src="check-icon.svg" alt="check-icon" />
                 </div>
                 <p>
                     Check your accounts’ ranks, wins, and stats instantly without logging in
                     each one.
                 </p>
             </article>
             <article class="feature">
                 <div class="h-feature">
                     <h4>Skin Overview</h4>
                     <img src="collection-icon.svg" alt="central icon" />
                 </div>
                 <p>
                     Keep track of every skin your accounts own and stay updated on your
                     collection.
                 </p>
             </article>
         </div>
     </section>
 </main>
 `;
};
